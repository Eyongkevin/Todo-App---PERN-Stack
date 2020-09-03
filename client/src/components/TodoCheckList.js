import React, {Fragment} from 'react';
import { XCircleFillIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types';


/**
 * Used to display list of tasks to complete with checkbuttons on each todo
 * @author Eyong Kevin Enowanyo
 * @param {array} props.tasks - array of objects containing tasks to complete
 * 
 * @example ../docs/examples/TodoCheckList.md
 */
const TodoCheckList =(props)=>{
    /*
    * Construct an html template of tasks with their checkbutton.
    */
    let tasks = props.tasks.map((task,idx) =>(
        <li key={`task-${idx}`} className="checklist__task">
            <div className="row">
                <div className="col-1">
                    <input type="checkbox" defaultChecked={task.done} />
                </div>
                <div className="col-9">
                    {task.name}
                </div>
                <div className="col-1">
                    <a href="#" >
                        <XCircleFillIcon className="checklist__task--remove" />
                    </a>
                </div>
            </div>
            
        </li>
    ));

    return(
        <Fragment>
            <div className="checklist">
                <ul className="list-group list-group-flush">
                    {tasks}
                </ul>
                <input type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task" />
            </div>
        </Fragment>
    )
}
//TodoCheckList.displayName = "TodoCheckList"
TodoCheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TodoCheckList;

