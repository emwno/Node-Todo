module.exports = function(app) {

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', function(req, res) {
        Backendless.UserService.login(req.body.username,
                req.body.password, true)
            .then(function(loggedInUser) {
                req.session.currentUser = loggedInUser;
                res.redirect('/');
            })
            .catch(function(error) {
                console.log('Error: ' + error);
                res.render('login', {
                    error: error
                });
            });
    });

};
