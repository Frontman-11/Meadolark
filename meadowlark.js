const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multiparty = require('multiparty')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const handlers = require('./lib/handlers.js')
const { getFortune } = require("./lib/fortune.js");
const { credentials } = require('./config')

// const multiparty = require('multiparty')


// app.disable('x-powered-by');
const expresshandlebars = require("express-handlebars").create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', expresshandlebars.engine);
app.set('view engine', 'handlebars');


// adding static middleware
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

//Experiment

// app.use((req, res, next) => {
//     console.log('\n\nALLWAYS')
//     next()
// })
// app.get('/a', (req, res) => {
//     console.log('/a: route terminated')
//     res.send('a')
// })
// app.get('/a', (req, res) => { console.log('/a: never called'); })
// app.get('/b', (req, res, next) => {
//     console.log('/b: route not terminated')
//     next()
// })
// app.use((req, res, next) => {
//     console.log('SOMETIMES')
//     next()
// })
// app.get('/b', (req, res, next) => {
//     console.log('/b (part 2): error thrown')
//     throw new Error('b failed')
// })
// app.use('/b', (err, req, res, next) => {
//     console.log('/b error detected and passed on')
//     next(err)
// })
// app.get('/c', (err, req) => {
//     console.log('/c: error thrown')
//     throw new Error('c failed')
// })
// app.use('/c', (err, req, res, next) => {
//     console.log('/c: error detected but not passed on')
//     next()
// })
// app.use((err, req, res, next) => {
//     console.log('unhandled error detected: ' + err.message)
//     res.send('500 - server error')
// })
// app.use((req, res) => {
//     console.log('route not handled')
//     res.send('404 - not found')
// })

//Experimet





app.get('/', function (req, res) {
    res.render('home', { title: 'Home meadowlark' });
});

app.get('/re', function (req, res) {
    res.redirect(302, "about");
});

app.get('/js', function (req, res) {
    res.type('text/plain');
    res.json(array = ['FrontMan', 'meadowlark', 'testing object with res.send'
    ]);
});


app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: getFortune(),
        title: 'About Meadowlark',
    });
});

app.get('/tours/hood-river', function (req, res) {
    console.log({
        reqUrl: req.url,
        reqPath: req.path,
        reqQuery: req.query,
        reqBody: req.body,
        // reqHeader: req.headers,
        reqRoute: req.route,
        reqParams: req.params,
        // reqCookies: req.cookies,
        // reqAccept: req.accepts('pics'),
        reqIP: req.ip,
        //The next line is discouraged in usage
        reqHostname: req.hostname,
        //The line above is dicouraged in usage
        reqProtocol: req.protocol,
        reqSecure: req.secure,
        reqXhr: req.xhr,
    })
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    // console.log({
    //     reqUrl: req.url,
    //     reqPath: req.path,
    //     reqQuery: req.query,
    // })
    res.render('tours/request-group-rate');
});
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

//added by me
app.get('/vacationphoto', handlers.vacationPhoto)
app.get('/vacationphotoajax', handlers.vacationPhotoAjax)
//added by me

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.message })
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

app.post('/api/contest-vacation-photo/:year/:month', (req, res) => {
    console.log('got here')
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.message })
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})
// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(port, function () {
    console.log(`Express started on http://localhost:' +
            ${port} press Ctrl - C to terminate.`);
});
