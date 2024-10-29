//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here








// Log session data like form inputs selections and also the HTTP method like GET or POST
router.use((req, res, next) => { 
    const log = { 
    method: req.method, 
    url: req.originalUrl, 
    data: req.session.data 
    } 
    console.log(JSON.stringify(log, null, 2)) 
   
    next() 
    })


// Track navigation between pages
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
    next();
  });


// Default index route to render Design history at app/views/index.njk
router.get('/', (req, res) => {
    res.render('index');
  });
  
// Route for the ready-for-dev page
router.get('/ready-for-dev', (req, res) => {
    res.render('ready-for-dev.njk');
  });
  

// Load routes for prototypes
router.use('/prototypes/v01', require('./views/prototypes/v01/routes'));
// router.use('/prototypes/v02', require('./views/prototypes/v02/routes'));

// Load routes for ready-for-dev pages
// router.use('/ready-for-dev/AHWR-848', require('./ready-for-dev/AHWR-848/routes'));
// router.use('/ready-for-dev/AHWR-849', require('./ready-for-dev/AHWR-849/routes'));

// Default route for the latest prototype
router.use('/', require('./views/prototypes/v01/routes'));
