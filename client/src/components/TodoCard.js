import React, { Fragment, useState} from 'react';
import {ChevronUpIcon, 
        ChevronDownIcon,
        PencilIcon,
        ListUnorderedIcon,
        XIcon} from '@primer/octicons-react'


import TodoCheckList from './TodoCheckList';


const TodoCard =(props)=>{
    const [showDetail, setShowDetail] = useState(false);
    const {todo_id, description, done_timestamp, status} = props.card;
    let done = [{name:"setup Ubuntu 16.04",done:true},{name:"Reseach on new methodology",done:false}]
    
    const arrowBtn = showDetail
                    ? <i onClick={(e)=> onChevronClick(e)}><ChevronDownIcon /></i>                   
                    :<i onClick={(e)=> onChevronClick(e)}><ChevronUpIcon  /></i>

    const detailDisplay = showDetail ? <TodoCheckList tasks={done} />: null;

    // Func
    const onChevronClick=(e)=>{
        e.preventDefault();
        setShowDetail(!showDetail)
    }

    return(
        <Fragment>
            <div className="card" > 
                <div className="card-header">
                    <div className="row">
                        <div className="col-3">
                            {arrowBtn}
                        </div>
                        <div className="col-9">
                            <span className="float-right ">
                                <a href="#" ><PencilIcon className="IconBtns"  /></a>
                                <XIcon className="IconBtns" />
                                <ListUnorderedIcon className="IconBtns" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {description}
                    </p>
                    <div className="card__details">
                        {detailDisplay}
                    </div> 
                </div>
            </div>
        </Fragment>
    )
}

export default TodoCard;