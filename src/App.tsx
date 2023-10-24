
import { Button } from '@material-ui/core';
import './App.css';
import AddTask from './task-add';
import TaskList from './task-list';
import { useState } from 'react';
function App() {
const [openModal, setopenModal] = useState(false)
const handleLoginModal=()=>{
  setopenModal(true)
}
  return (
    <div className="App">
      <header className="App-header">
        <TaskList/>
        <Button onClick={handleLoginModal}>Add New Task</Button>
        <AddTask openDialog={openModal} setopenModal={setopenModal}/>
      </header>
    </div>
  );
}

export default App;
