//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Add routes sepcific to this version of the prototype here

// router.post('/check-your-answers', function (req, res) {
//   // Store the user input in session data
//   req.session.data['animal-type'] = req.body.contact;
//   req.session.data['review-date'] = req.body.contact;
//   req.session.data['sample-date'] = req.body.contact;
//   req.session.data['animals-number'] = req.body.contact;
//   req.session.data['sample-number'] = req.body.contact;
//   req.session.data['vets-name'] = req.body.contact;
//   req.session.data['vets-rcvs'] = req.body.contact;
//   req.session.data['test-urn'] = req.body.contact;
//   req.session.data['test-result'] = req.body.contact;

  
//   // Redirect to Check your answers page
//   res.redirect('/check-your-answers');
// });


// Generic route for capturing form data and redirecting
router.post('/prototypes/v01/new-user/:nextPage', function (req, res) {
  // Merge submitted form data with session data
  req.session.data = {
    ...req.session.data,
    ...req.body
  };

  // Redirect to the next page based on the URL
  const nextPage = req.params.nextPage;
  res.redirect(`/prototypes/v01/new-user/${nextPage}`);
});


// Log session data in console
router.post('/prototypes/v01/new-user/:nextPage', function (req, res) {
  console.log('Form data:', req.body); 
  req.session.data = {
    ...req.session.data,
    ...req.body
  };
  console.log('Session data:', req.session.data); 
  const nextPage = req.params.nextPage;
  res.redirect(`//prototypes/v01/new-user/${nextPage}`);
});







// Dynamic route to this version of the prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v01/views/' + page);
});


// Export the router so it can be used in the main routes file: app/routes.js
module.exports = router;
