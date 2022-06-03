// Leave me top space please

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