import React, { Component, Fragment } from 'react';
import update from 'immutability-helper'
import 'whatwg-fetch'

import TodoBoard from '../components/TodoBoard';
import { STATUS, API_URL, SERVER_ERROR_MESSAGE } from '../constants'
import { get_todo_index, get_task_index } from '../utils/helper_func'

/***
 * Serve as a container and responsible for fetching and updating the state. 
 * Uses prop drilling to pass props down to it's children
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
        fetch(`${API_URL}/todos`,{
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
    /**
     * Delete this todo card from the todo list.
     * 
     * @param { Object } e - event.
     * @param { Number } id - id of todo to delete.
     * @param { String } status - the status of the doto to be deleted
     */
    deleteTodo =(e,id, status) =>{
        e.preventDefault();

        // Keep the original state of task in case server fails and we need to revert
        let prevState_todos = this.state.todos

        // Find todo index where it is found in the state
        let todo_idx = get_todo_index(this.state.todos, id, status)
        // delete the todo and return a new todos object
        let newTodos = update(this.state.todos,
            {[status]:{$splice: [[todo_idx, 1]]}})

        // set the state with new todos object
        this.setState({todos: newTodos},
            ()=>{
                /** @async */
                fetch(`${API_URL}/tod/${id}`,{
                    method: 'DELETE'
                })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error(SERVER_ERROR_MESSAGE + "Failed to delete")
                        }
                        
                    })
                    .then(data =>{
                        console.log(data);   

                    })
                    .catch((error)=>{
                        console.error(error.message)
                        // Revert if server fails
                        this.setState({todos: prevState_todos})
                    })
            });   
    }
    /**
     * Add a task to the todo card
     * @param { String } value - the task to be added
     * @param { Number } id - todo id
     */
    addTask =(value, id)=>{
        const body={
            'task': value,
            'task_id': id
        }
        /** @async */
        fetch(`${API_URL}/task`,{
            method: 'POST',
            header:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data)
                // push the new added task to the array of state tasks.
                const newTask = update(this.state.tasks,
                    {$push: [data]})
                this.setState({tasks: newTask})
            })
            .catch((err)=>{
                console.log(SERVER_ERROR_MESSAGE)
            })
    }
    /**
     * Delete a task
     * @param { Object } e - event object
     * @param { Number } id - task id 
     */
    deleteTask = (e, id)=>{
        e.preventDefault()

        // Keep the original state of task in case server fails and we need to revert
        let prevState_tasks = this.state.tasks

        let task_idx = get_task_index(this.state.tasks, id)

        let newTasks = update(this.state.tasks,
            {$splice: [[task_idx, 1]]})
        this.setState({tasks: newTasks},
            ()=>{
                /** @async */
                fetch(`${API_URL}/task/${id}`, {
                    method: 'DELETE'
                })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error(SERVER_ERROR_MESSAGE + "Failed to delete task")
                        }
                        
                    })
                    .then(data =>{
                        console.log(data)
                    })
                    .catch((error)=>{
                        console.error(error.message)
                        this.setState({tasks: prevState_tasks})
                    })
            })
        
    }   
    /**
     * Toggle task checkbox
     * 
     * Here, we first update the state before updating the database.
     * 
     * When a user clicks on the checkbox, this callback is fired to update the database.
     * @param { Number } id - task id
     */
    toggleTask = (id) =>{
        // declare our new done variable. This will be updated later
        // and used in our fetch
        let body ={
            newDone: null
        }

        // Keep the original state of task in case server fails and we need to revert
        let prevState_task = this.state.tasks

        //get the index of this task from the state
        const task_idx = get_task_index(this.state.tasks, id)
        // update the done property of the task and assign our new done value to 'newDone'
        const newTasks = update(this.state.tasks,{
            [task_idx]:{
                done: {$apply: (done) => {
                    body.newDone = !done
                    return body.newDone
                }}
            }
        });
        
        // New update the state
        this.setState({tasks: newTasks},
            ()=>{
                // After updating the state, update the database.
                /** @async */
                fetch(`${API_URL}/task/${id}`, {
                    method: 'PUT',
                    header:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }else{
                            // if server failed, throw and error
                            throw new Error(SERVER_ERROR_MESSAGE + "Failed to toggle task checkbox")
                        }
                        
                    })
                    .then(data =>{
                        console.log(data)        
                    })
                    .catch((error) =>{
                        // revert if any error 
                        console.error(error.message)
                        this.setState({tasks: prevState_task})
                    })
            })
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
        e.preventDefault();
        const chosenStatus = e.target.innerHTML;
        if(status === chosenStatus)
        // if status is the same, do nothing
        return;

        // Keep the original state of task in case server fails and we need to revert
        const prevState_todos = this.state.todos
    
        // Find todo index where it is found in the state
        let todo_idx = get_todo_index(this.state.todos, todo_id, status)

        // update the todo's status and get a new copy of the todos state
        const newTodos = update(this.state.todos,{
            [status]: {
                [todo_idx]:{
                    status:{$set: chosenStatus}
                }
            }
        }) 
        
        // delete updated todo under the current status position and return it
        const newTodo = newTodos[status].splice(todo_idx, 1)
        // add the deleted todo to the new status position
        const newUpdatedTodos = update(newTodos, {
            [chosenStatus]:{$push: newTodo}
            
        })
        // Update state
        this.setState({todos: newUpdatedTodos},
            ()=>{
                // Update database
                const body = { "status":chosenStatus };

                /** @async */
                fetch(`${API_URL}/todo/status/${todo_id}`,{
                    method: 'PUT',
                    header:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error(SERVER_ERROR_MESSAGE + "Failed to update status")
                        }                       
                    })
                    .then(data =>{
                        console.log(data);
                    })
                    .catch((error)=>{
                        console.error(error.message);
                        // revert if server fails
                        this.setState({todos: prevState_todos})
                    })
            });
    }
    
    render(){
        return(
            <Fragment>
                <TodoBoard 
                    todos={ this.state.todos }
                    tasks = {this.state.tasks}
                    taskCallbacks ={{
                        "deleteTodo" : this.deleteTodo,
                        "StatusUpdate" : this.StatusUpdate,
                        "deleteTask": this.deleteTask,
                        "addTask": this.addTask,
                        "toggleTask": this.toggleTask
                    }}
                     />
            </Fragment>
            
        )
    }

}

export default TodoBoardContainer;