//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Generic route for capturing form data and redirecting
 router.post('/prototypes/v03/views/:nextPage', (req, res) => {
   req.session.data = {
     ...req.session.data,
     ...req.body
   };
   console.log('Session data:', req.session.data); 
   const nextPage = req.params.nextPage;
   res.redirect(`/prototypes/v03/views/${nextPage}`);
 });


// Route from holding page
router.get('next-task-v2', function (req, res) {
  res.render('prototypes/v03/views/index-research.njk') // 'index' for the v01 folder
});


// Dynamic route for rendering pages within this prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v03/views/' + page);
});

// Dynamic route from vet number
router.post('/prototypes/v03/views/new-user/700-test-urn', function(request, response) {

  var animalType = request.session.data['animalType']
  if (animalType == "Dairy cattle"){
      response.redirect("/551-pi-hunt")
  } else {
      response.redirect("/700-test-urn")
  }
})


// Dynamic route from only-herd-or-flock
router.post('/prototypes/v03/new-user/sc1/only-herd-or-flock-answer', function(request, response) {
console.log('post')
  var onlypigherd = request.session.data['only-pig-herd']
  if (onlypigherd == "yes"){
      response.redirect("only-herd-check-your-details")
  } else {
      response.redirect("herd-details")
  }
})



module.exports = router;
