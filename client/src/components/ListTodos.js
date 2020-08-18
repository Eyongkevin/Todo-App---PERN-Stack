import React, { Fragment} from 'react';

import TodoCard from './TodoCard';

//import EditTodo from './EditTodo'
//import Status from './Status'

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

export default ListTodo;