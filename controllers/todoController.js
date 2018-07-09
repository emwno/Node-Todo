let localTodoData = [];
const Todo = require('../model/todo.js');
const timeAgo = require('timeago.js');

function isLoggedIn(req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = function(app) {

    app.get('/', isLoggedIn, function(req, res) {
        let currentUserL;

        Backendless.UserService.getCurrentUser()
            .then(function(currentUser) {
                currentUserL = currentUser;
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });

        let dataQueryBuilder = Backendless.DataQueryBuilder.create();
        dataQueryBuilder.setSortBy(['created DESC']);

        Backendless.Data.of(Todo).find(dataQueryBuilder)
            .then(function(result) {
                localTodoData = result;
                res.render('index', {
                    user: currentUserL,
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
