import React, { Fragment, useState } from 'react'
import {KebabHorizontalIcon} from '@primer/octicons-react'
import PropTypes from 'prop-types';



const Status =(props)=>{
    const [status, setStatus] = useState(props.status)
    const {todo_id} = props;

    const statusBtnTypes = {
        'Task'         :"info",
        'Do Today'     : "secondary",
        'In Progress'  : "primary",
        'Done'         : "success",
        'Stuck'        : "danger"
    }

    const StatusUpdate =(e)=>{
        try{
            e.preventDefault();
            const chosenStatus = e.target.innerHTML;
            //setStatus(statusTxt);
            if(status === chosenStatus)
                return;

            const body = { "status":chosenStatus };
            fetch(`http://localhost:5000/todo/status/${todo_id}`,{
                method: 'PUT',
                header:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    window.location = '/';
                });
        }catch(err){
            console.error(err.message);
        }
        

    }

    return(
        <Fragment>
            <span className="dropdown IconBtns">
                <a href="#" className={`btn btn-sm  py-0 px-0`} style={{fontSize: 0.1}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <KebabHorizontalIcon />
                </a>
                <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    {Object.keys(statusBtnTypes).map(s =>(
                        <a 
                        className="dropdown-item" 
                            href="#" 
                            key={s}
                            onClick={(e)=>StatusUpdate(e)}>{s}
                        </a>
                    ))}
                </span>
            </span>
        </Fragment>
    )
}

Status.propTypes = {
    todo_id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['Task','Do Today','In Progress','Done','Stuck'])
}

export default Status;


