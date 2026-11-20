//
// Claims for the draft claims list
// (app/views/prototypes/back-office/authorisation-workflow/draft/claims.html), and for counting
// flagged claims on the draft agreements list.
//
// Copied from the poultry-v01 back office prototype on 19 November 2026,
// moved here from the claims page on 20 November 2026. The first claim is
// the one on the draft claim page, so flags added in the prototype show in
// the list. Every claim links to the one draft claim page.
//
// Flags are not stored here. They are in app/views/prototypes/back-office/data/flags.js. A claim
// belongs to the agreement with the same SBI, which is the customer.
//
// Each claim has: claim (number), claimType, agreementType ('iahw' or
// 'pbr'), species, speciesKey, herd, cph, sbi, date (YYYY-MM-DD) and status.
//

module.exports = [
  { claim: "FUBC-HJ9N-S5PK", claimType: "Endemics", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Jo", cph: "12/254/1212", sbi: "107204504", date: "2026-10-30", status: "In check" },
  { claim: "PORE-F775-GVVX", claimType: "Review", agreementType: "pbr", species: "Broilers, Ducks, Turkeys", speciesKey: "poultry", herd: "East Farm", cph: "08/035/3979", sbi: "200439296", date: "2025-10-29", status: "On hold" },
  { claim: "REBC-M385-75C8", claimType: "Review", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Commercial", cph: "20/101/4272", sbi: "106592443", date: "2025-10-29", status: "In check" },
  { claim: "REBC-D9H7-BJQX", claimType: "Review", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Harwood 1", cph: "10/131/7588", sbi: "106740213", date: "2025-10-29", status: "Recommended to pay" },
  { claim: "FUPI-4496-S18L", claimType: "Endemics", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Redstone Farm Sows", cph: "18/035/7572", sbi: "119648441", date: "2025-10-29", status: "On hold" },
  { claim: "RESH-6598-1974", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "South field A", cph: "08/042/1752", sbi: "106415197", date: "2025-10-28", status: "Withdrawn" },
  { claim: "RESH-7539-7325", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "South field B", cph: "08/042/6613", sbi: "106415197", date: "2025-10-28", status: "In check" },
  { claim: "RESH-1740-7498", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "Late breds A", cph: "08/042/1752", sbi: "106415197", date: "2025-10-28", status: "In check" },
  { claim: "RESH-3277-8052", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "Late breds B", cph: "08/042/6613", sbi: "106415197", date: "2025-10-28", status: "In check" },
  { claim: "REBC-IQDU-K8XP", claimType: "Review", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Braybrook Mixed Beef Herd", cph: "09/056/9328", sbi: "107918634", date: "2025-10-28", status: "In check" },
  { claim: "RESH-MU5B-Z59E", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "Hawksmoor Mules", cph: "37/004/4781", sbi: "113469205", date: "2025-10-27", status: "In check" },
  { claim: "FUSH-H4YD-EV2K", claimType: "Endemics", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "Store Lambs", cph: "18/070/2217", sbi: "105832491", date: "2025-10-27", status: "In check" },
  { claim: "RESH-PIQR-HHXR", claimType: "Review", agreementType: "iahw", species: "Sheep", speciesKey: "sheep", herd: "Pedigrees", cph: "25/013/5594", sbi: "109568312", date: "2025-10-27", status: "Ready to pay" },
  { claim: "FUPI-WKTW-AJQE", claimType: "Endemics", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Northwind Breeding Herd", cph: "41/063/8049", sbi: "123295764", date: "2025-10-27", status: "In check" },
  { claim: "REPI-3JR1-XSL3", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Merrick Finishing Herd", cph: "08/028/3470", sbi: "106843519", date: "2025-10-27", status: "Ready to pay" },
  { claim: "REBC-MMZP-HGK1", claimType: "Review", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Angus", cph: "29/045/6903", sbi: "109452130", date: "2025-10-27", status: "Ready to pay" },
  { claim: "REPI-XDHJ-XHJN", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Hillview Site 3", cph: "14/023/9126", sbi: "144327896", date: "2025-10-27", status: "Ready to pay" },
  { claim: "REBC-6L4Q-FKV9", claimType: "Review", agreementType: "iahw", species: "Beef cattle", speciesKey: "beef-cattle", herd: "Commercial", cph: "33/067/1429", sbi: "113789054", date: "2025-10-27", status: "Ready to pay" },
  { claim: "REDC-7G73-TY22", claimType: "Review", agreementType: "iahw", species: "Dairy cattle", speciesKey: "dairy-cattle", herd: "Dunnings", cph: "46/012/8887", sbi: "208945671", date: "2025-10-27", status: "Ready to pay" },
  { claim: "REPI-2QJ8-IFVK", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Greenbank Pigs CU", cph: "21/036/0032", sbi: "113775119", date: "2025-10-26", status: "Ready to pay" },
  { claim: "REPI-SX14-82FL", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Finishers Site 9", cph: "03/075/4578", sbi: "116118345", date: "2025-10-26", status: "Ready to pay" },
  { claim: "REDC-7G73-TY22", claimType: "Review", agreementType: "iahw", species: "Dairy cattle", speciesKey: "dairy-cattle", herd: "Commercial", cph: "56/342/7575", sbi: "106616010", date: "2025-10-25", status: "Ready to pay" },
  { claim: "REPI-2QJ8-IFVK", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Pedigrees", cph: "65/757/8567", sbi: "107680408", date: "2025-10-25", status: "Ready to pay" },
  { claim: "REPI-SX14-82FL", claimType: "Review", agreementType: "iahw", species: "Pigs", speciesKey: "pigs", herd: "Herd 1", cph: "34/644/9684", sbi: "107680408", date: "2025-10-25", status: "Ready to pay" }
]
