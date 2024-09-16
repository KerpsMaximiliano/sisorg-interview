import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// * Router.
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

// * NgRx.
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// * NgRx - Consts.
import { ROOT_EFFECTS } from './app.effects';
import { ROOT_REDUCERS } from './app.reducers';

// * Routes.
import { APP_ROUTES } from './app.routes';

// * Firebase.
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const APP_CONFIGURATION: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withViewTransitions(), withComponentInputBinding()),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		provideStore(ROOT_REDUCERS),
		provideEffects(ROOT_EFFECTS),
		provideFirebaseApp(() =>
			initializeApp({
				projectId: 'sisorg-interview',
				appId: '1:648665171042:web:006d7b89deb8a1be0ebd3b',
				storageBucket: 'sisorg-interview.appspot.com',
				apiKey: 'AIzaSyDxXigCpsX9mqZvr1pT-E7KeLd97lppf0E',
				authDomain: 'sisorg-interview.firebaseapp.com',
				messagingSenderId: '648665171042'
			})
		),
		provideFirestore(() => getFirestore()),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideClientHydration()
	]
};
