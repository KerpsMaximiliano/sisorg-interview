import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LinkComponent } from '@components/link/link.component';

// * Constants.
import { TASK_PRIORITIES } from '@tasks/constants/task-priorities.constant';
import { TASK_STATUSES } from '@tasks/constants/task-statuses.constants';

// * Dialogs.
import { NotificationDialog } from '@dialogs/notice/notification.component';
import { TaskDeleteDialog } from '@tasks/dialogs/task-delete/task-delete.component';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ITask } from '@tasks/interfaces/task.interface';

// * Types.
import { TStatus } from '@type/state-status.type';

// * Pipes.
import { TimestampPipe } from '@pipes/timestamp.pipe';

// * Actions.
import { CHANGE_STATUS, COMPLETE_TASKS, DELETE_TASKS, GET_TASKS } from '@tasks/store/tasks.actions';

// * Selectors.
import { SELECT_TASKS_ITEMS, SELECT_TASKS_STATUS } from '@tasks/store/tasks.selectors';

// * Types.
import { TTaskPriorities } from '@tasks/types/task-priorities.type';
import { TTaskStatuses } from '@tasks/types/task-statuses.type';

// * Material.
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
// ! TABLE.
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// ! FORMS.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TaskViewDialog } from '../../dialogs/task-view/task-view.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-tasks-list',
	standalone: true,
	imports: [
		ButtonComponent,
		LinkComponent,
		TimestampPipe,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatSelectModule,
		MatIcon
	],
	templateUrl: './tasks-list.component.html',
	styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit, OnDestroy {
	// ! TABLE.
	@ViewChild(MatSort) public sort?: MatSort;
	public readonly columns: string[] = ['title', 'status', 'priority', 'date', 'actions'];
	public readonly dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>([]);
	public showCompleteButton: boolean = false;

	// ! FILTER.
	public readonly statuses: TTaskStatuses[] = TASK_STATUSES;
	public readonly priorities: TTaskPriorities[] = TASK_PRIORITIES;
	public selectsValues: [number, number] = [0, 0];
	public selectsDisabled: [boolean, boolean] = [false, false];
	public selectsAvailable: [Set<number>, Set<number>] = [new Set(), new Set()];
	public selectsLog: [number, number] = [0, 0];

	// ! DIALOG.
	private readonly _dialog: MatDialog = inject(MatDialog);

	// ! STORE.
	private readonly _store: Store<IState> = inject(Store);
	private readonly _destroy$: Subject<void> = new Subject<void>();
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly status: Signal<TStatus> = this._store.selectSignal(SELECT_TASKS_STATUS);

	public ngOnInit(): void {
		this._load();

		this._filterConfig();

		this._store
			.select(SELECT_TASKS_ITEMS)
			.pipe(takeUntil(this._destroy$))
			.subscribe((tasks: ITask[]) => {
				this.dataSource.data = tasks;

				if (this.sort) {
					this.dataSource.sort = this.sort;
				}

				this._selectsConfig(tasks);

				this.showCompleteButton = tasks.some((task) => task.status !== 3);
			});
	}

	public isOptionDisabled(optionValue: number, availableOptions: Set<number>): boolean {
		return !availableOptions.has(optionValue);
	}

	public retry(): void {
		this._load();
	}

	public applyFilter(): void {
		this.dataSource.filter = `${this.selectsValues[0]},${this.selectsValues[1]}`;
		this.selectsLog = [this.selectsValues[0], this.selectsValues[1]];
	}

	public completAllTasks(): void {
		this._dialog
			.open(NotificationDialog, {
				data: { title: 'Completar todas las tareas', description: '¿Esta seguro qué desea completar todas las tareas?' }
			})
			.afterClosed()
			.subscribe((result: boolean | undefined) => {
				if (result) {
					const TASKS: ITask[] = this.dataSource.data.filter((task) => task.status !== 3);
					this._store.dispatch(COMPLETE_TASKS({ tasks: TASKS }));
				}
			});
	}

	public removeAllTasks(): void {
		this._dialog
			.open(NotificationDialog, {
				data: { title: 'Eliminar todas las tareas', description: '¿Esta seguro qué desea eliminar todas las tareas?' }
			})
			.afterClosed()
			.subscribe((result: boolean | undefined) => {
				if (result) {
					const TASKS: ITask[] = this.dataSource.data;
					this._store.dispatch(DELETE_TASKS({ tasks: TASKS }));
				}
			});
	}

	public viewTask(task: ITask): void {
		this._dialog.open(TaskViewDialog, { data: task, minWidth: '300px' });
	}

	public removeTask(id: string, title: string): void {
		this._dialog.open(TaskDeleteDialog, { data: { id, title } });
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		if (this.status() !== 'COMPLETED') this._store.dispatch(CHANGE_STATUS({ status: 'INITIAL' }));
	}

	private _filterConfig(): void {
		this.dataSource.filterPredicate = (data: ITask, filter: string) => {
			const STATUS: number = +filter.split(',')[0];
			const PRIORITY: number = +filter.split(',')[1];

			const MATCHES_STATUS: boolean = STATUS === 0 || data.status === STATUS;
			const MATCHES_PRIORITY: boolean = PRIORITY === 0 || data.priority === PRIORITY;

			return MATCHES_STATUS && MATCHES_PRIORITY;
		};
	}

	private _selectsConfig(tasks: ITask[]): void {
		this.selectsAvailable = [new Set(tasks.map((task) => task.status)), new Set(tasks.map((task) => task.priority))];
		this.selectsDisabled = [this.selectsAvailable[0].size <= 1, this.selectsAvailable[1].size <= 1];
	}

	private _load(): void {
		if (this.status() === 'INITIAL' || this.status() === 'LOADED') {
			this._store.dispatch(GET_TASKS());
		}
	}
}
