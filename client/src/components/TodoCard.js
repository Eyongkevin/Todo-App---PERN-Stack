import React, { Fragment, useState} from 'react';
import {ChevronUpIcon, 
        ChevronDownIcon,
        PencilIcon,
        ListUnorderedIcon,
        TrashIcon} from '@primer/octicons-react'

import marked from 'marked';


import TodoCheckList from './TodoCheckList';
import { stageColors } from '../utils/colors'


const TodoCard =(props)=>{
    const [showDetail, setShowDetail] = useState(false);
    const {todo_id, description, done_timestamp, status} = props.card;
    let done = [{name:"setup Ubuntu 16.04",done:true},{name:"Reseach on new methodology and technique",done:false}]
    
    const arrowBtn = showDetail
                    ? <ChevronDownIcon  />                  
                    : <ChevronUpIcon  />

    const detailDisplay = showDetail ? <TodoCheckList tasks={done} />: null;

    let sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: stageColors[status.replace(' ','_')]
    }

    // Func
    const onChevronClick=(e)=>{
        e.preventDefault();
        setShowDetail(!showDetail)
    }


    return(
        <Fragment>
            <div className="card" > 
                <div style={sideColor} />
                <div className="card-header">
                    <div className="row">
                        <div className="col-3">
                        <a href="#" onClick={(e)=> onChevronClick(e)}>{arrowBtn}</a>
                        </div>
                        <div className="col-9">
                            <span className="float-right ">
                                <a href="#" ><PencilIcon className="IconBtns"  /></a>
                                <TrashIcon className="IconBtns" />
                                <ListUnorderedIcon className="IconBtns" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <span dangerouslySetInnerHTML={{__html:marked(description)}} />
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