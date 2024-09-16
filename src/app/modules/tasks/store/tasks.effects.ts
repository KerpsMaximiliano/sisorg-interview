import { inject, Injectable } from '@angular/core';

// * Ngrx.
import { Actions, createEffect, ofType } from '@ngrx/effects';

// * RxJs.
import { catchError, concatMap, EMPTY, exhaustMap, filter, from, map, of, switchMap, toArray } from 'rxjs';

// * Interfaces.
import { ITask } from '@tasks/interfaces/task.interface';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import {
	COMPLETE_TASKS,
	COMPLETE_TASKS_FAILURE,
	COMPLETE_TASKS_SUCCESS,
	DELETE_TASK,
	DELETE_TASK_FAILURE,
	DELETE_TASK_SUCCESS,
	DELETE_TASKS,
	DELETE_TASKS_FAILURE,
	DELETE_TASKS_SUCCESS,
	GET_TASK,
	GET_TASK_FAILURE,
	GET_TASK_SUCCESS,
	GET_TASKS,
	GET_TASKS_FAILURE,
	GET_TASKS_SUCCESS,
	POST_TASK,
	POST_TASK_FAILURE,
	POST_TASK_SUCCESS,
	PUT_TASK,
	PUT_TASK_FAILURE,
	PUT_TASK_SUCCESS
} from './tasks.actions';

@Injectable({ providedIn: 'root' })
export class TasksEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);

	// ! GET TASKS.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly getTasks$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(GET_TASKS),
			exhaustMap(() =>
				this._core.getDocuments<ITask>('tasks').pipe(
					map((tasks) => GET_TASKS_SUCCESS({ tasks })),
					catchError(() => of(GET_TASKS_FAILURE()))
				)
			)
		);
	});

	// ! GET TASK.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly getTask$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(GET_TASK),
			exhaustMap(({ id }) =>
				this._core.getDocument<ITask>('tasks', id).pipe(
					map((task) => {
						if (task !== null) {
							return GET_TASK_SUCCESS({ task });
						} else {
							return GET_TASK_FAILURE();
						}
					}),
					catchError(() => of(GET_TASK_FAILURE()))
				)
			)
		);
	});

	// ! POST TASK.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly postTask$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(POST_TASK),
			switchMap(({ task }) =>
				this._core.postDocument('tasks', { ...task, createdAt: this._core.serverTimestamp() }).pipe(
					switchMap((res) =>
						this._core.getDocument<ITask>('tasks', res.id).pipe(
							map((task) => {
								if (task !== null) {
									return POST_TASK_SUCCESS({ task });
								} else {
									return POST_TASK_FAILURE();
								}
							}),
							catchError(() => of(POST_TASK_FAILURE()))
						)
					),
					catchError(() => of(POST_TASK_FAILURE()))
				)
			)
		);
	});

	// ! DELETE TASK.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly deleteTask$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(DELETE_TASK),
			exhaustMap(({ id }) =>
				this._core.deleteDocument('tasks', id).pipe(
					map(() => DELETE_TASK_SUCCESS({ id })),
					catchError(() => of(DELETE_TASK_FAILURE()))
				)
			)
		);
	});

	// ! PUT TASK.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly putTask$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(PUT_TASK),
			switchMap(({ id, task }) =>
				this._core.putDocument('tasks', id, { ...task, updatedAt: this._core.serverTimestamp() }).pipe(
					switchMap((res) =>
						this._core.getDocument<ITask>('tasks', id).pipe(
							map((task) => {
								if (task !== null) {
									return PUT_TASK_SUCCESS({ task });
								} else {
									return PUT_TASK_FAILURE();
								}
							}),
							catchError(() => of(PUT_TASK_FAILURE()))
						)
					),
					catchError(() => of(PUT_TASK_FAILURE()))
				)
			)
		);
	});

	// ! DELETE TASKS.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly deleteTasks$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(DELETE_TASKS),
			concatMap(({ tasks }) =>
				from(tasks).pipe(
					concatMap((task) =>
						this._core.deleteDocument('tasks', task.id).pipe(
							catchError((error) => {
								console.error('Error al eliminar tarea:', error);
								return EMPTY;
							})
						)
					),
					toArray(),
					map(() => DELETE_TASKS_SUCCESS()),
					catchError(() => of(DELETE_TASKS_FAILURE()))
				)
			)
		);
	});

	// ! COMPLETE TASKS.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly completeTasks$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COMPLETE_TASKS),
			concatMap(({ tasks }) =>
				from(tasks).pipe(
					concatMap((task) =>
						this._core
							.putDocument('tasks', task.id, {
								...task,
								status: 3,
								updatedAt: this._core.serverTimestamp()
							})
							.pipe(
								switchMap(() => this._core.getDocument('tasks', task.id)),
								map((updatedTask) => {
									return updatedTask as ITask;
								}),
								catchError((error) => {
									console.error('Error al completar tarea:', error);
									return EMPTY;
								})
							)
					),
					filter((task): task is ITask => task !== null),
					toArray(),
					map((updatedTasks: ITask[]) => COMPLETE_TASKS_SUCCESS({ tasks: updatedTasks })),
					catchError(() => of(COMPLETE_TASKS_FAILURE()))
				)
			)
		);
	});
}
