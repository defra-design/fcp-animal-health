//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Log session data like form inputs and HTTP method
router.use((req, res, next) => { 
  const log = { 
    method: req.method, 
    url: req.originalUrl, 
    data: req.session.data 
  }; 
  console.log(JSON.stringify(log, null, 2)); 
  next(); 
});

// Track navigation between pages
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl;
  res.locals.prevURL = req.get('Referrer');
  console.log('Previous page: ' + res.locals.prevURL + ', Current page: ' + req.url);
  next();
});

// Default index route
router.get('/', (req, res) => {
  res.render('index');
});

// Route for the ready-for-dev page
router.get('/ready-for-dev', (req, res) => {
  res.render('ready-for-dev.njk');
});

// Load routes for prototypes
router.use('/prototypes/v01', require('./views/prototypes/v01/routes'));

// Export router
module.exports = router;
