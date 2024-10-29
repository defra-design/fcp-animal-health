//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Generic route for capturing form data and redirecting
router.post('/prototypes/v01/new-user/:nextPage', (req, res) => {
  req.session.data = {
    ...req.session.data,
    ...req.body
  };
  console.log('Session data:', req.session.data); 
  const nextPage = req.params.nextPage;
  res.redirect(`/prototypes/v01/new-user/${nextPage}`);
});






// Dynamic route for rendering pages within this prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v01/views/' + page);
});

module.exports = router;
