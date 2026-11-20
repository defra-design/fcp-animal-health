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

// Add your routes here

const designs = require('./data/designs')
const projects = require('./data/projects')
const personas = require('./data/personas')

// Make the lists of projects, designs and personas, the design for the
// current page, and today's date (UK time, as YYYY-MM-DD) available to
// every view
router.use(basePath, (req, res, next) => {
  res.locals.projects = projects
  res.locals.personas = personas
  res.locals.designs = designs
  res.locals.today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
  res.locals.design = designs.find(design => design.url === req.baseUrl + req.path)
  // The page's path without the query string, for links back to the same
  // page, such as the widescreen toggle on draft pages
  res.locals.currentPath = req.baseUrl + req.path
  next()
})

// Draft user pages for the Authorisation workflow, for example
// /prototypes/back-office/authorisation-workflow/draft/users/backOfficeAdministrator.
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
//   claimEditBanner   - set after saving changes or adding a note, to show
//                       a success banner once. status is 'saved', 'pending'
//                       or 'note'.
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
// Batches and notes both have createdAt, so the claim history can show them
// in the order they happened, as claimSessionEvents.
//
// Open /prototypes/back-office/authorisation-workflow/draft/claim-edit/reset to clear it all.
//

const claimEditFields = require('./data/claim-edit-fields')
const changeLog = require('./data/change-log')
const draftPath = '/prototypes/back-office/authorisation-workflow/draft'
const claimEditPath = draftPath + '/claim-edit'

const todayInLondon = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })

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

  // Batches and notes together, newest first, each with kind 'changes' or 'note'
  res.locals.claimSessionEvents = [
    ...batches.map(batch => ({ ...batch, kind: 'changes' })),
    ...(data.claimNotes || []).map(note => ({ ...note, kind: 'note' }))
  ].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))

  // The draft change log: changes made in the prototype, newest first, then
  // the illustrative entries in app/views/prototypes/back-office/data/change-log.js, sorted by date.
  // Session batches are always on the claim on the draft claim page.
  const decisions = data.changeDecisions || {}
  const sessionChanges = batches.map(batch => ({
    id: batch.id,
    date: batch.date,
    record: { kind: 'claim', number: 'FUBC-HJ9N-S5PK', claimType: 'Follow-up' },
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
  const staticChanges = changeLog.entries.map(entry => {
    const decision = decisions[entry.id]
    return decision ? { ...entry, approval: decision.decision } : entry
  })
  // Who decided, when and their notes, from the decision if there is one
  res.locals.changeLogEntries = [...sessionChanges, ...staticChanges]
    .map(entry => {
      const decision = decisions[entry.id]
      return decision ? { ...entry, decidedBy: decision.by, decidedDate: decision.date, decisionNotes: decision.notes } : entry
    })
    .sort((a, b) => b.date.localeCompare(a.date))
  res.locals.changeLogTypes = changeLog.changeTypes

  // Show the banner after saving once only
  if (req.method === 'GET' && req.path === '/claim-details') {
    res.locals.claimEditBanner = data.claimEditBanner
    delete data.claimEditBanner
  }
  // Show the banner after a team lead's decision once only
  if (req.method === 'GET' && req.path === '/change-log') {
    res.locals.changeLogBanner = data.changeLogBanner
    delete data.changeLogBanner
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
    by: 'backOfficeAdministrator',
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
    by: 'backOfficeAdministrator',
    text
  }, ...(data.claimNotes || [])]
  data.claimEditBanner = { status: 'note' }
  delete data.claimNote
  res.redirect(draftPath + '/claim-details')
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
const reviewer = 'backOfficeLead'

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
    errors.rejectNotes = 'Enter why you are rejecting this change'
  }
  if (Object.keys(errors).length) {
    return renderReview(res, entry, { errors, values: req.body })
  }

  const data = req.session.data
  data.changeDecisions = {
    ...(data.changeDecisions || {}),
    [entry.id]: { decision, by: reviewer, date: todayInLondon(), notes }
  }
  data.changeLogBanner = { decision, summary: entry.summary, record: entry.record.number, by: entry.by }
  for (const key of ['reviewDecision', 'approveNotes', 'rejectNotes']) {
    delete data[key]
  }
  res.redirect(draftPath + '/change-log')
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
