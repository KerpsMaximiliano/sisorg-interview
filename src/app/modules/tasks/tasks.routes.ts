import { Routes } from '@angular/router';

export const TASKS_ROUTES: Routes = [
	{
		path: '',
		loadComponent: async () => import('./tasks.component').then((c) => c.TasksComponent),
		children: [
			{
				path: '',
				loadComponent: async () => import('./pages/tasks-list/tasks-list.component').then((c) => c.TasksListComponent),
				title: 'Tareas'
			},
			{
				path: 'crear-tarea',
				loadComponent: async () => import('./pages/task-create/task-create.component').then((c) => c.TaskCreateComponent),
				title: 'Crear tarea'
			},
			{
				path: 'editar-tarea/:id',
				loadComponent: async () => import('./pages/task-edit/task-edit.component').then((c) => c.TaskEditComponent),
				title: 'Editar tarea'
			},
			{
				path: '**',
				redirectTo: '',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
