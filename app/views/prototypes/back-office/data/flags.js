//
// Flags on agreements and claims, for the draft pages
// ====================================================
//
// Today the back office only flags agreements, and only team leads can do
// it. Flagging an agreement flags the business (SBI): everything the
// customer has is under suspicion. These designs propose flagging both:
// - an agreement: the customer, a serious concern (tier 1)
// - a claim: something found while checking one claim (tier 2)
// A claim shows when its agreement is flagged, and an agreement shows
// when any of its claims are flagged. A claim belongs to the agreement
// with the same SBI.
//
// Flags added and removed in the prototype are kept in session data and
// applied on top of these by app/views/prototypes/back-office/routes.js.
//
// Each flag has:
//   id          - unique
//   level       - 'agreement' or 'claim'
//   agreement   - the agreement number
//   sbi         - the customer's SBI
//   claim       - claim flags only: the claim number
//   scheme      - 'IAHW' or 'PBR'
//   type        - one of flagTypes
//   note        - optional, required when type is 'Other'
//   createdBy   - persona key from app/views/prototypes/back-office/data/personas.js
//   date        - YYYY-MM-DD
//   time        - 24-hour HH:MM, UK time
//
// The data is illustrative.
//

// Why something is flagged. Illustrative: to agree with the RPA.
const flagTypes = [
  { value: 'Evidence requested', hint: 'We have asked the customer or vet for evidence' },
  { value: 'Details do not match our records', hint: 'For example, the herd, CPH or vet details' },
  { value: 'Under investigation', hint: 'For example, a possible attempt to claim more than once' },
  { value: 'Other', hint: 'You must add a note' }
]

const flags = [
  { id: 'flag-1', level: 'agreement', agreement: 'AHWR-J76G-846L', sbi: '106415197', scheme: 'IAHW', type: 'Under investigation', note: '4 sheep review claims on the same day for herds with the same CPH.', createdBy: 'teamLead', date: '2025-10-29', time: '10:12' },
  { id: 'flag-2', level: 'claim', agreement: 'IAHW-HVBX-TF8I', sbi: '106592443', claim: 'REBC-M385-75C8', scheme: 'IAHW', type: 'Details do not match our records', note: 'The vet’s RCVS number is for a vet in another practice.', createdBy: 'caseOfficer', date: '2025-10-30', time: '14:40' },
  { id: 'flag-3', level: 'claim', agreement: 'IAHW-3HTQ-VIRW', sbi: '113775119', claim: 'REPI-2QJ8-IFVK', scheme: 'IAHW', type: 'Evidence requested', note: '', createdBy: 'helenMarsh', date: '2025-10-27', time: '09:15' },
  { id: 'flag-4', level: 'agreement', agreement: 'IAHW-AC83-GH79', sbi: '108477971', scheme: 'IAHW', type: 'Other', note: 'Agreement holder has rejected the new terms and conditions.', createdBy: 'caseOfficer', date: '2025-08-21', time: '11:19' },
  { id: 'flag-5', level: 'agreement', agreement: 'IAHW-JBU1-6BYF', sbi: '107314916', scheme: 'IAHW', type: 'Other', note: 'Customer refuses the new terms and conditions.', createdBy: 'caseOfficer', date: '2025-05-08', time: '14:22' },
  { id: 'flag-6', level: 'agreement', agreement: 'IAHW-AAAA-AAAA', sbi: '107597689', scheme: 'IAHW', type: 'Details do not match our records', note: 'Not in the poultry register.', createdBy: 'teamLead', date: '2025-10-01', time: '13:59' },
  { id: 'flag-7', level: 'agreement', agreement: 'IAHW-BQAC-SWF4', sbi: '106221605', scheme: 'IAHW', type: 'Other', note: 'Farmer has an Assisted Digital agreement.', createdBy: 'helenMarsh', date: '2025-09-19', time: '11:47' },
  { id: 'flag-8', level: 'agreement', agreement: 'AHWR-B271-8620', sbi: '122385434', scheme: 'IAHW', type: 'Under investigation', note: '', createdBy: 'teamLead', date: '2025-09-17', time: '13:34' },
  // More flags so the claims and agreements lists show a mix: claims
  // flagged, claims whose agreement is flagged, and one with both
  { id: 'flag-10', level: 'agreement', agreement: 'PBR-7KXD-3MWA', sbi: '200439296', scheme: 'PBR', type: 'Evidence requested', note: 'Asked for the flock records for all 3 species.', createdBy: 'teamLead', date: '2025-10-29', time: '15:05' },
  { id: 'flag-11', level: 'agreement', agreement: 'IAHW-R8NC-4FQT', sbi: '123295764', scheme: 'IAHW', type: 'Under investigation', note: 'Several follow-ups claimed for herds that are not on the holding register.', createdBy: 'helenMarsh', date: '2025-10-28', time: '10:41' },
  { id: 'flag-12', level: 'claim', agreement: 'IAHW-6TPV-H2LS', sbi: '105832491', claim: 'FUSH-H4YD-EV2K', scheme: 'IAHW', type: 'Details do not match our records', note: 'The herd CPH is registered to a different holding.', createdBy: 'caseOfficer', date: '2025-10-28', time: '11:52' },
  { id: 'flag-13', level: 'claim', agreement: 'IAHW-9QZB-K2DE', sbi: '107918634', claim: 'REBC-IQDU-K8XP', scheme: 'IAHW', type: 'Evidence requested', note: '', createdBy: 'caseOfficer', date: '2025-10-28', time: '16:20' },
  { id: 'flag-14', level: 'claim', agreement: 'AHWR-J76G-846L', sbi: '106415197', claim: 'RESH-7539-7325', scheme: 'IAHW', type: 'Details do not match our records', note: 'Same CPH and date of visit as RESH-6598-1974.', createdBy: 'teamLead', date: '2025-10-29', time: '10:30' },
  { id: 'flag-15', level: 'claim', agreement: 'IAHW-M3WC-7PRA', sbi: '106843519', claim: 'REPI-3JR1-XSL3', scheme: 'IAHW', type: 'Other', note: 'The date of visit is a Sunday. Checking with the vet practice.', createdBy: 'helenMarsh', date: '2025-10-27', time: '14:15' },
  { id: 'flag-9', level: 'agreement', agreement: 'IAHW-VPUC-9V1Y', sbi: '106293418', scheme: 'IAHW', type: 'Evidence requested', note: '', createdBy: 'caseOfficer', date: '2025-09-26', time: '12:30' }
]

module.exports = { flagTypes, flags }
