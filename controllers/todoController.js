let data = [];

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            todos: data
        });
    });

    app.post('/', function(req, res) {
        data.push(req.body.todoItem);
        res.render('index', {
            todos: data
        });
    });

    app.delete('/', function(req, res) {

    });

};
