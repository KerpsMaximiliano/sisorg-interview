import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

// * Router.
import { RouterOutlet } from '@angular/router';
import { CoreService, IProduct } from './core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<router-outlet />
		<ul>
		@for (item of products(); track $index) {
			<li>
				{{ item.title }}
				{{ item.description }}
				{{ item.price }}
			</li>
		}
		</ul>
	`
})
export class AppComponent implements OnInit {
	public readonly products = signal<IProduct[]>([]);

	private _core: CoreService = inject(CoreService);

	public ngOnInit(): void {
		this._core.getAll().subscribe((products) => this.products.set(products));	
	}
}
