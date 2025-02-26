import React from 'react';
import { ITask } from '../../ApiServices/Interfaces/ITask';
import { Checkbox } from '@mui/material';

const Task = ({task}: {task: ITask}) => {
  console.log(task.description);
  
	return (
		<div>
			<div>
				<Checkbox checked={task.isCompleted} />
				<p>{task.description}</p>
			</div>
		</div>
	);
};

export default Task;
