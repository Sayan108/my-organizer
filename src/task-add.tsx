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
interface Iprops {
  openDialog: boolean;
  setopenModal : any
}
function AddTask(props: Iprops) {
  const { openDialog ,setopenModal } = props;
  const handleClose = () => {
    setopenModal(false)
  };
  const [taskDetails, setTaskDetails] = useState<{
    taskHeader: string;
    taskBody: string;
    time: string;
    date: string;
    isImportnat: boolean;
    id: number;
  }>({
    taskHeader: "",
    taskBody: "",
    time: "",
    date: "",
    isImportnat: false,
    id: -1,
  });
  const [disabled, setdisabled] = useState(true);
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
  const handleFocous = (e: any) => {
    var count: any = localStorage.getItem("count");
    if (count !== null) count = parseInt(count);
    setTaskDetails({ ...taskDetails, id: count + 1 });
  };
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
    setTaskDetails({
      taskHeader: "",
      taskBody: "",
      time: "",
      date: "",
      isImportnat: false,
      id: -1,
    });
    setdisabled(true);
    window.location.reload();
  };
  const handleClear = (e: any) => {
    setTaskDetails({
      taskHeader: "",
      taskBody: "",
      time: "",
      date: "",
      isImportnat: false,
      id: -1,
    });
    setdisabled(true);
  };

  return (
    
    <Dialog open={openDialog} onClose={handleClose}>
    <DialogContent>
      <Box alignItems={"center"}>
        <Box>
          <DialogContent>
            <Typography
              style={{
                padding: "20px 0",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              color="primary"
            >
              Add New Task
              <Button
                onClick={() => handleClose()}
                style={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Button>
            </Typography>
          </DialogContent>
        </Box>
        <FormControl>
          <Box>
            <Box>
              <Typography
                color="primary"
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Add Task Title
              </Typography>
              <OutlinedInput
                type="text"
                placeholder="Enter the title of the task"
                value={taskDetails.taskHeader}
                onChange={setTaskHeader}
                required
                onFocus={handleFocous}
                inputProps={{ maxLength: 30 }}
                style={{ width: "100%", fontSize: "16px" }}
              />
            </Box>
            <Box>
              <Typography
                color="primary"
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Add Task description
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter the description of the task"
                value={taskDetails.taskBody}
                onChange={setTaskBody}
                required
                style={{ width: "100%", fontSize: "16px" }}
              ></TextField>
            </Box>

            <Box>
              <Typography
                color="primary"
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Set Time
              </Typography>

              <OutlinedInput
                type="time"
                value={taskDetails.time}
                onChange={setTime}
                style={{
                  height: "40px",
                  width: "120px",
                  fontSize: "16px",
                }}
                placeholder="00:00"
                required
              ></OutlinedInput>
            </Box>
            <Box>
              <Typography
                color="primary"
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Set Date
              </Typography>

              <OutlinedInput
                type="date"
                value={taskDetails.date}
                onChange={setDate}
                required
                style={{
                  height: "40px",
                  width: "130px",
                  fontSize: "16px",
                }}
              ></OutlinedInput>
            </Box>

            <span>
              <Checkbox
                checked={taskDetails.isImportnat}
                onClick={setImportance}
                style={{ fontSize: "18px" }}
              ></Checkbox>
              <span style={{ fontSize: "18px" }}>Mark as important</span>
            </span>

            <Box>
              {!disabled ? (
                <Box>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    style={{ fontSize: "18px", marginTop: "20px" }}
                  >
                    Add Task
                  </Button>
                </Box>
              ) : null}
              <Box>
                <Button
                  type="submit"
                  onClick={handleClear}
                  variant="contained"
                  color="secondary"
                  style={{ fontSize: "18px", marginTop: "20px" }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </DialogContent>
  </Dialog>
    
  );
}

export default AddTask;
