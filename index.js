const { program } = require('commander');

const {
    addNewTodo,
    getAllTodos,
    getPendingTodos,
    getDoneTodos,
    markTodoAsDone,
    deleteTodoItem
} = require('./todoOperations');

program.version('1.0.0').description('CLI Todo List Application');

program.option('-n, --new <title>', 'Add a new todo item');
program.option('-l, --list <all|pending|done>', 'List all todo items');
program.option('-d, --done <id>', 'Mark a todo as done');
program.option('-x, --delete <id>', 'Delete a todo');

program.parse(process.argv);

const options = program.opts();
console.log('options :>> ', options);

if (options.new) {
    addNewTodo(options.new);
}

if (options.list) {
    const getTodosMap = {
        all: getAllTodos,
        pending: getPendingTodos,
        done: getDoneTodos
    };
    const getTodos = getTodosMap[options.list];
    if (getTodos) {
        getTodos();
    } else {
        console.error('Invalid list option. Use "all", "pending", or "done"');
    }
}

if (options.done) {
    markTodoAsDone(options.done);
}

if (options.delete) {
    deleteTodoItem(options.delete);
}
