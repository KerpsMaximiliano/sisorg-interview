import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

// * State.
import { TASKS_STATE } from './tasks.state';

// * Interfaces.
import { IFeatureState } from '@interfaces/feature-state.interface';
import { ITask } from '@tasks/interfaces/task.interface';

// * Actions.
import {
	CHANGE_ACTION,
	COMPLETE_TASKS,
	COMPLETE_TASKS_FAILURE,
	COMPLETE_TASKS_SUCCESS,
	DELETE_TASK,
	DELETE_TASKS,
	DELETE_TASKS_FAILURE,
	DELETE_TASKS_SUCCESS,
	DELETE_TASK_FAILURE,
	DELETE_TASK_SUCCESS,
	GET_TASK,
	GET_TASKS,
	GET_TASKS_FAILURE,
	GET_TASKS_SUCCESS,
	GET_TASK_FAILURE,
	GET_TASK_SUCCESS,
	POST_TASK,
	POST_TASK_FAILURE,
	POST_TASK_SUCCESS,
	PUT_TASK,
	PUT_TASK_FAILURE,
	PUT_TASK_SUCCESS
} from './tasks.actions';

export const TASKS_REDUCERS: ActionReducer<IFeatureState<ITask>, Action> = createReducer(
	// * INITIAL STATE.
	TASKS_STATE,

	// ! CHANGE ACTION.
	on(CHANGE_ACTION, (state, { action }): IFeatureState<ITask> => ({ ...state, action })),

	// ! GET TASKS.
	on(GET_TASKS, (state): IFeatureState<ITask> => ({ ...state, status: 'LOADING', items: [] })),
	on(GET_TASKS_SUCCESS, (state, { tasks }): IFeatureState<ITask> => ({ ...state, status: 'COMPLETED', items: tasks })),
	on(GET_TASKS_FAILURE, (state): IFeatureState<ITask> => ({ ...state, status: 'ERROR' })),

	// ! GET TASK.
	on(GET_TASK, (state): IFeatureState<ITask> => ({ ...state, status: 'LOADING' })),
	on(GET_TASK_SUCCESS, (state, { task }): IFeatureState<ITask> => ({ ...state, status: 'LOADED', items: [task] })),
	on(GET_TASK_FAILURE, (state): IFeatureState<ITask> => ({ ...state, status: 'ERROR' })),

	// ! POST TASK.
	on(POST_TASK, (state): IFeatureState<ITask> => ({ ...state, action: 'UPDATING' })),
	on(POST_TASK_SUCCESS, (state, { task }): IFeatureState<ITask> => ({ ...state, action: 'UPDATED', items: [...state.items, task] })),
	on(POST_TASK_FAILURE, (state): IFeatureState<ITask> => ({ ...state, action: 'FAILED' })),

	// ! DELETE TASK.
	on(DELETE_TASK, (state): IFeatureState<ITask> => ({ ...state, action: 'UPDATING' })),
	on(
		DELETE_TASK_SUCCESS,
		(state, { id }): IFeatureState<ITask> => ({ ...state, action: 'UPDATED', items: state.items.filter((task: ITask) => task.id !== id) })
	),
	on(DELETE_TASK_FAILURE, (state): IFeatureState<ITask> => ({ ...state, action: 'FAILED' })),

	// ! PUT TASK.
	on(PUT_TASK, (state): IFeatureState<ITask> => ({ ...state, action: 'UPDATING' })),
	on(
		PUT_TASK_SUCCESS,
		(state, { task }): IFeatureState<ITask> => ({
			...state,
			action: 'UPDATED',
			items: state.items.map((item: ITask) => (item.id === task.id ? task : item))
		})
	),
	on(PUT_TASK_FAILURE, (state): IFeatureState<ITask> => ({ ...state, action: 'FAILED' })),

	// ! DELETE TASKS.
	on(DELETE_TASKS, (state): IFeatureState<ITask> => ({ ...state, status: 'DELETING' })),
	on(DELETE_TASKS_SUCCESS, (state): IFeatureState<ITask> => ({ ...state, status: 'COMPLETED', items: [] })),
	on(DELETE_TASKS_FAILURE, (state): IFeatureState<ITask> => ({ ...state, status: 'ERROR' })),

	// ! COMPLETE TASKS.
	on(COMPLETE_TASKS, (state): IFeatureState<ITask> => ({ ...state, status: 'COMPLETING' })),
	on(
		COMPLETE_TASKS_SUCCESS,
		(state, { tasks }): IFeatureState<ITask> => ({
			...state,
			status: 'COMPLETED',
			items: state.items.map((item: ITask) => (tasks.some((task: ITask) => task.id === item.id) ? { ...item, status: 3 } : item))
		})
	),
	on(COMPLETE_TASKS_FAILURE, (state): IFeatureState<ITask> => ({ ...state, status: 'ERROR' }))
);
