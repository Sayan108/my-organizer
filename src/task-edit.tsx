import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  OutlinedInput,
  TextField,
  Button,
  FormControl,
  Checkbox,
  Dialog,
  DialogContent
} from "@material-ui/core";
function EditTask(props:any) {
  let {openDialog,id} = props;
  const [modalopen, setmodalopen] = useState(openDialog)
  const handleClose=()=>{
   setmodalopen(false)
  }
  
  const [taskDetails, setTaskDetails] = useState<{
    taskHeader: string;
    taskBody: string;
    time: string;
    date: string;
    isImportnat: boolean;
    id:number
  }>({ taskHeader: "", taskBody: "", time: "", date: "", isImportnat: false,id:-1 });
  const [disabled, setdisabled] = useState(true);
  const taskData=localStorage.getItem("task"+id)
  if(taskData!==null){
    setTaskDetails(JSON.parse(taskData))
    console.log(taskData)
  }
 
  const changeDisabledState = () => {
    if (
      taskDetails.taskHeader !== "" &&
      taskDetails.date !== "" &&
      taskDetails.time !== "" &&
      taskDetails.taskBody !== ""
    ) {
      setdisabled(false);
    }
  };
  useEffect(() => {
    changeDisabledState();
  }, [taskDetails]);

  const setTaskHeader = (e: any) => {
    setTaskDetails({ ...taskDetails, taskHeader: e.target.value });
    
  };
  const handleFocous=(e:any)=>{
    var count: any = localStorage.getItem("count");
    if (count !== null) count = parseInt(count);
    setTaskDetails({ ...taskDetails,id:count+1 });
  }
  const setTaskBody = (e: any) => {
    setTaskDetails({ ...taskDetails, taskBody: e.target.value });
  };
  const setTime = (e: any) => {
    setTaskDetails({ ...taskDetails, time: e.target.value });
  };
  const setDate = (e: any) => {
    setTaskDetails({ ...taskDetails, date: e.target.value });
  };
  const setImportance = (e: any) => {
    setTaskDetails({ ...taskDetails, isImportnat: !taskDetails.isImportnat });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    var count: any = localStorage.getItem("count");
    if (count !== null) count = parseInt(count);
    localStorage.setItem("count", count + 1);
    
    localStorage.setItem("task" + (count + 1), JSON.stringify(taskDetails));
        setTaskDetails({taskHeader:"",taskBody:"",time:"",date:"",isImportnat: false,id:-1})
    setdisabled(true)
    window.location.reload()
  };
  const handleClear = (e: any) => {
    setTaskDetails({
      taskHeader: "",
      taskBody: "",
      time: "",
      date: "",
      isImportnat: false,
      id:-1
    });
    setdisabled(true)
  };

  return (
    <Dialog open={modalopen} onClose={handleClose} >
      <DialogContent>
      <Box alignItems={"center"}>
      <Box>
        <Typography color="primary">Add New Task</Typography>
        <Typography color="primary">Add Task Title</Typography>
      </Box>
      <FormControl>
        <Box>
          <OutlinedInput
            type="text"
            placeholder="Enter the title of the task"
            fullWidth
            value={taskDetails.taskHeader}
            onChange={setTaskHeader}
            required
            onFocus={handleFocous}
            inputProps={{ maxLength: 30 }}
          />
        </Box>
        <Box>
          <Typography color="primary">Add Task description</Typography>
          <TextField
            variant="outlined"
            placeholder="Enter the description of the task"
            value={taskDetails.taskBody}
            onChange={setTaskBody}
            required
            multiline
          ></TextField>
        </Box>

        <Box>
          <Typography color="primary">Set time</Typography>

          <OutlinedInput
            type="time"
            value={taskDetails.time}
            onChange={setTime}
            style={{ height: 40, width: 120 }}
            placeholder="00-00-00"
            required
          ></OutlinedInput>
        </Box>
        <Box>
          <Typography color="primary">Set Date</Typography>

          <OutlinedInput
            type="date"
            value={taskDetails.date}
            onChange={setDate}
            required
            style={{ height: 40, width: 130 }}
          ></OutlinedInput>
        </Box>
        
          <span>
          <Checkbox
            
            checked={taskDetails.isImportnat}
            onClick={setImportance}
          ></Checkbox>
          Mark as important
          </span>
          
        

        <Box>
          {!disabled ? (
            <Box>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="outlined"
                color="primary"
              >
                Save
              </Button>
            </Box>
          ) : null}
          <Box>
            <Button
              type="submit"
              onClick={handleClear}
              variant="outlined"
              color="primary"
            >
              Clear
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
