import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import EditTask from "./task-edit";
import React, { useState } from "react";
interface Iprops {
value:any;
id:any
}
function Populate(props: Iprops) {
  const { value, id } = props;
  const [openedit, setopenedit] = useState(false)
  const deleteItem = (e: any) => {
    localStorage.removeItem("task" + id);
    const string1 = localStorage.getItem("count");
    if (string1 !== null) {
      const string2 = parseInt(string1) - 1;
      localStorage.setItem("count", string2.toString());
      //window.location.reload();
    }
    
    
  };
  return (
    <ListItem key={value} divider={true}>
      <ListItemText primary={value.taskHeader} secondary={value.taskBody} />
      <ListItemText secondary={`${value.date} ${value.time}`} />
      {value.isImportnat ? (
        <ListItemAvatar>
          <Avatar alt="!" src="/src" />
        </ListItemAvatar>
      ) : null}
      {
        <div onClick={deleteItem} style={{cursor:"pointer"}} >
          <Avatar alt="D" src="/src"  />
        </div>
      }
      {/* {
        <div onClick={()=>{setopenedit(true)}}>
          <Avatar alt="E" src="/src" />
        </div>
       
      }
       {openedit?<EditTask openDialog={true} id={value.id}/>:null} */}
    </ListItem>
  );
}

export default Populate;
