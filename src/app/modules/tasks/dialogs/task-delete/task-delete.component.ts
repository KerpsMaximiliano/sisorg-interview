import { ChangeDetectionStrategy, Component, OnDestroy, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

// * Types.
import { TActions } from '@type/state-action.type';

// * Actions.
import { CHANGE_ACTION, DELETE_TASK } from '@tasks/store/tasks.actions';

// * Selectors.
import { SELECT_TASKS_ACTIONS } from '@tasks/store/tasks.selectors';

// * Material.
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	selector: 'app-tasks-dialog-delete',
	imports: [MatDialogTitle, MatDialogContent, ButtonComponent],
	templateUrl: './task-delete.component.html',
	styleUrl: './task-delete.component.scss'
})
export class TaskDeleteDialog implements OnDestroy {
	// ! DIALOG.
	public readonly data = inject(MAT_DIALOG_DATA);
	public readonly dialogRef = inject(MatDialogRef);

	// ! STORE.
	private readonly _store: Store<IState> = inject(Store);
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly action: Signal<TActions> = this._store.selectSignal(SELECT_TASKS_ACTIONS);

	public remove(): void {
		const ID: string | null | undefined = this.data?.id;

		if (ID) this._store.dispatch(DELETE_TASK({ id: ID }));
	}

	public ngOnDestroy(): void {
		this._store.dispatch(CHANGE_ACTION({ action: 'INITIAL' }));
	}
}
