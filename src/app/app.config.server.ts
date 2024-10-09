import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { APP_CONFIGURATION } from './app.config';

const SERVER_CONFIG: ApplicationConfig = { providers: [provideServerRendering()] };

export const CONFIGURATION = mergeApplicationConfig(APP_CONFIGURATION, SERVER_CONFIG);
