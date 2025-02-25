import { Button } from "@mui/material"
import { useGetAllTasks, useTask } from "../../ApiServices/Requests/useTask"

const ToDoList = ()=>{
    const {tasks}= useGetAllTasks();
    const {createTask}=useTask();
    const addTaskHandle = ()=>{
        createTask({Description: 'task1', IsCompleted: false})
    }
    return (<div>
        <h2>To Do List</h2>
        <Button onClick={addTaskHandle}>Add Task</Button>
        <Button onClick={()=>{
            console.log(tasks, 'tasks');
            
        }}>log data</Button>
        <div>
            {tasks?.map(task=>(<p>{task.Description}</p>))}
        </div>
    </div>)
}

export default ToDoList