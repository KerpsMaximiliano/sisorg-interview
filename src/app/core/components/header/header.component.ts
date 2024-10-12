import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-header',
	standalone: true,
  imports: [RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public readonly navigation = [
    {
      label: $localize `Home`,
      route: $localize `/home`,
    },
    {
      label: $localize `About us`,
      route: $localize `/about-us`,
    },
    {
      label: $localize `Products`,
      route: $localize `/products`,
    },
    {
      label: $localize `Clients`,
      route: $localize `/clients`,
    },
    {
      label: $localize `Blogs`,
      route: $localize `/blogs`,
    },
    {
      label: $localize `Contact`,
      route: $localize `/contact`,
    }
  ];
}
