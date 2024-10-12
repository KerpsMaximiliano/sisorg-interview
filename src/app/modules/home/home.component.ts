import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-home',
	standalone: true,
	template: '<h1>{{ message }}</h1>'
})
export class HomeComponent {
  public readonly message: string = $localize `This is a test message in HomeComponent`;
}
