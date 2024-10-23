//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Add routes sepcific to this version of the prototype here






// Dynamic route to this version of the prototype
router.get('/*', (req, res) => {
  const page = req.params[0];
  res.render('prototypes/v01/views/' + page);
});


// Export the router so it can be used in the main routes file: app/routes.js
module.exports = router;
