import React, {Fragment, useState, useEffect } from 'react';

import ListTodos from './ListTodos';
import { STATUS } from '../constants'

/**
 * Fetch all todos from the server and construct 5 lists of todos base on thier status.
 * 
 * @author Eyong Kevin Enowanyo
 * @example ../docs/examples/TodoBoard.md
 */
const TodoBoard = ()=>{
    const [todos, setTodos] = useState(false);

    const todoLists = Object.keys(todos).map((stage) =>{
        return <ListTodos key={stage} id={stage.replace(' ','-')} title={stage} todo={todos[stage]} />
    })

    /** 
     * Similar to componentDidMount and runs our 'getAllTodos()' on mount.
     * 
     * @method
     */
    useEffect(() =>{
        getAllTodos();
    },[]) // [] here ensure that 'useEffect' only does one request after the component gets mount
    
    /**
     * Fetch all todos from the server, use it to create objects of similar todos base on their status,
     * and update our state 'todos'
     * @method
     */
    const getAllTodos = ()=>{

        /** @async*/
        fetch('http://localhost:5000/todos',{
            method: 'GET',
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                // map todos into the different status.
                let stages = new Object();
                STATUS.map((stage) => {
                    return stages[stage] =Array.prototype.filter.call(data,(d)=> d.status === stage)
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
                { todoLists }
            </div>
        </Fragment>
    )
    
}

export default TodoBoard;

