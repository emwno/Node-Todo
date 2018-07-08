let localTodoData = [];
const Todo = require('../model/todo.js');

module.exports = function(app, backendless) {

    app.get('/', function(req, res) {

        Backendless.Data.of(Todo).find()
            .then(function(result) {
                localTodoData = result;
                res.render('index', {
                    todos: result
                });
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });
    });

    app.post('/', function(req, res) {
        let todoClass = new Todo(req.body.todoItem);

        backendless.Data.of(Todo).save(todoClass)
            .then(function(obj) {
                localTodoData.push(obj);
                res.render('index', {
                    todos: localTodoData
                });
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });
    });

    app.delete('/', function(req, res) {

    });

};
