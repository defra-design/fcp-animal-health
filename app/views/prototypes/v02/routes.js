//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Generic route for capturing form data and redirecting
 router.post('/prototypes/v02/views/:nextPage', (req, res) => {
   req.session.data = {
     ...req.session.data,
     ...req.body
   };
   console.log('Session data:', req.session.data); 
   const nextPage = req.params.nextPage;
   res.redirect(`/prototypes/v02/views/${nextPage}`);
 });


// Route from holding page
router.get('next-task-v2', function (req, res) {
  res.render('prototypes/v02/views/index-research.njk') // 'index' for the v01 folder
});


// Dynamic route for rendering pages within this prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v02/views/' + page);
});

// Dynamic route from vet number
router.post('/prototypes/v02/views/new-user/700-test-urn', function(request, response) {

  var animalType = request.session.data['animalType']
  if (animalType == "Dairy cattle"){
      response.redirect("/551-pi-hunt")
  } else {
      response.redirect("/700-test-urn")
  }
})



// // Route from 200-claim-type page
// router.post('/prototypes/v02/new-user/300-review-date', function(request, response) {
// console.log('Check if the route is applied here!')
//   var claimType = request.session.data['claimType']
//   if (claimType == "Endemic disease follow-up"){
//       response.redirect("/prototypes/v02/new-user/301-follow-up-date")
//   } else {
//       response.redirect("/prototypes/v02/new-user/301-review-date")
//   }
// })

// // Test of previous variable
// router.post('/prototypes/v02/new-user/300-review-date', function(request, response) {
//   console.log('Check if the route is applied here!')
//     var claimType = request.session.data['claimType']
//     if (claimType == "Endemic disease follow-up" && foo == "sheep"){
//         response.redirect("/prototypes/v02/new-user/301-follow-up-date")
//     } else if() {
//         response.redirect("/prototypes/v02/new-user/301-review-date")
//     }
//   })


module.exports = router;
