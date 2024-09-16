import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

// * Types.
import { TButton } from '@type/button-variant.type';
import { TIcon } from '@type/icon.type';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-button',
	standalone: true,
	imports: [MatButtonModule, MatIcon, MatTooltip],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss'
})
export class ButtonComponent {
	@Output() public readonly actionClick: EventEmitter<void> = new EventEmitter<void>();

	@Input() public leyend?: string;
	@Input() public label?: string;
	@Input() public variant: TButton = 'basic';
	@Input() public color: 'accent' | 'primary' | 'warn' = 'primary';
	@Input() public disabled: boolean = false;
	@Input() public icon?: TIcon;
	@Input() public tooltip: string = '';

	public onClick(): void {
		this.actionClick.emit();
	}
}
