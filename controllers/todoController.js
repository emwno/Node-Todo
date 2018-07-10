let localTodoData = [];
const Todo = require('../model/todo.js');
const timeAgo = require('timeago.js');

function isLoggedIn(req, res, next) {
    if (!req.session.currentUser) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = function(app) {

    app.get('/', isLoggedIn, function(req, res) {

        let queryBuilder = Backendless.DataQueryBuilder.create()
            .setWhereClause('ofUser =\'' + req.session.currentUser.objectId + '\'')
            .setPageSize(50)
            .setSortBy('created DESC');

        Backendless.Data.of(Todo).find(queryBuilder)
            .then(function(result) {
                localTodoData = result;
                res.render('index', {
                    user: req.session.currentUser,
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
        let todoClass = new Todo(req.session.currentUser.objectId, req.body.todoItem);

        Backendless.Data.of(Todo).save(todoClass)
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
