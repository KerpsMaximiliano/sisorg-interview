import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Constants.
import { TASK_PRIORITIES } from '@tasks/constants/task-priorities.constant';
import { TASK_STATUSES } from '@tasks/constants/task-statuses.constants';

// * Types.
import { TTaskPriorities } from '@tasks/types/task-priorities.type';
import { TTaskStatuses } from '@tasks/types/task-statuses.type';

// * Pipes.
import { TimestampPipe } from '@pipes/timestamp.pipe';

// * Material.
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	selector: 'app-tasks-dialog-delete',
	imports: [TimestampPipe, MatDialogTitle, MatDialogContent, ButtonComponent],
	templateUrl: './task-view.component.html',
	styleUrl: './task-view.component.scss'
})
export class TaskViewDialog {
	public readonly statuses: TTaskStatuses[] = TASK_STATUSES;
	public readonly priorities: TTaskPriorities[] = TASK_PRIORITIES;

	public readonly data = inject(MAT_DIALOG_DATA);
	public readonly dialogRef = inject(MatDialogRef);
}
