import React, { Fragment, useState } from 'react'
import {KebabHorizontalIcon} from '@primer/octicons-react'
import PropTypes from 'prop-types';


import { STATUS } from '../constants'


/**
 * Create a dropdown list of options to change the status of a todo card.
 * This is displayed as an icon '...' at the top-right of the todo card.
 * 
 * @param { Number } props.todo_id - the id of the todo that this component is attached to.
 * @param { str } props.status - status of the todo card to which this component is attached to.
 * 
 * @author Eyong Kevin Enowanyo
 * @example ../docs/examples/Status.md
 */
const Status =(props)=>{
    const [status, setStatus] = useState(props.status)
    const {todo_id} = props;

    
    // Create the dropdown list with status as options.
    let dropDownOptions = STATUS.map(s =>(
        <a 
        className="dropdown-item" 
            href="#" 
            key={s}
            onClick={(e)=>StatusUpdate(e)}>{s}
        </a>
    ))
    
    /**
     * Hit our server with the new status. The server will update the status on the database
     * and the app will refresh so that new status from database is fetched. 
     * 
     * @param { object } e - event
     */
    const StatusUpdate =(e)=>{
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
                    window.location = '/';
                });
        }catch(err){
            console.error(err.message);
        }
        

    }

    return(
        <Fragment>
            <span className="dropdown IconBtns">
                <a href="#" className={`btn btn-sm  py-0 px-0`} style={{fontSize: 0.1}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <KebabHorizontalIcon />
                </a>
                <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    { dropDownOptions }
                </span>
            </span>
        </Fragment>
    )
}

Status.propTypes = {
    todo_id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(STATUS)
}

export default Status;


