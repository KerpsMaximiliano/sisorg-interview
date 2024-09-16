import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
	{
		path: '',
		loadChildren: async () => import('./modules/tasks/tasks.routes').then((r) => r.TASKS_ROUTES)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
