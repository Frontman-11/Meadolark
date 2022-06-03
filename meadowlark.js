const express = require('express');
const app = express();
const handlers = require('./lib/handlers.js')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));





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
        reqAccept: req.accepts('pics'),
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

const { getFortune } = require("./lib/fortune.js");

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




