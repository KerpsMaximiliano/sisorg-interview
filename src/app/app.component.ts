import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { CoreService, IProduct } from './core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<h1>PRODUCTS</h1>
		<ul>
			@for (item of products(); track $index) {
				<li>
					{{ item.title }}
					{{ item.description }}
					{{ item.price }}
				</li>
			}
		</ul>
		<router-outlet />
	`
})
export class AppComponent implements OnInit {
	public readonly products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);

	private readonly _core: CoreService = inject(CoreService);

	public ngOnInit(): void {
		this._core.get().subscribe((products) => this.products.set(products));	
	}
}
