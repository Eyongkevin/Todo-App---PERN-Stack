import React, {Fragment} from 'react';
import { XCircleFillIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types';


/**
 * Used to display list of sub-todos to complete with checkbuttons on each todo
 * 
 * @param {array} props.tasks - array of objects containing tasks to complete
 * 
 * @author Eyong Kevin Enowanyo
 */
const TodoCheckList =(props)=>{
    // for each sub-todo, create a template with a checkbotton and a delete icon.
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

