import React, { Fragment, useState } from 'react'



const Status =(props)=>{
    const [status, setStatus] = useState(props.status)
    const {todo_id} = props;

    const statusBtnTypes = {
        'Task':"secondary",
        'In Progress': "primary",
        'Done': "success",
        'Stuck': "danger"
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
            <div className="dropdown">
            <button className={`btn btn-${statusBtnTypes[status]} btn-sm dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {status}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {Object.keys(statusBtnTypes).map(s =>(
                    <a 
                    className="dropdown-item" 
                        href="#" 
                        key={s}
                        onClick={(e)=>StatusUpdate(e)}>{s}
                    </a>
                ))}
            </div>
            </div>
        </Fragment>
    )
}

export default Status;


