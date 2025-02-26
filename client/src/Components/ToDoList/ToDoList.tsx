import { Button } from '@mui/material';
import { useGetAllTasks, useTask } from '../../ApiServices/Requests/useTask';
import Task from '../Task/Task';

const ToDoList = () => {
	const { tasks, error } = useGetAllTasks();
	const { createTask } = useTask();
	const addTaskHandle = () => {
		createTask({ description: 'task1', isCompleted: false });
	};
	return (
		<div>
			<h2>To Do List</h2>
			{error && <p>error: {error?.message}</p>}
			<Button onClick={addTaskHandle}>Add Task</Button>
			<Button
				onClick={() => {
					console.log(tasks, 'tasks');
				}}
			>
				log data
			</Button>
			<div>
				{' '}
				all tasks: {`(${tasks?.length})`}
				{tasks?.map((task, index) => (
					<Task task={task} key={index} />
					// <p key={index}>{task.Description}</p>
				))}
			</div>
		</div>
	);
};

export default ToDoList;
