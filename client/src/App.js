import React, { Fragment } from 'react';
import './App.css';

// components
import TodoBoardContainer from './containers/TodoBoardContainer'


function App() {
  return (
    <Fragment>
      <div className='app'>
        <TodoBoardContainer />
      </div>
      
    </Fragment>
 
  );
}

export default App;
