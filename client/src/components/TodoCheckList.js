import React, {Fragment} from 'react';


const TodoCheckList =(props)=>{

    let tasks = props.tasks.map((task,idx) =>(
        <li key={`task-${idx}`} className="checklist__task">
            <input type="checkbox" defaultChecked={task.done} />
            {task.name}
            <a href="#" className="checklist__task--remove" />
        </li>
    ));

    return(
        <Fragment>
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        </Fragment>

    )
}

export default TodoCheckList;