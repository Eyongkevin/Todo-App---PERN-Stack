const Pool = require('pg').Pool;

// Establish connection to our database
const pool = new Pool({
    user: 'todo_user',
    password: 'todo',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports ={
    pool
};