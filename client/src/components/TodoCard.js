import React, { Fragment, useState} from 'react';
import {ChevronUpIcon, 
        ChevronDownIcon,
        PencilIcon,
        TrashIcon} from '@primer/octicons-react'

import marked from 'marked';
import PropTypes from 'prop-types'


import TodoCheckList from './TodoCheckList';
import { stageColors } from '../utils/colors';
import Status  from './Status';

/**
 * Displays card of tasks with bottons to edit, delete and change status. It also contain the following component
 * - TodocheclList
 * @author Eyong Kevin Enowanyo
 * 
 * @example ../docs/examples/TodoCard.md
 */

const TodoCard =(props)=>{
    const [showDetail, setShowDetail] = useState(false);
    const {todo_id, description, done_timestamp, status} = props.card;
    let done = [{name:"setup Ubuntu 16.04",done:true},{name:"Reseach on new methodology and technique",done:false}]
    
    const arrowBtn = showDetail
                    ? <ChevronDownIcon  />                  
                    : <ChevronUpIcon  />

    const detailDisplay = showDetail ? <TodoCheckList tasks={done} />: null;

    let sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: stageColors[status.replace(' ','_')]
    }

    // Func
    const onChevronClick=(e)=>{
        e.preventDefault();
        setShowDetail(!showDetail)
    }
    const deleteTodo =(e,id) =>{
        e.preventDefault();

        fetch(`http://localhost:5000/todo/${id}`,{
            method: 'DELETE'
        })
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                window.location = '/';
                // It's wise to mimimize HTTP request.
                //getAllTodos();
                //setTodos(todos.filter((todo) => todo.todo_id !== data.todo_id));

            });
    }


    return(
        <Fragment>
            <div className="card" > 
                <div style={sideColor} />
                <div className="card-header">
                    <div className="row">
                        <div className="col-3">
                        <a href="#" onClick={(e)=> onChevronClick(e)}>{arrowBtn}</a>
                        </div>
                        <div className="col-9">
                            <span className="float-right">
                                <a href="#"><PencilIcon className="IconBtns"  /></a>
                                <a href="#" onClick={(e)=>deleteTodo(e,todo_id)} ><TrashIcon className="IconBtns" /></a>
                                <Status todo_id={todo_id} status={status} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <span dangerouslySetInnerHTML={{__html:marked(description)}} />
                    </p>
                    <div className="card__details">
                        {detailDisplay}
                    </div> 
                </div>
            </div>
        </Fragment>
    )
}

TodoCard.propTypes={
    card: PropTypes.shape({
        todo_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        done_timestamp: PropTypes.string
    }).isRequired
}
export default TodoCard;