import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from './EditTodo'
import Status from './Status'

const ListTodo = () =>{
    const [todos, setTodos] = useState(false);

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
                setTodos(data);
            });
    }
    const deleteTodo =(id) =>{
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
    }
    return(
        <Fragment>
            <table className="table mt-5 text-center table-borderless table-hover">
                <thead className="thead-dark">
                    <tr className="d-flex">
                        <th className="col-8">Description</th>
                        <th className="col-1">Edit</th>
                        <th className="col-1">Delete</th>
                        <th className="col-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos &&
                    todos.map((todo) =>{
                        return <tr key={todo.todo_id} className="d-flex">
                                    <td className="col-sm-8">
                                        {todo.description}
                                    </td>
                                    <td className="col-sm-1"><EditTodo  todo={todo}/></td>
                                    <td className="col-sm-1">
                                    <button 
                                        className='btn btn-danger btn-sm'
                                        onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
                                    </td>
                                    <td className="col-sm-2">
                                        <Status todo_id={todo.todo_id} status={todo.status} />
                                    </td>
                                </tr>
                    })
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo;