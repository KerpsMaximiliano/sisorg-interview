import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Components.
import { HeaderComponent } from './core/components/header/header.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent],
	template: '<app-header /><router-outlet /><h2>Hi</h2>'
})
export class AppComponent {}
