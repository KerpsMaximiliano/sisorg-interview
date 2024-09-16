import { ActionReducerMap } from '@ngrx/store';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

// * REDUCERS.
import { TASKS_REDUCERS } from './modules/tasks/store/tasks.reducers';

export const ROOT_REDUCERS: ActionReducerMap<IState> = {
	tasks: TASKS_REDUCERS
};
