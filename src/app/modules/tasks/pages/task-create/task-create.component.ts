import { ChangeDetectionStrategy, Component, OnDestroy, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Forms.
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LinkComponent } from '@components/link/link.component';

// * Constants.
import { TASK_PRIORITIES } from '@tasks/constants/task-priorities.constant';
import { TASK_STATUSES } from '@tasks/constants/task-statuses.constants';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ITaskForm } from '@tasks/interfaces/task-form.interface';
import { ITask } from '@tasks/interfaces/task.interface';

// * Types.
import { TTaskPriorities } from '@tasks/types/task-priorities.type';
import { TTaskStatuses } from '@tasks/types/task-statuses.type';
import { TActions } from '@type/state-action.type';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { CHANGE_ACTION, POST_TASK } from '@tasks/store/tasks.actions';

// * Selectors.
import { SELECT_TASKS_ACTIONS } from '@tasks/store/tasks.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-tasks-create',
	standalone: true,
	imports: [ReactiveFormsModule, ButtonComponent, LinkComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon],
	templateUrl: './task-create.component.html',
	styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent implements OnDestroy {
	public readonly error: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;

	public readonly statuses: TTaskStatuses[] = TASK_STATUSES;
	public readonly priorities: TTaskPriorities[] = TASK_PRIORITIES;

	public readonly form: FormGroup<ITaskForm> = inject(FormBuilder).group({
		title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), notOnlySpaces()]),
		description: new FormControl<string | null>(null, [Validators.minLength(3), Validators.maxLength(250), notOnlySpaces()]),
		status: new FormControl<TTaskStatuses['value'] | null>(null),
		priority: new FormControl<TTaskPriorities['value'] | null>(null)
	});

	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly action: Signal<TActions> = this._store.selectSignal(SELECT_TASKS_ACTIONS);

	public save(): void {
		if (this.form.invalid) return;

		const TASK: Omit<ITask, 'createdAt' | 'id'> = {
			title: this.form.controls.title.value ?? '',
			description: this.form.controls.description.value,
			status: this.form.controls.status.value ?? 1,
			priority: this.form.controls.priority.value ?? 3,
			updatedAt: null
		};

		this._store.dispatch(POST_TASK({ task: TASK }));
	}

	public create(): void {
		this.form.reset();
		this._store.dispatch(CHANGE_ACTION({ action: 'INITIAL' }));
	}

	public ngOnDestroy(): void {
		if (this.action() !== 'INITIAL') this._store.dispatch(CHANGE_ACTION({ action: 'INITIAL' }));
	}
}
