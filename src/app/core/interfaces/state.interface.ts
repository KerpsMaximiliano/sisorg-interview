import { IFeatureState } from './feature-state.interface';

// * Interfaces.
import { ITask } from '@tasks/interfaces/task.interface';

// * STATE.
export interface IState {
	tasks: IFeatureState<ITask>;
}
