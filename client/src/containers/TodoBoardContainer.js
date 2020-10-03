import React, { Component, Fragment } from 'react';
import update from 'immutability-helper'
import 'whatwg-fetch'

import TodoBoard from '../components/TodoBoard';
import { STATUS } from '../constants'
import { get_todo_index } from '../utils/helper_func'

/***
 * Serve as a container and responsible for fetching and updating the state. 
 * 
 * @author Eyong Kevin Enowanyo
 */
class TodoBoardContainer  extends Component{
    constructor(){
        super()
        this.state={
            todos: {},
            tasks: []
        }
    }
    /**
     * Runs a function to Fetch data from server when component mounts.
     * @method
     */
    componentDidMount(){
        this.getAllTodos()
    }
    /**
     * Fetch all todos from the server, use it to create objects of similar todos base on their status,
     * and update our state 'todos'
     * @method
     */
    getAllTodos(){
        /** @async*/
        fetch('http://localhost:5000/todos',{
            method: 'GET',
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                // extract todos and tasks from fetch
                const todo_data = data.todos
                const task_data = Object.values(data.tasks)
                // map todos into the different status.
                let stages = new Object();
                STATUS.map((stage) => {
                    return stages[stage] =Array.prototype.filter.call(todo_data,(d)=> d.status === stage)
                });
                console.log(stages);
                console.log(task_data)
                this.setState({todos:stages},
                    ()=>{
                        this.setState({tasks: task_data})
                    });
            });
    }
    //let done = [{name:"setup Ubuntu 16.04",done:true},{name:"Reseach on new methodology and technique",done:false}]
    /**
     * Delete this todo card from the todo list.
     * 
     * @param { object } e - event.
     * @param { Number } id - id of todo to delete.
     * @param { string } status - the status of the doto to be deleted
     */
    deleteTodo =(e,id, status) =>{
        e.preventDefault();

        /** @async */
        fetch(`http://localhost:5000/todo/${id}`,{
            method: 'DELETE'
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                // It's wise to mimimize HTTP request.

                // Find todo index where it is found in the state
                let todo_idx = get_todo_index(this.state.todos, id, status)
                // delete the todo and return a new todos object
                let newTodos = update(this.state.todos,
                    {[status]:{$splice: [[todo_idx, 1]]}})
                // set the state with new todos object
                this.setState({todos: newTodos});

            });
    }

    addTodo = ()=>{
        ;
    }

    /**
     * Hit our server with the new status. The server will update the status on the database
     * and our state. 
     * 
     * @param { object } e - event
     * @param { Number } todo_id - Id of todo
     * @param { String } status - todo's current status
     */
    StatusUpdate =(e,todo_id, status)=>{
        try{
            e.preventDefault();
            const chosenStatus = e.target.innerHTML;
            //setStatus(statusTxt);
            if(status === chosenStatus)
                // if status is the same, do nothing
                return;

            const body = { "status":chosenStatus };

            /** @async */
            fetch(`http://localhost:5000/todo/status/${todo_id}`,{
                method: 'PUT',
                header:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);

                    // Find todo index where it is found in the state
                    let todo_idx = get_todo_index(this.state.todos, todo_id, status)
                    // delete the todo from current state and add to new state
                    let newTodos = update(this.state.todos,
                        {
                            [status]:{$splice: [[todo_idx, 1]]},
                            [chosenStatus]:{$push: [data]}
                        }
                    )
                    
                    // set the state with new todos object
                    this.setState({todos: newTodos});
                });
        }catch(err){
            console.error(err.message);
        }
        

    }
    
    render(){
        return(
            <Fragment>
                <TodoBoard 
                    todos={ this.state.todos }
                    tasks = {this.state.tasks}
                    taskCallbacks ={{
                        "deleteTodo" : this.deleteTodo.bind(this),
                        "StatusUpdate" : this.StatusUpdate.bind(this)
                    }}
                     />
            </Fragment>
            
        )
    }

}

export default TodoBoardContainer;