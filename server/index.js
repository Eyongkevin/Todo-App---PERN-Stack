const express = require('express');
const cors = require('cors');
const pool = require('./db').pool;
const app = express();
const port = 5000;

//middleware: .use is used to add middlewares.
app.use(cors());
app.use(express.json({
    type: ['application/json', 'text/plain']
})); // Allow us to access request.body and get json data

// ROUTES //

// create a todo
// - async allows us to use 'await' which will wait till this function execute before proceeding.
// - 
app.post('/todo', async(req, res) =>{
    try{
        const {description, progress, status} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description, progress, status) VALUES($1, $2, $3) RETURNING *',
            [description, progress, status]
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
            'SELECT * FROM todo'
        );
        res.json(allTodos.rows);

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

app.listen(port, ()=>{
    console.log("Server has started on port ", port);
});
