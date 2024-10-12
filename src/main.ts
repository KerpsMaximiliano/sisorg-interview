/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

// * Component.
import { AppComponent } from './app/app.component';

// * Application Configuration.
import { APP_CONFIGURATION } from './app/app.config';

bootstrapApplication(AppComponent, APP_CONFIGURATION).catch((err: unknown) => console.error(err));
