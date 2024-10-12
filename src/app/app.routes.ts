import { Routes } from '@angular/router';

// export class ROUTES {
// 	public static readonly home = $localize`:@@home:home`;
// 	// public  static  readonly  FrequentlyAskedQuestion = $localize `:@@frequently-asked-questions:preguntas-frecuentes` ;
// 	// public  static  readonly  Contacto = $localize `:@@contact:contact` ;
// }

export const APP_ROUTES: Routes = [
	// {
	//   // path: $localize `home`,
	//   path: 'weqewqewqe',
	//   loadComponent: async () => await import('./modules/home/home.component').then((c) => c.HomeComponent)
	// },
	// {
	//   path: 'homestead',
	//   component: HomeComponent
	// },
  // {
  //   path: ROUTES.home,
  //     loadComponent: async () => await import('./modules/home/home.component').then((c) => c.HomeComponent)
  // },
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];
