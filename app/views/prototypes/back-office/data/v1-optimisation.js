//
// Back office 1.0 optimisation: the claim on the claim details page
// =================================================================
//
// Copied from the live service's QA site (26 November 2026), so the page
// matches what back office users see today. The people and email
// addresses are QA test data. The signed-in user is the case officer
// persona (Sanjay Mehta), not the QA tester.
//
// Available on every page in app/views/prototypes/back-office/v1-optimisation/
// as v1Claim (see routes.js).
//
// Dates are YYYY-MM-DD. Pages show them as the live service does, for
// example 09/09/2026, with the liveDate filter.
//
// Claim fields have:
//   id     - short name, for links and, later, for changes to the field
//   label  - the key on the page, as in the live service
//   value  - text, a YYYY-MM-DD date (type 'date'), a list of items
//            (type 'list'), a status (type 'status') or one of a list of
//            options (type 'radios', with options)
//   change - true if the live service shows a Change link. Fields with a
//            page also have one in the prototype, even if the live
//            service does not (the test result)
//   page   - fields that can be changed in the prototype: the address of
//            their update page, v1-optimisation/change/<page>
//   name   - the label as it reads mid-sentence, for example in "Update
//            date of visit". Keeps acronyms in capitals.
//   hint   - optional hint for the new value on the update page
//   format - optional pattern the new value must match, with formatError
//            the message when it does not (the herd CPH)
//
//   value is what the farmer submitted. The claim shows it with any
//   approved requests applied.
//
// History events have date, time (24-hour HH:MM:SS), action, user and
// note, as in the live service's History tab. These are events that are
// not change requests. routes.js adds a row for each request and each
// team lead decision.
//
// Requests are changes to the claim that back office users asked for, for
// a team lead to approve. They use the 2.0 personas (data/personas.js):
// case officers Helen Marsh and Leila Haddad, and team lead Mei Chen. Each
// has id, fieldId, from, to, by (persona key), date, time, note and status
// ('pending', 'approved', 'rejected' or 'superseded'). Decided ones have
// decision: by, date, time and note. The prototype copies them into the
// session the first time anything changes (see routes.js).
//

module.exports = {
  number: 'REPI-H224-5SUN',
  status: 'In check',
  flagged: true,
  businessName: 'R HAZELL',

  agreement: {
    number: 'IAHW-QVK6-8TDM',
    date: '2026-09-09',
    holder: 'Leah Verran',
    holderEmail: 'leahverrang@narrevhaelo.com.test',
    sbi: '200801537',
    address: '1 HEIGHTS BARN, LONG LANE, LITTLE WALDEN, DROITWICH, GL13 9EU, United Kingdom',
    businessEmail: 'rhazellc@llezahrf.com.test',
    herds: [
      { type: 'Beef cattle', count: 0 },
      { type: 'Dairy cattle', count: 0 },
      { type: 'Sheep', count: 0 },
      { type: 'Pigs', count: 1 }
    ]
  },

  fields: [
    { id: 'status', label: 'Status', type: 'status', value: 'In check', change: true },
    { id: 'claimDate', label: 'Claim date', type: 'date', value: '2026-10-14' },
    { id: 'businessName', label: 'Business name', value: 'R HAZELL' },
    { id: 'livestock', label: 'Livestock', value: 'Pigs' },
    { id: 'typeOfVisit', label: 'Type of visit', value: 'Animal health and welfare review' },
    { id: 'dateOfVisit', label: 'Date of visit', type: 'date', value: '2026-11-25', change: true, page: 'date-of-visit', name: 'date of visit' },
    { id: 'herdName', label: 'Herd name', value: 'Shah Show and Tell' },
    { id: 'herdCph', label: 'Herd CPH', value: '12/345/2345', page: 'herd-cph', name: 'herd CPH', hint: 'For example, 12/345/6789', format: /^\d{2}\/\d{3}\/\d{4}$/, formatError: 'Enter the herd CPH in the correct format, like 12/345/6789' },
    { id: 'onlyHerd', label: 'Is this the only herd on this SBI?', value: 'Yes' },
    { id: 'herdReasons', label: 'Reasons the herd is separate', type: 'list', value: ['This is the only herd'] },
    { id: 'dateOfSampling', label: 'Date of sampling', type: 'date', value: '2026-10-14', page: 'date-of-sampling', name: 'date of sampling' },
    { id: 'pigs51OrMore', label: '51 or more pigs', value: 'Yes' },
    { id: 'bloodSamples', label: 'Number of blood samples taken', value: '30' },
    { id: 'vetName', label: 'Vet’s name', value: 'Amelia', change: true, page: 'vet-name', name: 'vet’s name' },
    { id: 'vetRcvs', label: 'Vet’s RCVS number', value: '123465X', change: true, page: 'vet-rcvs', name: 'vet’s RCVS number' },
    { id: 'animalsTested', label: 'Number of animals tested', value: '50' },
    { id: 'urn', label: 'Unique lab reference number (URN)', value: 'URN8914224', page: 'urn', name: 'unique lab reference number (URN)' },
    { id: 'testResult', label: 'Test result', type: 'radios', options: ['Positive', 'Negative'], value: 'Positive', page: 'test-result', name: 'test result' }
  ],

  history: [
    { date: '2026-10-14', time: '15:24:06', action: 'Moved to ‘In Check’', user: 'admin', note: '' }
  ],

  requests: [
    {
      id: 'request-1',
      fieldId: 'vetRcvs',
      from: '123465X',
      to: '123456X',
      by: 'helenMarsh',
      date: '2026-10-20',
      time: '10:12:31',
      note: 'The vet’s practice emailed to say the RCVS number was mistyped on the claim.',
      status: 'approved',
      decision: { by: 'teamLead', date: '2026-10-20', time: '14:03:11', note: '' }
    },
    {
      id: 'request-2',
      fieldId: 'vetName',
      from: 'Amelia',
      to: 'Amelia Jones',
      by: 'leilaHaddad',
      date: '2026-10-28',
      time: '11:30:05',
      note: 'Adding the vet’s surname.',
      status: 'rejected',
      decision: { by: 'teamLead', date: '2026-10-28', time: '16:45:40', note: 'The vet summary only gives Amelia. Check the RCVS register before changing it.' }
    },
    {
      id: 'request-3',
      fieldId: 'dateOfVisit',
      from: '2026-11-25',
      to: '2026-10-14',
      by: 'helenMarsh',
      date: '2026-11-24',
      time: '09:41:52',
      note: 'The date of visit is after the claim date. The vet summary says 14 October.',
      status: 'pending'
    }
  ]
}
