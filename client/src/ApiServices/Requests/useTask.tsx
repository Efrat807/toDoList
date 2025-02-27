import { QueryOptions, useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { ITask } from '../Interfaces/ITask';
import apiClient from '../http-common';
import { IMutation, queryClient } from '../../Utils/ReactQueryConfig';
import { updateRQCacheAfterCreate, updateRQCacheAfterUpdate } from '../../Common/CommonFunctions';
import { TASK_QUERY_KEY } from './QueryKeys';
import { toast } from 'react-toastify';

export const useGetAllTasks = (options?: QueryOptions<ITask[]>) => {
	const { data: tasks, ...queryInfo } = useQuery<ITask[]>({
		queryKey: [`${TASK_QUERY_KEY}`],
		queryFn: async ({ queryKey: [TASK_QUERY_KEY] }) => {
			const { data } = await apiClient.get<ITask[]>(`${TASK_QUERY_KEY}`);
			return data;
		},
		...options,
	});
	return { tasks, ...queryInfo };
};

export const useTask = () => {
	const { mutate: CreateTask, ...createMutateInfo } = useMutation<ITask, Error, IMutation<ITask>>({});
	
	const { mutate: UpdateTask, ...updateMutateInfo } = useMutation<ITask, Error, IMutation<ITask>>({});

	const { mutate: DeleteTask, ...deleteMutateInfo } = useMutation<ITask, Error, IMutation<ITask>>({});

	const createTask = (data: ITask, options?: UseMutationOptions<ITask, unknown, IMutation<ITask>>) => {
		CreateTask(
			{ method: 'Post', path: `${TASK_QUERY_KEY}`, headers: {}, data },
			{
				onSuccess: (createdTask: ITask) => {
					updateRQCacheAfterCreate(createdTask, queryClient, TASK_QUERY_KEY);
				},
				onError: (error) => {
					toast.error(error.message);
				},
				...options,
			}
		);
	};

	const updateTask = (data: ITask, options?: UseMutationOptions<ITask, unknown, IMutation<ITask>>) => {
		UpdateTask(
			{
				method: 'Put',
				path: `${TASK_QUERY_KEY}/${data.id}`,
				headers: {},
				data,
			},
			{
				onSuccess: (updatedTask) => {
					updateRQCacheAfterUpdate(updatedTask, queryClient, `${TASK_QUERY_KEY}`);
				},
				onError: (error) => {
					toast.error(error.message);
				},
				...options,
			}
		);
	};

	const deleteTask = (id: number, options?: UseMutationOptions<unknown, unknown, IMutation<Partial<ITask>>>) => {
		DeleteTask(
			{
				method: 'Delete',
				path: `${TASK_QUERY_KEY}/${id}`,
				headers: {},
				data: {
					description: '',
					isCompleted: false,
				},
			},
			{
				onSuccess: () => {
					console.log(`user in id: ${id} was deleted`);

					queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
				},
				onError: (error) => {
					toast.error(error.message);
				},
				...options,
			}
		);
	};

	return {
		updateTask,
		updateMutateInfo,
		createTask,
		createMutateInfo,
		deleteTask,
		deleteMutateInfo,
	};
};
