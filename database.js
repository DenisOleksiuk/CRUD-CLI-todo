const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client
    .connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Connection error', err.stack));

client.query(
    `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT NOT NULL
  )
`,
    (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "todos" created successfully');
        }
    }
);

const addTodo = (title, callback) => {
    client.query(
        'INSERT INTO todos (title, status) VALUES ($1, $2) RETURNING id',
        [title, 'pending'],
        (err, res) => {
            client.end();
            callback(err, res ? res.rows[0].id : null);
        }
    );
};

const listTodos = (callback) => {
    client.query('SELECT * FROM todos', (err, res) => {
        client.end();
        callback(err, res ? res.rows : null);
    });
};

const markDone = (id, callback) => {
    client.query('UPDATE todos SET status = $1 WHERE id = $2', ['done', id], (err) => {
        client.end();
        callback(err);
    });
};

const deleteTodo = (id, callback) => {
    client.query('DELETE FROM todos WHERE id = $1', [id], (err) => {
        client.end();
        callback(err);
    });
};

module.exports = { addTodo, listTodos, markDone, deleteTodo };
