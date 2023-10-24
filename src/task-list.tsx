import React, { useEffect, useState } from "react";
import AddTask from "./task-add";
import { List, ListItem, ListItemText } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Populate from "./populate";
import EditTask from "./task-edit";
function TaskList() {
  const [count, setcount] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [dialogueopen, setdialogueopen] = useState(true)
  const handleDelete=(e:any)=>{
    localStorage.removeItem("task")
  }
  useEffect(() => {
    
  
    const string1 = localStorage.getItem("count");
    if (string1 !== null) {
      const count = parseInt(string1);
      setcount(count);
    }
  }, [localStorage.getItem("count")])
  
  useEffect(() => {
    const string1 = localStorage.getItem("count");
    if (string1 !== null) {
      const count = parseInt(string1);
      setcount(count);
    }
    for (let i = 0; i < count; i++) {
      {
        console.log(localStorage.getItem("task" + (i + 1)));
        const string1 = localStorage.getItem("task" + (i + 1));
        if (string1 !== null) {
          const jsonObj = JSON.parse(string1);
          setData([...data, (data[i] = jsonObj)]);
        }
      }
      
    }
  }, [count]);

  return count > 0 ? (
    <div>
      <List >
      {data.map((value:any) => (
       
   <Populate value={value} id={value.id}/>
  ))}
  
      </List>
      
    </div>
  ) : (
   <div>
     <AddTask  openDialog={dialogueopen} setopenModal={setdialogueopen} />
   </div>
  );
}

export default TaskList;
