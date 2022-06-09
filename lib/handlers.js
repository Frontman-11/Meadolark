// Leave me top space please
exports.api = {}


exports.newsletterSignup = (req, res) => {
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible formfield): ' + req.body.email)
    console.log(req.body)
    res.redirect(303, '/newsletter-signup/thank-you')

}

exports.newsletterSignupThankYou = (req,
    res) => res.render('newsletter-signup-thank-you')


//added by me
exports.vacationPhoto = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}
//added by me
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log(req.path)
    console.log('field data: ', fields)
    console.log('files: ', files)
    console.log(JSON.stringify(files.photo[0].headers))
    res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('contest/vacation-photo-thank-you')
}
//USING FETCH API
exports.newsletter = (req, res) => {
    // we will learn about CSRF later...for now, we just 
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}

exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token: ' + req.body._csrf)
    console.log('Name: ' + req.body.name);
    console.log('Email: ' + req.body.email);
    console.log(Object.keys(req.body))
    res.send({ result: 'Info Received from header: ' + JSON.stringify(req.headers) })
}

exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    console.log(JSON.stringify(files.photo[0].headers))
    console.log('QueryPath: ' + req.path)
    res.send({ result: 'success', })
}
