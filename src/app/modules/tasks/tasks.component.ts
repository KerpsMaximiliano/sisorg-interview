import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Router.
import { RouterOutlet } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-tasks',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class TasksComponent {}
