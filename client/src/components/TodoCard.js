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
 * Displays a todo card with bottons to edit, delete and change status. It uses the component 
 * - TodoCheckList
 * 
 * To display a check list of sub-todo tasks to complete.
 * 
 * @param { object } props.card - requirements to create our todo card.
 * 
 * @author Eyong Kevin Enowanyo
 * @example ../docs/examples/TodoCard.md
 */

const TodoCard =(props)=>{
    const [showDetail, setShowDetail] = useState(false);
    const {todo_id, description, done_timestamp, status} = props.card;
    // for testing. List of sub-todo tasks to complete.
    let done = [{name:"setup Ubuntu 16.04",done:true},{name:"Reseach on new methodology and technique",done:false}]
    // Base on the boolean value of showDetail, display a down or up icon.
    const arrowBtn = showDetail
                    ? <ChevronDownIcon  />                  
                    : <ChevronUpIcon  />
    // if showDetail is true, display a check list.
    const detailDisplay = showDetail ? <TodoCheckList tasks={done} />: null;
    // color on the left-side of the card.
    let sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: stageColors[status.replace(' ','_')]
    }

    /**
     * Toggle the value of the state 'showDetail' to either true or false.
     *  - If true, a downIcon(ChevronDownIcon) will be displayed on the card and a check list(TodoCheckList) 
     *      of sub-todos will be made visible.
     *  - If false, a upIcon(ChevronUpIcon) will be displayed on the card and the check list will be hidden.
     * 
     * @param { object } e - event
     */
    const onChevronClick=(e)=>{
        e.preventDefault(); // prevent default behavior 
        setShowDetail(!showDetail)
    }
    /**
     * Delete this todo card from the todo list and refresh.
     * 
     * @param { object } e - event.
     * @param { Number } id - id of todo to delete.
     */
    const deleteTodo =(e,id) =>{
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