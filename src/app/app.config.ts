import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

// * Router.
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

// * Routes.
import { APP_ROUTES } from './app.routes';

export const APP_CONFIGURATION: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withViewTransitions(), withComponentInputBinding()),
		provideHttpClient(withFetch()),
		provideExperimentalZonelessChangeDetection(),
		provideClientHydration()
	]
};
