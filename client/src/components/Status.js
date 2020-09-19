import React, { Fragment, useState } from 'react'
import {KebabHorizontalIcon} from '@primer/octicons-react'
import PropTypes from 'prop-types';


import { STATUS } from '../constants'


/**
 * Create a dropdown list of options to change the status of a todo card.
 * This is displayed as an icon '...' at the top-right of the todo card.
 * 
 * @param { Number } props.todo_id - the id this todo card.
 * @param { str } props.status - status of this todo card.
 * @param { func } props.StatusUpdate - callback function to update the status of a todo
 * 
 * @author Eyong Kevin Enowanyo
 */
const Status =(props)=>{
    const { todo_id, status, StatusUpdate } = props
 
    // Create the dropdown list with status as options.
    let dropDownOptions = STATUS.map(s =>(
        <a 
        className="dropdown-item" 
            href="#" 
            key={s}
            onClick={(e)=>StatusUpdate(e, todo_id, status)}>{s}
        </a>
    ))
    

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
    status: PropTypes.oneOf(STATUS),
    StatusUpdate: PropTypes.func.isRequired
}

export default Status;


