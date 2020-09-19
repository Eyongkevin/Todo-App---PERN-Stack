import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import ListTodos from './ListTodos';

/**
 * Fetch all todos from the server and construct 5 lists of todos base on thier status.
 * 
 * @author Eyong Kevin Enowanyo
 * @example ../docs/examples/TodoBoard.md
 */
const TodoBoard = (props)=>{

    const { todos } = props;

    const todoLists = Object.keys(todos).map((stage) =>{
        return <ListTodos key={stage} 
                          id={stage.replace(' ','-')} 
                          title={stage} todo={todos[stage]}
                          taskCallbacks={props.taskCallbacks} />
    })

    return(
        <Fragment>
            <div className="app">
                { todoLists }
            </div>
        </Fragment>
    )
    
}

TodoBoard.propTypes = {
    todos: PropTypes.object.isRequired,
    taskCallbacks: PropTypes.shape({
        deleteTodo : PropTypes.func,
        StatusUpdate: PropTypes.func
    }).isRequired
}

export default TodoBoard;

