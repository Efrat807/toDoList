import { ITask } from '../../ApiServices/Interfaces/ITask';
import { Checkbox, Input } from '@mui/material';
import classes from './Task.module.scss';
import { useTask } from '../../ApiServices/Requests/useTask';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const Task = ({ task }: { task: ITask }) => {
	const { updateTask, deleteTask } = useTask();
	const [isEdit, setIsEdit] = useState(false);
	const [editedDescription, setEditedDescription] = useState(task.description);

	const updateStatusTaskHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedTask = { ...task, isCompleted: e.target.checked };

		updateTask(updatedTask);
	};

	const updateDescriptionTaskHandler = () => {
		updateTask({ ...task, description: editedDescription });
		setIsEdit(false);
	};

	return (
		<div>
			<div className={classes.taskLine}>
				<div className={classes.taskDescription}>
					<Checkbox checked={task.isCompleted} onChange={updateStatusTaskHandle} />
					{isEdit ? (
						<Input value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} style={{}} />
					) : (
						<p style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.description}</p>
					)}
				</div>

				<div className={classes.icons}>
					{isEdit ? (
						<DoneIcon className={classes.icon} onClick={updateDescriptionTaskHandler} />
					) : (
						<EditIcon className={classes.icon} onClick={() => setIsEdit(true)} />
					)}
					<ClearIcon
						className={`${classes.icon} ${classes.clearIcon}`}
						style={{ cursor: 'pointer', marginRight: '10px' }}
						onClick={() => task.id && deleteTask(task.id)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Task;
