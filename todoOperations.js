const { addTodo, listTodos, markDone, deleteTodo } = require('./database');

function addNewTodo(title) {
    addTodo(title, (err, id) => {
        if (err) {
            console.error('Error adding todo:', err.message);
        } else {
            console.log(`Added todo with ID: ${id}`);
        }
    });

    return 'new todo';
}

function markTodoAsDone(id) {
    markDone(id, (err) => {
        if (err) {
            console.error('Error marking todo as done:', err.message);
        } else {
            console.log(`Marked todo with ID ${id} as done`);
        }
    });

    return 'done todo';
}

function deleteTodoItem(id) {
    deleteTodo(id, (err) => {
        if (err) {
            console.error('Error deleting todo:', err.message);
        } else {
            console.log(`Deleted todo with ID ${id}`);
        }
    });

    return 'deleted todo';
}

function getAllTodos() {
    listTodos((err, todos) => {
        console.log('todos :>> ', todos);
        if (err) {
            console.error('Error listing todos:', err.message);
        } else {
            console.log('Todos:');
            todos.forEach((todo) => {
                console.log(`- [${todo.status}] ${todo.title}`);
            });
        }
    });

    return 'all todos';
}

function getPendingTodos() {
    listTodos((err, todos) => {
        if (err) {
            console.error('Error listing todos:', err.message);
        } else {
            console.log('Pending Todos:');
            todos
                .filter((todo) => todo.status === 'pending')
                .forEach((todo) => {
                    console.log(`- ${todo.title}`);
                });
        }
    });

    return 'pending todos';
}

function getDoneTodos() {
    listTodos((err, todos) => {
        if (err) {
            console.error('Error listing todos:', err.message);
        } else {
            console.log('Done Todos:');
            todos
                .filter((todo) => todo.status === 'done')
                .forEach((todo) => {
                    console.log(`- ${todo.title}`);
                });
        }
    });

    return 'done todos';
}

module.exports = {
    addNewTodo,
    getAllTodos,
    getPendingTodos,
    getDoneTodos,
    markTodoAsDone,
    deleteTodoItem
};
