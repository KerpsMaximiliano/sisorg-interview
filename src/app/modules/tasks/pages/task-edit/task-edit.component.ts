import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

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
import { TStatus } from '@type/state-status.type';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { CHANGE_ACTION, CHANGE_STATUS, GET_TASK, PUT_TASK } from '@tasks/store/tasks.actions';

// * Selectors.
import { SELECT_TASK, SELECT_TASKS_ACTIONS, SELECT_TASKS_STATUS } from '@tasks/store/tasks.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-task-edit',
	standalone: true,
	imports: [ReactiveFormsModule, ButtonComponent, LinkComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon],
	templateUrl: './task-edit.component.html',
	styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input({ required: true }) public id!: string;

	// ! FORM.
	public readonly error: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly statuses: TTaskStatuses[] = TASK_STATUSES;
	public readonly priorities: TTaskPriorities[] = TASK_PRIORITIES;
	public readonly form: FormGroup<ITaskForm> = inject(FormBuilder).group({
		title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), notOnlySpaces()]),
		description: new FormControl<string | null>(null, [Validators.minLength(3), Validators.maxLength(250), notOnlySpaces()]),
		status: new FormControl<TTaskStatuses['value'] | null>(null),
		priority: new FormControl<TTaskPriorities['value'] | null>(null)
	});

	// ! STORE.
	private readonly _store: Store<IState> = inject(Store);
	private readonly _destroy$: Subject<void> = new Subject<void>();
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly action: Signal<TActions> = this._store.selectSignal(SELECT_TASKS_ACTIONS);
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly status: Signal<TStatus> = this._store.selectSignal(SELECT_TASKS_STATUS);

	private _initialForm?: ITask;
	private _createdAt?: Date;

	public ngOnInit(): void {
		if (this.status() === 'INITIAL') this._store.dispatch(GET_TASK({ id: this.id }));

		this._store
			.select(SELECT_TASK(this.id))
			.pipe(takeUntil(this._destroy$))
			.subscribe((task) => {
				if (task) this._setForm(task);
			});
	}

	public ngAfterViewInit(): void {
		this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this.checkForm();
		});
	}

	public checkForm(): boolean {
		if (!this._initialForm) return false;

		const FORM = this.form.value;
		const INITIAL_FORM: ITask = this._initialForm;

		const NORMALIZE = (value: string | null | undefined): string | null => {
			return value === '' || value === undefined ? null : value;
		};

		return (
			NORMALIZE(FORM.title) === NORMALIZE(INITIAL_FORM.title) &&
			NORMALIZE(FORM.description) === NORMALIZE(INITIAL_FORM.description) &&
			FORM.status === INITIAL_FORM.status &&
			FORM.priority === INITIAL_FORM.priority
		);
	}

	public save(): void {
		if (this.form.invalid) return;

		const TIMESTAMP: Date | undefined = this._createdAt;

		if (!TIMESTAMP) return;

		const TASK: Omit<ITask, 'id' | 'updatedAt'> = {
			title: this.form.controls.title.value ?? '',
			description: this.form.controls.description.value,
			status: this.form.controls.status.value ?? 1,
			priority: this.form.controls.priority.value ?? 3,
			createdAt: TIMESTAMP
		};

		this._store.dispatch(PUT_TASK({ id: this.id, task: TASK }));
	}

	public edit(): void {
		this._store.dispatch(CHANGE_ACTION({ action: 'INITIAL' }));
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();

		if (this.action() !== 'INITIAL') this._store.dispatch(CHANGE_ACTION({ action: 'INITIAL' }));
		if (this.status() !== 'COMPLETED') this._store.dispatch(CHANGE_STATUS({ status: 'INITIAL' }));
	}

	private _setForm(task: ITask): void {
		this.form.controls.title.setValue(task.title);
		this.form.controls.description.setValue(task.description);
		this.form.controls.status.setValue(task.status as 1 | 2 | 3);
		this.form.controls.priority.setValue(task.priority as 1 | 2 | 3);

		this._createdAt = task.createdAt;

		this._initialForm = task;
	}
}
