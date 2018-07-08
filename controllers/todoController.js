let localTodoData = [];
const Todo = require('../model/todo.js');
const timeAgo = require('timeago.js');

module.exports = function(app, backendless) {

    app.get('/', function(req, res) {
        let dataQueryBuilder = backendless.DataQueryBuilder.create();
        dataQueryBuilder.setSortBy(['created DESC']);

        Backendless.Data.of(Todo).find(dataQueryBuilder)
            .then(function(result) {
                localTodoData = result;
                res.render('index', {
                    todos: result,
                    helpers: {
                        formatTime: function(ms) {
                            return timeAgo().format(ms);
                        }
                    }
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
                localTodoData.unshift(obj);
                res.render('index', {
                    todos: localTodoData,
                    helpers: {
                        formatTime: function(ms) {
                            return timeAgo().format(ms);
                        }
                    }
                });
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });
    });

    app.delete('/', function(req, res) {

    });

};
