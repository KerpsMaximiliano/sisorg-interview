import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// * Router.
import { RouterLink } from '@angular/router';

// * Types.
import { TButton } from '@type/button-variant.type';
import { TIcon } from '@type/icon.type';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-link',
	standalone: true,
	imports: [RouterLink, MatButtonModule, MatIcon, MatTooltip],
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss'
})
export class LinkComponent {
	@Input({ required: true }) public link!: string;
	@Input() public leyend?: string;
	@Input() public label?: string;
	@Input() public variant: TButton = 'basic';
	@Input() public color: 'accent' | 'primary' | 'warn' = 'primary';
	@Input() public disabled: boolean = false;
	@Input() public icon?: TIcon;
	@Input() public tooltip: string = '';
}
