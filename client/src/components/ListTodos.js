import React, { Fragment} from 'react';
import PropTypes from 'prop-types'

import TodoCard from './TodoCard';

//import EditTodo from './EditTodo'
//import Status from './Status'

/* const titlePropType = (props, propName, componentName)=>{
    if(props[propName]){
        let notString = '';
        let lenLongerThan80 = '';
        let value = props[propName];
        if(typeof value !== 'string')
            notString = "Not a string";
        if(value.length > 11)
            lenLongerThan80 = "Longer than 80";
        if(notString.length || lenLongerThan80.length)
            return new Error(
                `${propName} in ${componentName} is: ${notString}, ${lenLongerThan80}`
            )
        
    }
} */
const ListTodo = ({title, todo}) =>{
    let cards = Array.prototype.map.call(todo[title],(card) =>{
        return <TodoCard key={card.todo_id} card={card} />             
    });

    return(
        <Fragment>
            <div className="list">
                <h1>{title}</h1>
                {cards}
            </div>
            
        </Fragment>
    )
}

ListTodo.propTypes = {
    title: PropTypes.oneOf(['Task','Do Today','In Progress','Done','Stuck']),
    todo: PropTypes.objectOf(PropTypes.array).isRequired,
    id: PropTypes.string,
}

export default ListTodo;

