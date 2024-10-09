import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// * Component.
import { AppComponent } from './app/app.component';

// * Server Configuration.
import { CONFIGURATION } from './app/app.config.server';

const BOOTSTRAP: () => Promise<ApplicationRef> = () => bootstrapApplication(AppComponent, CONFIGURATION);

export default BOOTSTRAP;
