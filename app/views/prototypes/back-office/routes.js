//
// Back office prototypes
// ======================
//
// Routes for everything in app/views/prototypes/back-office/.
//
// setupRouter() adds this router to the app itself, so app/routes.js only
// needs to require this file, before the other prototypes. Do not also
// router.use() it there, or every route runs twice.
//
// The other prototypes in this repo have a catch-all route that would
// handle these pages first, so the end of this file renders back office
// pages itself (see "Render back office pages").
//
// Everything here only applies under /prototypes/back-office.
//
// Moved here from Steve Molesworth's own prototype (defra-design-2026) in
// November 2026. Work on the back office now happens here.
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs = require('fs')
const path = require('path')

const basePath = '/prototypes/back-office'

// Date filters for back office pages
// Format a YYYY-MM-DD date as '2 November 2026'
govukPrototypeKit.views.addFilter('govukDate', dateString => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
})

// Format a YYYY-MM-DD date as '2/11/2026', for tables where space is tight
govukPrototypeKit.views.addFilter('govukShortDate', dateString => {
  const [year, month, day] = dateString.split('-').map(Number)
  return `${day}/${month}/${year}`
})

// Format a YYYY-MM-DD date as '09/11/2026', as the live back office does
govukPrototypeKit.views.addFilter('liveDate', dateString => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
})

// How long ago a YYYY-MM-DD date was, counting from today in the UK.
// daysAgo counts every day. workingDaysAgo counts Monday to Friday only, so
// on a Monday, the Friday before is 1 working day ago. Used for the "New"
// and "Updated" tags on the What we changed page.
const todayInUk = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
const utcDate = dateString => new Date(dateString + 'T00:00:00Z')

govukPrototypeKit.views.addFilter('daysAgo', dateString => {
  return Math.round((utcDate(todayInUk()) - utcDate(dateString)) / 86400000)
})

govukPrototypeKit.views.addFilter('workingDaysAgo', dateString => {
  const day = utcDate(dateString)
  const today = utcDate(todayInUk())
  let count = 0
  while (day < today) {
    day.setUTCDate(day.getUTCDate() + 1)
    if (day.getUTCDay() !== 0 && day.getUTCDay() !== 6) {
      count++
    }
  }
  return count
})

// Format a 24-hour HH:MM time the GOV.UK way, for example '2:15pm', '9am',
// 'midday' or 'midnight'
govukPrototypeKit.views.addFilter('govukTime', time => {
  if (!time) {
    return ''
  }
  const [hours, minutes] = time.split(':').map(Number)
  if (minutes === 0 && hours === 12) {
    return 'midday'
  }
  if (minutes === 0 && hours === 0) {
    return 'midnight'
  }
  const hour = hours % 12 || 12
  const suffix = hours < 12 ? 'am' : 'pm'
  return minutes ? `${hour}:${String(minutes).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
})

// Add your routes here

const designs = require('./data/designs')
const projects = require('./data/projects')
const personas = require('./data/personas')
const backOfficeRoles = require('./data/back-office-roles')
const whatWeChanged = require('./data/what-we-changed')

// Make the lists of projects, designs, personas and back office roles, the
// design for the
// current page, and today's date (UK time, as YYYY-MM-DD) available to
// every view
router.use(basePath, (req, res, next) => {
  res.locals.projects = projects
  res.locals.personas = personas
  res.locals.backOfficeRoles = backOfficeRoles
  res.locals.whatWeChanged = whatWeChanged
  res.locals.designs = designs
  res.locals.today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
  res.locals.design = designs.find(design => design.url === req.baseUrl + req.path)
  // The page's path without the query string, for links back to the same
  // page, such as the widescreen toggle on draft pages
  res.locals.currentPath = req.baseUrl + req.path
  next()
})

// Draft user pages for the Authorisation workflow, for example
// /prototypes/back-office/authorisation-workflow/draft/users/caseOfficer.
// Renders draft/user.html with the internal persona whose key is in the URL.
router.get('/prototypes/back-office/authorisation-workflow/draft/users/:userId', (req, res, next) => {
  const user = personas[req.params.userId]
  if (!user || user.group !== 'internal') {
    return next()
  }
  res.locals.design = designs.find(design => design.url === '/prototypes/back-office/authorisation-workflow/draft/user')
  res.render('prototypes/back-office/authorisation-workflow/draft/user', { user })
})

//
// Changing claim details, for the draft claim pages
// =================================================
//
// A back office user changes one or more claim details, checks them, then
// saves them all at once, or sends them for approval. Each save is one
// "batch" and one row in the claim history.
//
// Session data (req.session.data):
//   claimEdits        - unsaved changes, as { fieldId: newValue }
//   claimEditBatches  - saved batches, newest first. Each has date, by
//                       (persona key), status ('saved' or 'pending'),
//                       reason and changes ({ id, label, from, to, type }).
//   claimNotes        - notes added on draft/add-note, newest first. Each
//                       has date, by (persona key) and text.
//   claimWithdrawals  - requests to withdraw the claim, from
//                       draft/withdraw-claim, newest first. Each has id,
//                       date, by (persona key), reason, discovered,
//                       contactName, contactOrganisation, contactMethod and
//                       details. A team lead approves or rejects each one,
//                       like a batch. An approved request withdraws the
//                       claim.
//   claimEditBanner   - set after saving changes, adding a note or
//                       requesting a withdrawal, to show a success banner
//                       once. status is 'saved', 'pending', 'note' or
//                       'withdrawal'.
//   changeDecisions   - team lead decisions on changes, by change id: each
//                       has decision ('approved' or 'rejected'), by (persona
//                       key), date and notes. Applies to batches and to the
//                       illustrative entries in app/views/prototypes/back-office/data/change-log.js.
//   changeLogBanner   - set after a decision, to show a success banner on
//                       the change log once.
//
// A batch's status is 'saved' or 'pending' when saved, then 'approved' or
// 'rejected' once a team lead decides. Saved and approved batches change the
// claim. Pending and rejected ones do not.
//
// Batches, notes and withdrawal requests all have createdAt, so the claim
// history can show them in the order they happened, as claimSessionEvents.
// They also have time (24-hour HH:MM, UK time), and decisions have a time,
// as the claim history records the date and time of each event.
//
// Open /prototypes/back-office/authorisation-workflow/draft/claim-edit/reset to clear it all.
//

const claimEditFields = require('./data/claim-edit-fields')
const changeLog = require('./data/change-log')
const draftPath = '/prototypes/back-office/authorisation-workflow/draft'
const claimEditPath = draftPath + '/claim-edit'

const todayInLondon = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
// The time now in the UK, as 24-hour HH:MM. Pages show it with govukTime.
const timeInLondon = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Europe/London' })

// The claim on the draft claim page, which every change made in the
// prototype is to, and its agreement, on the draft agreement page
const draftClaim = { kind: 'claim', number: 'FUBC-HJ9N-S5PK', claimType: 'Follow-up' }
const draftAgreement = { kind: 'agreement', number: 'IAHW-NQG3-7WZY', sbi: '107204504' }

// The signed-in user on draft pages: Sanjay Mehta, a case officer. Team lead
// pages, such as review-change, set their own.
const signedInUser = 'caseOfficer'

// The role an internal persona had on a date (YYYY-MM-DD), from their role
// history. Matches the roleOn macro in app/views/prototypes/back-office/includes/authorisation-workflow-macros.html.
function roleOn (person, date) {
  const role = ((person && person.roles) || []).find(item => item.from <= date && (!item.to || item.to >= date))
  return role ? role.role : ''
}

//
// Flags
// =====
//
// Agreements and claims can both be flagged. A claim shows when its
// agreement (the agreement with the same SBI) is flagged, and an agreement
// shows how many of its claims are flagged. See app/views/prototypes/back-office/data/flags.js.
//
// Anyone can flag, as a flag changes nothing for the customer, and flags do
// not need approval. The person who created a flag, or any team lead, can
// remove it, giving a reason. This is our proposal, to agree with the RPA.
//
// Session data:
//   flagsAdded   - flags added in the prototype, newest first, in the same
//                  shape as app/views/prototypes/back-office/data/flags.js, with createdAt
//   flagsRemoved - flags removed, by flag id: by, date, time, reason and
//                  createdAt
//   flagBanner   - set after adding or removing a flag, to show a success
//                  banner once: action ('added' or 'removed') and level
//

const flagData = require('./data/flags')
const claimsData = require('./data/claims')
const agreementsData = require('./data/agreements')

// Active flags, newest first, with the creator's role at the time
function activeFlags (data) {
  const removed = data.flagsRemoved || {}
  return [...(data.flagsAdded || []), ...flagData.flags]
    .filter(flag => !removed[flag.id])
    .map(flag => ({ ...flag, createdByRole: roleOn(personas[flag.createdBy], flag.date) }))
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
}

// Withdrawal requests with any team lead decision applied: status is
// 'pending', 'approved' or 'rejected'
function decidedWithdrawals (data) {
  const decisions = data.changeDecisions || {}
  return (data.claimWithdrawals || []).map(request => {
    const decision = decisions[request.id]
    return decision ? { ...request, status: decision.decision, decision } : { ...request, status: 'pending' }
  })
}

// A batch's id. Older batches have no id, so use when they were made.
const batchId = batch => batch.id || batch.createdAt

// Batches with any team lead decision applied to their status
function decidedBatches (data) {
  const decisions = data.changeDecisions || {}
  return (data.claimEditBatches || []).map(batch => {
    const decision = decisions[batchId(batch)]
    return decision ? { ...batch, id: batchId(batch), status: decision.decision, decision } : { ...batch, id: batchId(batch) }
  })
}

// The value of each field once saved and approved batches are applied
// (oldest first)
function savedClaimValues (batches) {
  const values = Object.fromEntries(claimEditFields.map(field => [field.id, field.value]))
  for (const batch of [...batches].reverse()) {
    if (batch.status === 'saved' || batch.status === 'approved') {
      for (const change of batch.changes) {
        values[change.id] = change.to
      }
    }
  }
  return values
}

// Make the claim's fields, unsaved changes and batches available to every
// draft page, as claimFields, claimField (by id), claimChanges,
// claimChangesNeedApproval, claimEditBatches and claimWaitingForApproval
router.use(draftPath, (req, res, next) => {
  const data = req.session.data
  const edits = data.claimEdits || {}
  const batches = decidedBatches(data)
  const saved = savedClaimValues(batches)

  const fields = claimEditFields.map(field => {
    const changed = Object.prototype.hasOwnProperty.call(edits, field.id)
    return { ...field, current: saved[field.id], value: changed ? edits[field.id] : saved[field.id], changed }
  })
  const changes = fields.filter(field => field.changed)

  res.locals.claimFields = fields
  res.locals.claimField = Object.fromEntries(fields.map(field => [field.id, field]))
  res.locals.claimChanges = changes
  res.locals.claimChangesNeedApproval = changes.filter(field => field.needsApproval)
  res.locals.claimEditBatches = batches
  res.locals.claimWaitingForApproval = batches.some(batch => batch.status === 'pending')

  // Withdrawal requests. The latest one decides the claim's state: waiting
  // for approval, or withdrawn once approved. A rejected one leaves the
  // claim in check, so another can be requested.
  const withdrawals = decidedWithdrawals(data)
  res.locals.claimWithdrawals = withdrawals
  res.locals.claimWithdrawalPending = withdrawals.find(request => request.status === 'pending')
  res.locals.claimWithdrawalApproved = withdrawals.find(request => request.status === 'approved')
  res.locals.claimWithdrawalLatest = withdrawals[0]

  // Flags, and the claims and agreements lists with their flags
  const flags = activeFlags(data)
  const agreementFlagByNumber = {}
  const agreementFlagBySbi = {}
  const claimFlagByNumber = {}
  for (const flag of flags) {
    if (flag.level === 'agreement') {
      agreementFlagByNumber[flag.agreement] = agreementFlagByNumber[flag.agreement] || flag
      agreementFlagBySbi[flag.sbi] = agreementFlagBySbi[flag.sbi] || flag
    } else {
      // By claim number and SBI, as the source data has some claim numbers twice
      const key = flag.claim + '|' + flag.sbi
      claimFlagByNumber[key] = claimFlagByNumber[key] || flag
    }
  }
  const claimFlags = flags.filter(flag => flag.level === 'claim')
  res.locals.flags = flags
  res.locals.flagTypes = flagData.flagTypes
  res.locals.signedInUserKey = signedInUser
  res.locals.claimsList = claimsData.map(claim => ({
    ...claim,
    claimFlag: claimFlagByNumber[claim.claim + '|' + claim.sbi] || null,
    agreementFlag: agreementFlagBySbi[claim.sbi] || null
  }))
  res.locals.agreementsList = agreementsData.map(agreement => ({
    ...agreement,
    flag: agreementFlagByNumber[agreement.agreement] || null,
    flaggedClaims: claimFlags.filter(flag => flag.sbi === agreement.sbi).length
  }))
  // The draft claim and agreement's flags
  res.locals.draftClaimFlag = claimFlagByNumber[draftClaim.number + '|' + draftAgreement.sbi] || null
  res.locals.draftAgreementFlag = agreementFlagByNumber[draftAgreement.number] || null
  res.locals.draftAgreementClaimFlags = claimFlags.filter(flag => flag.sbi === draftAgreement.sbi)

  // Flags added to and removed from the draft claim and agreement in the
  // prototype, for the claim history and the agreement history. A removed
  // flag stays in the history: one row when it was created, one when it was
  // removed.
  const removedFlags = data.flagsRemoved || {}
  const sessionFlags = data.flagsAdded || []
  const flagEvents = isMine => [
    ...sessionFlags.filter(isMine).map(flag => ({ ...flag, by: flag.createdBy, kind: 'flag' })),
    ...[...sessionFlags, ...flagData.flags]
      .filter(flag => isMine(flag) && removedFlags[flag.id])
      .map(flag => ({ ...removedFlags[flag.id], flag, kind: 'flagRemoved' }))
  ]
  const draftClaimFlagEvents = flagEvents(flag => flag.level === 'claim' && flag.claim === draftClaim.number)
  res.locals.agreementSessionEvents = flagEvents(flag => flag.level === 'agreement' && flag.agreement === draftAgreement.number)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))

  // Batches, notes and withdrawal requests together, newest first, each with
  // kind 'changes', 'note' or 'withdrawal'
  res.locals.claimSessionEvents = [
    ...batches.map(batch => ({ ...batch, kind: 'changes' })),
    ...(data.claimNotes || []).map(note => ({ ...note, kind: 'note' })),
    ...withdrawals.map(request => ({ ...request, kind: 'withdrawal' })),
    ...draftClaimFlagEvents
  ].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))

  // The draft change log: changes made in the prototype, then the
  // illustrative entries in app/views/prototypes/back-office/data/change-log.js, newest first by date and
  // time. Session changes are always to the claim on the draft claim page.
  const decisions = data.changeDecisions || {}
  const sessionChanges = batches.map(batch => ({
    id: batch.id,
    date: batch.date,
    time: batch.time,
    record: draftClaim,
    scheme: 'IAHW',
    types: batch.changes.map(change => change.label + ' changed'),
    summary: batch.changes.length === 1 ? batch.changes[0].label + ' changed' : batch.changes.length + ' claim details changed',
    fields: batch.changes.length > 1 ? batch.changes.map(change => change.label) : undefined,
    changes: batch.changes,
    reason: batch.reason,
    by: batch.by,
    approval: batch.status === 'saved' ? 'none' : batch.status,
    page: 'claim-details'
  }))
  const sessionWithdrawals = withdrawals.map(request => ({
    id: request.id,
    date: request.date,
    time: request.time,
    record: draftClaim,
    scheme: 'IAHW',
    types: ['Claim withdrawal requested'],
    summary: 'Claim withdrawal requested',
    withdrawal: request,
    by: request.by,
    approval: request.status,
    page: 'claim-details'
  }))
  // Flags added and removed in the prototype. They do not need approval.
  const flagRecord = flag => flag.level === 'claim' ? draftClaim : { kind: 'agreement', number: flag.agreement }
  const flagPage = flag => flag.level === 'claim' ? 'claim-details' : 'agreement-details'
  const flagReason = flag => flag.type + (flag.note ? ': ' + flag.note : '')
  const sessionFlagChanges = [
    ...sessionFlags.map(flag => ({
      id: flag.id,
      date: flag.date,
      time: flag.time,
      record: flagRecord(flag),
      scheme: flag.scheme,
      types: ['Flag created'],
      summary: 'Flag created',
      reason: flagReason(flag),
      by: flag.createdBy,
      approval: 'none',
      page: flagPage(flag)
    })),
    ...[...sessionFlags, ...flagData.flags].filter(flag => removedFlags[flag.id]).map(flag => ({
      id: 'removed-' + flag.id,
      date: removedFlags[flag.id].date,
      time: removedFlags[flag.id].time,
      record: flagRecord(flag),
      scheme: flag.scheme,
      types: ['Flag removed'],
      summary: 'Flag removed',
      reason: removedFlags[flag.id].reason,
      by: removedFlags[flag.id].by,
      approval: 'none',
      page: flagPage(flag)
    }))
  ]
  const staticChanges = changeLog.entries.map(entry => {
    const decision = decisions[entry.id]
    return decision ? { ...entry, approval: decision.decision } : entry
  })
  // Who decided, when and their notes, from the decision if there is one
  const when = entry => entry.date + ' ' + (entry.time || '')
  res.locals.changeLogEntries = [...sessionChanges, ...sessionWithdrawals, ...sessionFlagChanges, ...staticChanges]
    .map(entry => {
      const decision = decisions[entry.id]
      return decision ? { ...entry, decidedBy: decision.by, decidedDate: decision.date, decidedTime: decision.time, decisionNotes: decision.notes } : entry
    })
    .sort((a, b) => when(b).localeCompare(when(a)))
  res.locals.changeLogTypes = changeLog.changeTypes
  // For the change log's "When" filter: the date and time (UK, as
  // 'YYYY-MM-DD HH:MM') 24 hours, 7 days and 30 days ago
  const londonDateTime = date => date.toLocaleDateString('en-CA', { timeZone: 'Europe/London' }) + ' ' +
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Europe/London' })
  const hoursAgo = hours => londonDateTime(new Date(Date.now() - hours * 60 * 60 * 1000))
  res.locals.changeLogSince = { day: hoursAgo(24), week: hoursAgo(24 * 7), month: hoursAgo(24 * 30) }

  // Show the banner after saving once only
  if (req.method === 'GET' && req.path === '/claim-details') {
    res.locals.claimEditBanner = data.claimEditBanner
    delete data.claimEditBanner
  }
  // Show the banner after adding or removing a flag once only
  if (req.method === 'GET' && (req.path === '/claim-details' || req.path === '/agreement-details')) {
    res.locals.flagBanner = data.flagBanner
    delete data.flagBanner
  }
  // Show the banner after a team lead's decision once only
  if (req.method === 'GET' && req.path === '/change-log') {
    res.locals.changeLogBanner = data.changeLogBanner
    delete data.changeLogBanner
  }
  next()
})

// List filters only apply when they are in the page address. The Prototype
// Kit saves every answer in the session, so without this a filter used
// once (for example from a link on the What we changed page) would stay on
// every time the list was opened. Opening a list with no query string,
// from the navigation or a link, clears its filters and shows everything.
const listFilters = {
  '/claims': key => key.startsWith('claims'),
  '/agreements': key => key.startsWith('agreements'),
  '/flags': key => ['flagsRecord', 'flagsBy', 'flagsScheme', 'flagsAgreementType'].includes(key),
  '/change-log': key => ['changeLogRecord', 'changeLogType', 'changeLogScheme', 'changeLogStatus', 'changeLogBy', 'changeLogPeriod'].includes(key)
}

router.get(Object.keys(listFilters).map(page => draftPath + page), (req, res, next) => {
  if (!Object.keys(req.query).length) {
    const isFilter = listFilters[req.path.slice(draftPath.length)]
    // The kit copies the session into res.locals.data before routes run, so
    // clear both, or this page load would still be filtered
    for (const data of [req.session.data, res.locals.data || {}]) {
      for (const key of Object.keys(data)) {
        if (isFilter(key)) {
          delete data[key]
        }
      }
    }
  }
  next()
})

// Clear unsaved changes, without saving them
router.get(claimEditPath + '/cancel', (req, res) => {
  delete req.session.data.claimEdits
  res.redirect(draftPath + '/claim-details')
})

// Clear unsaved changes and saved batches, to start the prototype again
router.get(claimEditPath + '/reset', (req, res) => {
  delete req.session.data.claimEdits
  delete req.session.data.claimEditBatches
  delete req.session.data.claimNotes
  delete req.session.data.claimWithdrawals
  delete req.session.data.flagsAdded
  delete req.session.data.flagsRemoved
  delete req.session.data.flagBanner
  delete req.session.data.claimEditBanner
  delete req.session.data.changeDecisions
  delete req.session.data.changeLogBanner
  res.redirect(draftPath + '/claim-details')
})

// Save or send for approval all unsaved changes, as one batch
router.post(claimEditPath + '/check', (req, res) => {
  const data = req.session.data
  const changes = res.locals.claimChanges
  if (!changes.length) {
    return res.redirect(draftPath + '/claim-details')
  }
  const needsApproval = changes.some(field => field.needsApproval)
  const batch = {
    id: 'change-' + Date.now(),
    createdAt: new Date().toISOString(),
    date: todayInLondon(),
    time: timeInLondon(),
    by: 'caseOfficer',
    status: needsApproval ? 'pending' : 'saved',
    reason: (req.body.claimEditReason || '').trim(),
    changes: changes.map(field => ({ id: field.id, label: field.label, type: field.type, from: field.current, to: field.value }))
  }
  data.claimEditBatches = [batch, ...(data.claimEditBatches || [])]
  data.claimEditBanner = { status: batch.status, count: changes.length }
  delete data.claimEdits
  delete data.claimEditReason
  res.redirect(draftPath + '/claim-details')
})

// Store the answers from one edit page as unsaved changes, then go to check
// your changes. A field set back to its saved value is no longer a change.
router.post(claimEditPath + '/:page', (req, res, next) => {
  const pageFields = claimEditFields.filter(field => field.page === req.params.page)
  if (!pageFields.length) {
    return next()
  }
  const data = req.session.data
  const edits = data.claimEdits || {}
  const saved = savedClaimValues(decidedBatches(data))

  for (const field of pageFields) {
    let value
    if (field.type === 'date') {
      const day = (req.body[field.id + '-day'] || '').trim().padStart(2, '0')
      const month = (req.body[field.id + '-month'] || '').trim().padStart(2, '0')
      const year = (req.body[field.id + '-year'] || '').trim()
      value = `${year}-${month}-${day}`
    } else {
      value = (req.body[field.id] || '').trim()
    }

    if (value === saved[field.id]) {
      delete edits[field.id]
    } else {
      edits[field.id] = value
    }
  }

  data.claimEdits = edits
  res.redirect(claimEditPath + '/check')
})

// Add a note to the claim. A note does not change the claim, so it is saved
// straight away, with no check page. An empty note shows an error.
router.post(draftPath + '/add-note', (req, res) => {
  const data = req.session.data
  const text = (req.body.claimNote || '').trim()
  if (!text) {
    return res.render('prototypes/back-office/authorisation-workflow/draft/add-note', { noteError: true })
  }
  data.claimNotes = [{
    createdAt: new Date().toISOString(),
    date: todayInLondon(),
    time: timeInLondon(),
    by: 'caseOfficer',
    text
  }, ...(data.claimNotes || [])]
  data.claimEditBanner = { status: 'note' }
  delete data.claimNote
  res.redirect(draftPath + '/claim-details')
})

// Request to withdraw the claim, from draft/withdraw-claim. A withdrawal
// needs a team lead's approval, like changes that affect eligibility, so it
// is sent for approval and the claim stays in check until a team lead
// decides on draft/review-change. Only one request can wait at a time, and
// a withdrawn claim cannot be withdrawn again.
//
// The Prototype Kit also stores the answers in session data. They are
// cleared once the request is made, so the next request starts empty.
const withdrawFields = ['withdrawReason', 'withdrawReasonOther', 'withdrawDiscovered', 'withdrawDiscoveredOther', 'withdrawContactName', 'withdrawContactOrganisation', 'withdrawContactMethod', 'withdrawDetails']

router.post(draftPath + '/withdraw-claim', (req, res) => {
  const data = req.session.data
  if (res.locals.claimWithdrawalPending || res.locals.claimWithdrawalApproved) {
    return res.redirect(draftPath + '/claim-details')
  }
  const answer = name => (req.body[name] || '').trim()
  const discovered = answer('withdrawDiscovered') === 'Other' ? answer('withdrawDiscoveredOther') : answer('withdrawDiscovered')
  const customerContacted = answer('withdrawDiscovered') === 'Customer contacted the RPA'
  data.claimWithdrawals = [{
    id: 'withdrawal-' + Date.now(),
    createdAt: new Date().toISOString(),
    date: todayInLondon(),
    time: timeInLondon(),
    by: 'caseOfficer',
    reason: answer('withdrawReason') === 'Other' ? answer('withdrawReasonOther') : answer('withdrawReason'),
    discovered,
    contactName: customerContacted ? answer('withdrawContactName') : '',
    contactOrganisation: customerContacted ? answer('withdrawContactOrganisation') : '',
    contactMethod: customerContacted ? answer('withdrawContactMethod') : '',
    details: answer('withdrawDetails')
  }, ...(data.claimWithdrawals || [])]
  data.claimEditBanner = { status: 'withdrawal' }
  for (const key of withdrawFields) {
    delete data[key]
  }
  res.redirect(draftPath + '/claim-details')
})

// Flag the draft claim or its agreement: draft/flag?level=claim or
// draft/flag?level=agreement. A type is needed, and a note when the type is
// "Other". A claim or agreement that is already flagged cannot be flagged
// again.
const flagPath = draftPath + '/flag'

function renderFlagForm (res, level, extra = {}) {
  res.locals.design = designs.find(design => design.url === flagPath)
  res.render('prototypes/back-office/authorisation-workflow/draft/flag', { level, ...extra })
}

router.get(flagPath, (req, res) => {
  const level = req.query.level === 'agreement' ? 'agreement' : 'claim'
  renderFlagForm(res, level)
})

router.post(flagPath, (req, res) => {
  const level = req.body.flagLevel === 'agreement' ? 'agreement' : 'claim'
  const returnPage = draftPath + (level === 'claim' ? '/claim-details' : '/agreement-details')
  if ((level === 'claim' && res.locals.draftClaimFlag) || (level === 'agreement' && res.locals.draftAgreementFlag)) {
    return res.redirect(returnPage)
  }
  const type = (req.body.flagType || '').trim()
  const note = (req.body.flagNote || '').trim()
  const errors = {}
  if (!flagData.flagTypes.some(item => item.value === type)) {
    errors.flagType = 'Select why you are flagging this ' + level
  } else if (type === 'Other' && !note) {
    errors.flagNote = 'Enter a note saying why you are flagging this ' + level
  }
  if (Object.keys(errors).length) {
    return renderFlagForm(res, level, { errors, values: req.body })
  }
  const data = req.session.data
  data.flagsAdded = [{
    id: 'flag-' + Date.now(),
    createdAt: new Date().toISOString(),
    level,
    agreement: draftAgreement.number,
    sbi: draftAgreement.sbi,
    claim: level === 'claim' ? draftClaim.number : undefined,
    scheme: 'IAHW',
    type,
    note,
    createdBy: signedInUser,
    date: todayInLondon(),
    time: timeInLondon()
  }, ...(data.flagsAdded || [])]
  data.flagBanner = { action: 'added', level }
  for (const key of ['flagType', 'flagNote', 'flagLevel']) {
    delete data[key]
  }
  res.redirect(returnPage)
})

// Remove a flag: draft/remove-flag/<flag id>. Only the person who created
// it, or a team lead, can remove it, and they must say why.
const removeFlagPath = draftPath + '/remove-flag'

// Only the person who created a flag, or a team lead, can remove it
const canRemoveFlag = flag => flag.createdBy === signedInUser || roleOn(personas[signedInUser], todayInLondon()) === 'Back office team lead'

function renderRemoveFlag (res, flag, extra = {}) {
  res.locals.design = designs.find(design => design.url === removeFlagPath)
  const canRemove = canRemoveFlag(flag)
  res.render('prototypes/back-office/authorisation-workflow/draft/remove-flag', { flag, canRemove, ...extra })
}

// draft/remove-flag on its own shows the draft claim's flag, or else a flag
// the signed-in user created
router.get(removeFlagPath, (req, res) => {
  const flags = res.locals.flags
  const flag = res.locals.draftClaimFlag || flags.find(item => item.createdBy === signedInUser) || flags[0]
  res.redirect(removeFlagPath + '/' + encodeURIComponent(flag.id))
})

router.get(removeFlagPath + '/:flagId', (req, res, next) => {
  const flag = res.locals.flags.find(item => item.id === req.params.flagId)
  if (!flag) {
    return next()
  }
  renderRemoveFlag(res, flag)
})

router.post(removeFlagPath + '/:flagId', (req, res, next) => {
  const flag = res.locals.flags.find(item => item.id === req.params.flagId)
  if (!flag) {
    return next()
  }
  if (!canRemoveFlag(flag)) {
    return renderRemoveFlag(res, flag)
  }
  const reason = (req.body.removeFlagReason || '').trim()
  if (!reason) {
    return renderRemoveFlag(res, flag, { errors: { removeFlagReason: 'Enter why you are removing this flag' } })
  }
  const data = req.session.data
  data.flagsRemoved = {
    ...(data.flagsRemoved || {}),
    [flag.id]: { by: signedInUser, date: todayInLondon(), time: timeInLondon(), reason, createdAt: new Date().toISOString() }
  }
  data.flagBanner = { action: 'removed', level: flag.level }
  delete data.removeFlagReason
  res.redirect(draftPath + (flag.level === 'claim' ? '/claim-details' : '/agreement-details'))
})

//
// Reset prototype data
// ====================
//
// The "Reset prototype data" button on the Authorisation workflow index
// opens reset-data.html to confirm. Confirming clears everything stored in
// this browser's session, such as changed claim details, notes and withdrawn
// claim answers, and puts back app/data/session-data-defaults.js. It only
// affects the browser it is done in.
//

const sessionDataDefaults = require('../../../data/session-data-defaults')
const workflowPath = '/prototypes/back-office/authorisation-workflow'

router.post(workflowPath + '/reset-data', (req, res) => {
  req.session.data = { ...sessionDataDefaults, prototypeDataReset: true }
  res.redirect(workflowPath + '/')
})

// Show the "Prototype data reset" banner on the index once only
router.get(workflowPath + '/', (req, res, next) => {
  res.locals.prototypeDataReset = req.session.data.prototypeDataReset
  delete req.session.data.prototypeDataReset
  next()
})

//
// Reviewing a change
// ==================
//
// A team lead approves or rejects a change waiting for approval, from the
// "Review" link in the change log. Rejecting needs notes, approving does
// not. The decision is saved in changeDecisions and the team lead goes back
// to the change log, with a success banner.
//
// /draft/review-change on its own shows the first change waiting for
// approval, or the first change if none are waiting.
//

const reviewPath = draftPath + '/review-change'
const reviewer = 'teamLead'

router.get(reviewPath, (req, res) => {
  const entries = res.locals.changeLogEntries
  const entry = entries.find(item => item.approval === 'pending') || entries[0]
  res.redirect(reviewPath + '/' + encodeURIComponent(entry.id))
})

function findChange (req, res) {
  return res.locals.changeLogEntries.find(entry => entry.id === req.params.changeId)
}

function renderReview (res, entry, extra = {}) {
  res.locals.design = designs.find(design => design.url === reviewPath)
  res.render('prototypes/back-office/authorisation-workflow/draft/review-change', { change: entry, reviewer, ...extra })
}

router.get(reviewPath + '/:changeId', (req, res, next) => {
  const entry = findChange(req, res)
  if (!entry) {
    return next()
  }
  renderReview(res, entry)
})

router.post(reviewPath + '/:changeId', (req, res, next) => {
  const entry = findChange(req, res)
  if (!entry) {
    return next()
  }
  if (entry.approval !== 'pending' || entry.by === reviewer) {
    return res.redirect(reviewPath + '/' + encodeURIComponent(entry.id))
  }

  const decision = req.body.reviewDecision
  const notes = ((decision === 'rejected' ? req.body.rejectNotes : req.body.approveNotes) || '').trim()
  const errors = {}
  if (decision !== 'approved' && decision !== 'rejected') {
    errors.reviewDecision = 'Select if you approve or reject this change'
  } else if (decision === 'rejected' && !notes) {
    errors.rejectNotes = entry.withdrawal ? 'Enter why you are rejecting this request' : 'Enter why you are rejecting this change'
  }
  if (Object.keys(errors).length) {
    return renderReview(res, entry, { errors, values: req.body })
  }

  const data = req.session.data
  data.changeDecisions = {
    ...(data.changeDecisions || {}),
    [entry.id]: { decision, by: reviewer, date: todayInLondon(), time: timeInLondon(), notes }
  }
  data.changeLogBanner = { decision, summary: entry.summary, record: entry.record.number, by: entry.by }
  for (const key of ['reviewDecision', 'approveNotes', 'rejectNotes']) {
    delete data[key]
  }
  res.redirect(draftPath + '/change-log')
})

//
// Back office 1.0 optimisation
// ============================
//
// Pages in app/views/prototypes/back-office/v1-optimisation/ show the claim
// in app/views/prototypes/back-office/data/v1-optimisation.js, as v1Claim,
// with any changes made in the prototype.
//
// Changing a claim detail happens on its own page,
// v1-optimisation/change/<page>, not in a form in the middle of the claim
// as in the live service. The page asks for the new value and an optional
// note.
//
// Every change is a request that a team lead approves or rejects, on
// v1-optimisation/review/<request id>. Until then the claim shows the
// approved value, the proposed value and a "Pending approval" tag.
// A new request for a field that already has one waiting replaces it: the
// earlier request is "superseded". A team lead cannot review their own
// request: another team lead must (see v1-optimisation/notes).
//
// The signed-in user is a persona key in session data (v1User). The
// project index has links to sign in as each back office persona, for
// example ?v1User=teamLead. The default is caseOfficer (Sanjay Mehta).
//
// Session data (req.session.data):
//   v1User         - the signed-in persona's key
//   v1Requests     - every change request, oldest first. Starts as a copy
//                    of the requests in the data file. Each has id,
//                    fieldId, from, to, by (persona key), date, time, note,
//                    status ('pending', 'approved', 'rejected' or
//                    'superseded'), and once decided, decision (by, date,
//                    time, note) or supersededBy (a request id)
//   v1ClaimBanner  - set after a request or decision, to show a success
//                    banner on the claim once
//
// Open /prototypes/back-office/v1-optimisation/reset to clear it all.
//

const v1ClaimData = require('./data/v1-optimisation')
const v1Path = basePath + '/v1-optimisation'
const v1Users = ['caseOfficer', 'helenMarsh', 'leilaHaddad', 'teamLead']

// Format a YYYY-MM-DD date as '09/11/2026', as the live back office does
const liveDate = dateString => dateString.split('-').reverse().join('/')
// The time now in the UK, as HH:MM:SS, as the live history shows it
const v1TimeNow = () => new Date().toLocaleTimeString('en-GB', { hourCycle: 'h23', timeZone: 'Europe/London' })

// A persona's role, as the 1.0 pages show it
const v1Role = key => personas[key] && personas[key].type === 'Back office team lead' ? 'Team lead' : 'Case officer'

// The change requests: from the session once anything has changed,
// otherwise the ones in the data file
const v1RequestsOf = data => data.v1Requests || v1ClaimData.requests

router.use(v1Path, (req, res, next) => {
  const data = req.session.data
  if (!v1Users.includes(data.v1User)) {
    data.v1User = 'caseOfficer'
  }
  const userKey = data.v1User
  const requests = v1RequestsOf(data)

  // Approved values: the submitted values with approved requests applied,
  // oldest first
  const fields = v1ClaimData.fields.map(field => {
    let value = field.value
    for (const request of requests) {
      if (request.fieldId === field.id && request.status === 'approved') {
        value = request.to
      }
    }
    const pending = requests.find(request => request.fieldId === field.id && request.status === 'pending')
    return { ...field, value, pending }
  })
  const fieldById = Object.fromEntries(fields.map(field => [field.id, field]))
  const show = (field, text) => field.type === 'date' ? liveDate(text) : text

  // The history: the events in the data file, then a row for each request
  // and each decision, oldest first, as in the live service
  const person = key => ({ name: personas[key] ? personas[key].fullName : key, role: personas[key] ? v1Role(key) : '' })
  // Each row's status is the request's status at that point in time: a
  // request row is always 'pending', a decision row is 'approved' or
  // 'rejected', and when a new request replaces one still waiting, a
  // 'superseded' row comes just before the new request. order keeps rows
  // with the same date and time in that order.
  const requestEvents = requests.flatMap(request => {
    const field = fieldById[request.fieldId]
    const replaced = requests.find(item => item.supersededBy === request.id)
    const events = []
    if (replaced) {
      events.push({
        date: request.date,
        time: request.time,
        order: 0,
        action: field.label + ' change superseded',
        details: [{ key: 'Replaced by', value: 'the request by ' + person(request.by).name + ', below' }],
        status: 'superseded',
        ...person(request.by),
        note: ''
      })
    }
    events.push({
      date: request.date,
      time: request.time,
      order: 1,
      action: field.label + ' change requested',
      details: [
        { key: 'Previous value', value: show(field, request.from) },
        { key: 'Proposed value', value: show(field, request.to) },
        ...(replaced ? [{ key: 'Replaces', value: 'the request by ' + person(replaced.by).name + ' on ' + liveDate(replaced.date) }] : [])
      ],
      status: 'pending',
      ...person(request.by),
      note: request.note
    })
    if (request.decision) {
      events.push({
        date: request.decision.date,
        time: request.decision.time,
        order: 1,
        action: field.label + ' change ' + request.status,
        details: [{ key: 'Value', value: show(field, request.status === 'approved' ? request.to : request.from) }],
        status: request.status,
        ...person(request.decision.by),
        note: request.decision.note
      })
    }
    return events
  })
  const history = [
    ...v1ClaimData.history.map(event => ({ ...event, name: event.user, order: 1 })),
    ...requestEvents
  ].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time) || a.order - b.order)

  res.locals.v1Claim = { ...v1ClaimData, fields, history }
  res.locals.v1Requests = requests
  res.locals.v1UserKey = userKey
  res.locals.v1IsTeamLead = v1Role(userKey) === 'Team lead'
  res.locals.v1Users = v1Users.map(key => ({ key, name: personas[key].fullName, role: v1Role(key) }))
  if (req.method === 'GET' && req.path === '/claim-details') {
    res.locals.v1ClaimBanner = data.v1ClaimBanner
    delete data.v1ClaimBanner
  }
  next()
})

router.get(v1Path + '/reset', (req, res) => {
  for (const key of ['v1Requests', 'v1ClaimBanner', 'v1Value', 'v1Value-day', 'v1Value-month', 'v1Value-year', 'v1Note', 'v1Decision', 'v1ApproveNote', 'v1RejectNote']) {
    delete req.session.data[key]
  }
  res.redirect(v1Path + '/')
})

// A real date from day, month and year, as YYYY-MM-DD, or nothing
function v1DateValue (day, month, year) {
  if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month) || !/^\d{4}$/.test(year)) {
    return null
  }
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  if (date.getUTCDate() !== Number(day) || date.getUTCMonth() !== Number(month) - 1) {
    return null
  }
  return date.toISOString().slice(0, 10)
}

// An answer from a form. Checkboxes come as a list, with '_unchecked'
// added by the Prototype Kit, so take the first real value.
function v1Answer (req, name) {
  const raw = [].concat(req.body[name] || '').find(item => item && item !== '_unchecked') || ''
  return String(raw).trim()
}

function findV1Field (res, page) {
  return res.locals.v1Claim.fields.find(field => field.page === page)
}

function renderV1Change (res, field, extra = {}) {
  res.locals.design = designs.find(design => design.url === v1Path + '/change')
  res.render('prototypes/back-office/v1-optimisation/change', { field, ...extra })
}

router.get(v1Path + '/change/:page', (req, res, next) => {
  const field = findV1Field(res, req.params.page)
  if (!field) {
    return next()
  }
  renderV1Change(res, field)
})

router.post(v1Path + '/change/:page', (req, res, next) => {
  const field = findV1Field(res, req.params.page)
  if (!field) {
    return next()
  }
  const answer = name => v1Answer(req, name)
  const note = answer('v1Note')
  const errors = {}
  let value
  if (field.type === 'date') {
    value = v1DateValue(answer('v1Value-day'), answer('v1Value-month'), answer('v1Value-year'))
    if (!answer('v1Value-day') && !answer('v1Value-month') && !answer('v1Value-year')) {
      errors.v1Value = 'Enter the ' + field.name
    } else if (!value) {
      errors.v1Value = 'The ' + field.name + ' must be a real date'
    }
  } else if (field.type === 'radios') {
    value = answer('v1Value')
    if (!field.options.includes(value)) {
      errors.v1Value = 'Select the new ' + field.name
    }
  } else {
    value = answer('v1Value')
    if (!value) {
      errors.v1Value = 'Enter the ' + field.name
    }
  }
  if (!errors.v1Value && value === field.value) {
    errors.v1Value = (field.type === 'radios' ? 'Select a different ' : 'Enter a different ') + field.name + ', or select Cancel'
  }
  if (Object.keys(errors).length) {
    return renderV1Change(res, field, { errors, values: req.body })
  }

  // Send the change for approval. It replaces any request for this field
  // that is still waiting.
  const data = req.session.data
  const request = {
    id: 'request-' + Date.now(),
    fieldId: field.id,
    from: field.value,
    to: value,
    by: res.locals.v1UserKey,
    date: todayInLondon(),
    time: v1TimeNow(),
    note,
    status: 'pending'
  }
  data.v1Requests = [
    ...v1RequestsOf(data).map(item => item.fieldId === field.id && item.status === 'pending' ? { ...item, status: 'superseded', supersededBy: request.id } : item),
    request
  ]
  data.v1ClaimBanner = { action: 'requested', name: field.name, replaced: Boolean(field.pending) }
  for (const key of ['v1Value', 'v1Value-day', 'v1Value-month', 'v1Value-year', 'v1Note']) {
    delete data[key]
  }
  res.redirect(v1Path + '/claim-details')
})

// Reviewing a change request: a team lead approves or rejects it.
// Rejecting needs a reason, approving does not. Requests that are no
// longer waiting, or that the team lead made themselves, show without the
// form.
function findV1Request (res, id) {
  const request = res.locals.v1Requests.find(item => item.id === id)
  if (!request) {
    return null
  }
  const field = res.locals.v1Claim.fields.find(item => item.id === request.fieldId)
  return { request, field }
}

function renderV1Review (res, found, extra = {}) {
  res.locals.design = designs.find(design => design.url === v1Path + '/review')
  const canReview = res.locals.v1IsTeamLead && found.request.status === 'pending' && found.request.by !== res.locals.v1UserKey
  res.render('prototypes/back-office/v1-optimisation/review', {
    request: found.request,
    field: found.field,
    requester: { name: personas[found.request.by].fullName, role: v1Role(found.request.by) },
    canReview,
    ...extra
  })
}

// review on its own shows the first request waiting for approval
router.get(v1Path + '/review', (req, res) => {
  const requests = res.locals.v1Requests
  const request = requests.find(item => item.status === 'pending') || requests[requests.length - 1]
  res.redirect(v1Path + '/review/' + encodeURIComponent(request.id))
})

router.get(v1Path + '/review/:id', (req, res, next) => {
  const found = findV1Request(res, req.params.id)
  if (!found) {
    return next()
  }
  renderV1Review(res, found)
})

router.post(v1Path + '/review/:id', (req, res, next) => {
  const found = findV1Request(res, req.params.id)
  if (!found) {
    return next()
  }
  const userKey = res.locals.v1UserKey
  if (!res.locals.v1IsTeamLead || found.request.status !== 'pending' || found.request.by === userKey) {
    return res.redirect(v1Path + '/review/' + encodeURIComponent(found.request.id))
  }
  const decision = v1Answer(req, 'v1Decision')
  const note = v1Answer(req, decision === 'rejected' ? 'v1RejectNote' : 'v1ApproveNote')
  const errors = {}
  if (decision !== 'approved' && decision !== 'rejected') {
    errors.v1Decision = 'Select if you approve or reject this change'
  } else if (decision === 'rejected' && !note) {
    errors.v1RejectNote = 'Enter why you are rejecting this change'
  }
  if (Object.keys(errors).length) {
    return renderV1Review(res, found, { errors, values: req.body })
  }
  const data = req.session.data
  data.v1Requests = v1RequestsOf(data).map(item => item.id === found.request.id
    ? { ...item, status: decision, decision: { by: userKey, date: todayInLondon(), time: v1TimeNow(), note } }
    : item)
  data.v1ClaimBanner = { action: decision, name: found.field.name, by: personas[found.request.by].fullName }
  for (const key of ['v1Decision', 'v1ApproveNote', 'v1RejectNote']) {
    delete data[key]
  }
  res.redirect(v1Path + '/claim-details')
})

//
// Render back office pages
// ========================
//
// Renders any page in this folder from its address, as the Prototype Kit
// would, for example /prototypes/back-office/authorisation-workflow/draft/claims
// renders authorisation-workflow/draft/claims.html. Also for POST, so forms
// without a route of their own work.
//

router.get([basePath, basePath + '/'], (req, res) => {
  res.redirect(basePath + '/authorisation-workflow/')
})

router.all(basePath + '/*', (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return next()
  }
  const page = req.path.slice(basePath.length + 1).replace(/\/$/, '/index').replace(/\.html$/, '')
  const view = [page + '.html', page + '/index.html']
    .find(file => !file.includes('..') && fs.existsSync(path.join(__dirname, file)))
  if (!view) {
    return next()
  }
  res.render('prototypes/back-office/' + view)
})

module.exports = router
