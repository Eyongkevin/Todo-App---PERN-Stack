import React, {Fragment, useState} from 'react';

const EditTodo =(props)=>{
    const {todo_id} = props.todo;
    const [description, setDescription] = useState('');

    const updateTodo =()=>{
        try{
            const body = { description };
            fetch(`http://localhost:5000/todo/${todo_id}`,{
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
            {/* Button to Open the Modal */}
            <button onClick={()=>{setDescription(props.todo.description)}} type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target={`#id-${todo_id}`}>
            Edit
            </button>
            <div className="modal" id={`id-${todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                {/* Modal Header */}
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <input type='text' 
                        className='form-control'
                        value={description} 
                        onChange={(e) =>setDescription(e.target.value)}/>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-success"
                        onClick={updateTodo}>Apply</button>
                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                </div>


                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;