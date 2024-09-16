import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { ITask } from '@tasks/interfaces/task.interface';

// * Types.
import { TActions } from '@type/state-action.type';
import { TStatus } from '@type/state-status.type';

// ! CHANGE STATUS.
export const CHANGE_STATUS = createAction('[Tasks] Change Status', props<{ status: TStatus }>());

// ! CHANGE ACTION.
export const CHANGE_ACTION = createAction('[Tasks] Change Action', props<{ action: TActions }>());

// ! GET TASKS.
export const GET_TASKS = createAction('[Tasks] Get Tasks');
export const GET_TASKS_SUCCESS = createAction('[Tasks] Get Tasks Success', props<{ tasks: ITask[] }>());
export const GET_TASKS_FAILURE = createAction('[Tasks] Get Tasks Failure');

// ! GET TASK.
export const GET_TASK = createAction('[Tasks] Get Task', props<{ id: string }>());
export const GET_TASK_SUCCESS = createAction('[Tasks] Get Task Success', props<{ task: ITask }>());
export const GET_TASK_FAILURE = createAction('[Tasks] Get Task Failure');

// ! POST TASK.
export const POST_TASK = createAction('[Tasks] Post Task', props<{ task: Omit<ITask, 'createdAt' | 'id'> }>());
export const POST_TASK_SUCCESS = createAction('[Tasks] Post Task Success', props<{ task: ITask }>());
export const POST_TASK_FAILURE = createAction('[Tasks] Post Task Failure');

// ! DELETE TASK.
export const DELETE_TASK = createAction('[Tasks] Delete Task', props<{ id: string }>());
export const DELETE_TASK_SUCCESS = createAction('[Tasks] Delete Task Success', props<{ id: string }>());
export const DELETE_TASK_FAILURE = createAction('[Tasks] Delete Task Failure');

// ! PUT TASK.
export const PUT_TASK = createAction('[Tasks] Put Task', props<{ id: string; task: Omit<ITask, 'id' | 'updatedAt'> }>());
export const PUT_TASK_SUCCESS = createAction('[Tasks] Put Task Success', props<{ task: ITask }>());
export const PUT_TASK_FAILURE = createAction('[Tasks] Put Task Failure');

// ! DELETE TASKS.
export const DELETE_TASKS = createAction('[Tasks] Delete Tasks', props<{ tasks: ITask[] }>());
export const DELETE_TASKS_SUCCESS = createAction('[Tasks] Delete Tasks Success');
export const DELETE_TASKS_FAILURE = createAction('[Tasks] Delete Tasks Failure');

// ! COMPLETE TASKS.
export const COMPLETE_TASKS = createAction('[Tasks] Complete Tasks', props<{ tasks: ITask[] }>());
export const COMPLETE_TASKS_SUCCESS = createAction('[Tasks] Complete Tasks Success', props<{ tasks: ITask[] }>());
export const COMPLETE_TASKS_FAILURE = createAction('[Tasks] Complete Tasks Failure');
