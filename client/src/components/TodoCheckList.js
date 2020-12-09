import React, {Fragment, useRef, useEffect, useState} from 'react';
import { XCircleFillIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types';
import marked from 'marked';

import { TASK_COLORS } from '../constants/index';


/**
 * Used to display list of sub-todos to complete with checkbuttons on each todo
 * 
 * @param {array} props.tasks - array of objects containing tasks to complete
 * 
 * @author Eyong Kevin Enowanyo
 */
const TodoCheckList =(props)=>{
    const [task_changed, setTaskChage] = useState(false);
    const [prevTasks, setPrevTask] = useState(0);
    const [task_delete, setTaskDeleteChange]= useState(false);
    // to use the input object
    const textInput = useRef(null);


    if(props.tasks.length > prevTasks){
        /*
        * If next tasks length is greater than previous one,
        * set `task_changed` state and update the prevTasks value
        * */
        setTaskChage(!task_changed);
        setPrevTask(props.tasks.length);

    } else if(props.tasks.length < prevTasks){
        /*
        * if next tasks length is smaller, just update prevTasks value. This is to ensure that
        * if an input is done after a deleting, the condition above will still hold.
        * Also, update the task_delete that will permit us to focus on the input at task delete.
        */
        setPrevTask(props.tasks.length);
        setTaskDeleteChange(!task_delete);
    } 

    /**
     * Run `clearInput` when component first mounts
     */
    useEffect(()=>{
        clearInput();
    },[]); // runs only once.

    /**
     * Runs `clearInput` when component first mounts and 
     * each time `task_changed` changes.
     * 
     */
    useEffect(()=>{
        clearInput();
    },[task_changed]);

    /**
     * On task delete, focus on the input. 
     */
    useEffect(()=>{
        textInput.current.focus();
    },[task_delete]);

    /**
     * Clear the input field and focus on the input field using its ref
     */
    const clearInput=()=>{
        textInput.current.value = '';
        textInput.current.focus();
    }
    /**
     * Get a random color to be used as background color for sub-tasks.
     * Check to make sure subsequent tasks don't have the same color.
     * @returns { String } task_color - color to use as background for sub-task
     */
    const getTaskColor=()=>{
        // Get the last task's color
        const last_task_color = props.tasks[props.tasks.length-1].color;
        let task_color = last_task_color;

        while(task_color == last_task_color){
            // Get random color 
            task_color = TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)];
        }
        return task_color;
    }
    /**
     * Whenever a button is pressed, check if it's 'Enter' button, then 
     * call a callback if the input value is not zero. Then, clear the input value and focus
     * 
     * @param { object } e - event
     */
    const checkInputPressKey=(e)=>{
        if(e.key === 'Enter'){
            // If the 'Enter' key was pressed

            if(e.target.value.length === 0 ){
                // @TODO: insert error message in an error div
                console.log("Please enter a task");
            }else{
                // Randomly select a color to be set and background color for the task
                const task_color = getTaskColor();

                // call 'addTask' callback
                props.taskCallbacks.addTask(e.target.value, props.todo_id, task_color)
            }
            
        }
    }

    // for each sub-todo, create a template with a checkbotton and a delete icon.
    let tasks = props.tasks.map((task,idx) =>{
        return <li key={`task-${idx}`} className="checklist__task">
            <div className="row" style={{backgroundColor: task.color}}>
                <div className="col-1">
                    <input type="checkbox" checked={task.done} onChange={
                        ()=>props.taskCallbacks.toggleTask(task.todochecklist_id)
                    }  />
                    
                </div>
                <div className="col-8 task-text" >
                    <span dangerouslySetInnerHTML={{__html:marked(task.task)}} />
                    
                </div>
                <div className="col-1 task-remove">
                    <a href="#" onClick={
                        (e)=>props.taskCallbacks.deleteTask(e, task.todochecklist_id)
                    }>
                        <XCircleFillIcon  className="checklist__task--remove" />
                    </a>
                </div>
            </div>
            
        </li>
    });

    return(
        <Fragment>
            <div className="checklist">
                <ul className="list-group list-group-flush">
                    {tasks}
                </ul>
                <input type="text"
                    ref={textInput}
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={ checkInputPressKey } />
            </div>
        </Fragment>
    )
}
//TodoCheckList.displayName = "TodoCheckList"
TodoCheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object.isRequired
}

export default TodoCheckList;

