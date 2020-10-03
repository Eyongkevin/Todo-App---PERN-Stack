const express = require('express');
const cors = require('cors');
const mustache = require('mustache');
const logger = require('morgan');
const pool = require('./db').pool;
const app = express();
const PORT = 5000;

/** MIDDLEWARE
 * Middlewares break down your application into smaller bits of behavior.
 * And are called one-by-one in a sequence.
 * Express uses '.use' to add middlewares
 */
app.use(cors());
app.use(express.json({
    // Allow us to access request.body and get json data
    // Since there are converted to text/plain when sent.
    type: ['application/json', 'text/plain']
})); 
app.use(logger('dev'));  // Set logger to monitor requests
/** ROUTING
 * Break the application into smaller functions that execute base on condition.
 */

 //********* TODOS ********* */

// create a todo
// - async allows us to use 'await' which will wait till this function execute before proceeding.
// - 
app.post('/todo', async(req, res) =>{
    try{
        const {description, done_timestamp, status} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description, status, done_timestamp) VALUES($1, $2, $3) RETURNING *',
            [description, status, done_timestamp]
        );
        res.json(newTodo.rows[0]);

    }catch(err){
        console.error(err.message);
    }
})
// get all todos

app.get('/todos', async(_, res)=>{
    try{
        const allTodos = await pool.query(
            'SELECT * FROM todo;'
        );
        const allTasks = await pool.query(
            'SELECT * FROM todochecklist;'
        )
        res.json({
            'todos': allTodos.rows,
            'tasks': allTasks.rows
        });


    }catch(err){
        console.error(err.message);
    }
})
// get a todo

app.get('/todo/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const getTodo = await pool.query(
            'SELECT * FROM todo WHERE todo_id=$1',[id]
        )
        res.json(getTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
    
})
// update a todo
app.put('/todo/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *',
            [description, id]
        )
        res.json(updateTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
    
});
// update status
app.put('/todo/status/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updateStatus = await pool.query(
            'UPDATE todo SET status=$1 WHERE todo_id=$2 RETURNING *',
            [status, id]
        );
        res.json(updateStatus.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// delete a todo
app.delete('/todo/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id=$1 RETURNING *',
            [id]
        )
        res.json(deleteTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
    
});

 //********* CHECKLIST ********* */
 
 // add task
 app.post('/task', async(req, res) =>{
     try{
        const {task, task_id} = req.body;
        const created_at = new Date().toISOString();
        const addTask = await pool.query(
             'INSERT INTO todochecklist (task, task_id, created_at) VALUES($1, $2, $3) RETURNING *',
             [task, task_id, created_at]
         )
         res.json(addTask.rows[0])
     }
     catch(err){
         console.error(err.message);
     }
 })


// 400 bad request if none above matches.
app.use((req,res) =>{
    res.statusCode = 400;
    res.end("Error! Bad Request");
})

// Start Express server at port and logs  that it has started.
app.listen(PORT, ()=>{
    const serverAlert = mustache.render("Server has started on port {{port}}",{
        port: PORT
    });
    console.log(serverAlert);
});
