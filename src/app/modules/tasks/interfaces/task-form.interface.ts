import { FormControl } from '@angular/forms';

// * Types.
import { TTaskPriorities } from '@tasks/types/task-priorities.type';
import { TTaskStatuses } from '@tasks/types/task-statuses.type';

export interface ITaskForm {
	title: FormControl<string | null>;
	description: FormControl<string | null>;
	status: FormControl<TTaskStatuses['value'] | null>;
	priority: FormControl<TTaskPriorities['value'] | null>;
}
