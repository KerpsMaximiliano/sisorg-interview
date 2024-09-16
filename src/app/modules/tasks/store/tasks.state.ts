// * Interfaces.
import { IFeatureState } from '@interfaces/feature-state.interface';
import { ITask } from '@tasks/interfaces/task.interface';

export const TASKS_STATE: IFeatureState<ITask> = {
	status: 'INITIAL',
	action: 'INITIAL',
	items: []
};
