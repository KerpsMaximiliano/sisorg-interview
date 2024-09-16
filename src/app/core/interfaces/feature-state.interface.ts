import { TActions } from '@type/state-action.type';
import { TStatus } from '@type/state-status.type';

// * Entities loading.
export interface IFeatureState<T> {
	status: TStatus;
	action: TActions;
	items: T[];
}
