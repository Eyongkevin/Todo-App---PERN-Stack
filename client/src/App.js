import React, { Fragment } from 'react';
import './App.css';

// components
import TodoBoard from './components/TodoBoard'


function App() {
  return (
    <Fragment>
      <div className='app'>
        <TodoBoard />
      </div>
      
    </Fragment>
 
  );
}

export default App;
