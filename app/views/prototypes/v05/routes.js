//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Generic route for capturing form data and redirecting
 router.post('/prototypes/v05/views/:nextPage', (req, res) => {
   req.session.data = {
     ...req.session.data,
     ...req.body
   };
   console.log('Session data:', req.session.data); 
   const nextPage = req.params.nextPage;
   res.redirect(`/prototypes/v05/views/${nextPage}`);
 });

// Route from holding page
router.get('next-task-v5', function (req, res) {
  res.render('prototypes/v05/views/index-research.njk') // 'index' for the v05 folder
})

// Dynamic route for rendering pages within this prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v05/views/' + page);
});

module.exports = router;
