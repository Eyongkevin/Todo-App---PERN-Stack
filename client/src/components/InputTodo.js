import React, { Fragment, useState } from 'react';


const InputTodo = () =>{
    const [description, setDescription] = useState('');

    const onSubmitForm =async(e) =>{
        e.preventDefault();
        try{
            const body = { 
                description,
                'progress': null,
                'status': 'Task'
             };
            fetch('http://localhost:5000/todo',{
                method: "POST",
                header:{
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
                
            })
                .then(response =>{
                    return response.text();
                })
                .then(data =>{
                    console.log(data);
                    window.location='/';
                })

        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <Fragment>
            <h1 className='text-center mt-5'>Kevin's Todo List</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type='text' 
                        className='form-control' 
                        placeholder='Insert todo..' 
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}} />
                <button 
                    className='btn btn-success'>Add</button>
            </form>
        </Fragment>
        
    )
}
export default InputTodo;

