import React, {Fragment, useState, useEffect } from 'react';

import ListTodos from './ListTodos';

const TodoBoard = ()=>{
    const [todos, setTodos] = useState(false);
    const stageOptions = ['Task','Do Today','In Progress','Done','Stuck']; // for testing

    const todoList = Object.keys(todos).map((stage) =>{
        return <ListTodos key={stage} id={stage.replace(' ','-')} title={stage} todo={todos[stage]} />
    })

    // Func
    useEffect(() =>{
        getAllTodos();
    },[]) // [] here ensure that 'useEffect' only does one request after the component gets mount
    
    const getAllTodos = ()=>{
        fetch('http://localhost:5000/todos',{
            method: 'GET',
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                let stages = new Object();
                stageOptions.map((stage) => stages[stage] ={
                    [stage] : Array.prototype.filter.call(data,(d)=> d.status === stage)
                });
                console.log(stages);
                setTodos(stages);
            });
    }
    /* const deleteTodo =(id) =>{
        fetch(`http://localhost:5000/todo/${id}`,{
            method: 'DELETE'
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                // It's wise to mimimize HTTP request.
                //getAllTodos();
                setTodos(todos.filter((todo) => todo.todo_id !== data.todo_id));

            });
    } */
    
    return(
        <Fragment>
            <div className="app">
                { todoList }
            </div>
        </Fragment>
    )
    
}

export default TodoBoard;