import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Interface.
import { IState } from '@interfaces/state.interface';

// * STATE - Const.
import { STATE } from '@constants/state.const';

// * Interfaces.
import { ITask } from '@tasks/interfaces/task.interface';

// * Types.
import { TActions } from '@type/state-action.type';
import { TStatus } from '@type/state-status.type';

// ! TASKS STATUS.
export const SELECT_TASKS_STATUS = createSelector(STATE, (state: IState): TStatus => state.tasks.status);

// ! TASKS ACTION.
export const SELECT_TASKS_ACTIONS = createSelector(STATE, (state: IState): TActions => state.tasks.action);

// ! TASKS ITEMS.
export const SELECT_TASKS_ITEMS = createSelector(STATE, (state: IState): ITask[] => state.tasks.items);

// ! TASK ITEM.
export const SELECT_TASK: (id: string) => MemoizedSelector<IState, ITask | null> = (id: string): MemoizedSelector<IState, ITask | null> =>
	createSelector(STATE, (state: IState): ITask | null => {
		const INDEX: number = state.tasks.items.findIndex((task: ITask) => task.id === id);

		if (INDEX === -1) return null;

		return state.tasks.items[INDEX];
	});
