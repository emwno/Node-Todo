let data = ['1', '2', '3'];

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            todos: data
        });
    });

    app.post('/', function(req, res) {

    });

    app.delete('/', function(req, res) {

    });

};
