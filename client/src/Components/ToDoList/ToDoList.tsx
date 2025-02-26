import { Button, TextField } from '@mui/material';
import { useGetAllTasks, useTask } from '../../ApiServices/Requests/useTask';
import Task from '../Task/Task';
import classes from './ToDoList.module.scss'
import { useEffect, useState } from 'react';
import { ADD_TASK, THERE_IS_NO_TASKS_YET, TO_DO_LIST, TYPE_NEW_TASK } from '../../Common/CommonConstants';
import AddIcon from '@mui/icons-material/Add';
import taskImg from '../../assets/taskImg.jpg'

const ToDoList = () => {
	const { tasks, error, isError } = useGetAllTasks();
	const { createTask } = useTask();
	const [description, setDescription] = useState('');

	const addTaskHandle = () => {
		createTask({ description: description, isCompleted: false });
		setDescription('');
	};

	useEffect(()=>{console.log(tasks?.[0], 'first task');
	},[tasks])

	return (
		<div className={classes.listContainer}>
			<img src={taskImg} className={classes.backgroundImg} />
			<h2>{TO_DO_LIST}</h2>
			<div className={classes.addTaskContainer}>
				<TextField variant='outlined'
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					placeholder={TYPE_NEW_TASK}
					style={{maxLines: '40'}}
				/>
			  	<Button onClick={addTaskHandle} className={classes.addBtn} disabled={description === ''}>
					<AddIcon />
					{ADD_TASK}
				</Button>
			</div>
			{isError ? <p>{error.message}</p> :
			<div>
				
				{(tasks || []).length > 0 ? tasks?.map((task, index) => (
					<Task task={task} key={index} />
				))
			:
			<p>{THERE_IS_NO_TASKS_YET}</p>}
			</div>}
		</div>
	);
};

export default ToDoList;
