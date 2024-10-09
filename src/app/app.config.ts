import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

// * Router.
import { provideRouter } from '@angular/router';

// * Routes.
import { APP_ROUTES } from './app.routes';

export const APP_CONFIGURATION: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES),
		provideHttpClient(withFetch()),
		// provideExperimentalZonelessChangeDetection(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideClientHydration()
	]
};
