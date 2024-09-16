import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_CONFIGURATION } from './app/app.config';

bootstrapApplication(AppComponent, APP_CONFIGURATION).catch((err: unknown) => {
	console.error(err);
});
