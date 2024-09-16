import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Material.
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	selector: 'app-dialog-notification',
	imports: [MatDialogTitle, MatDialogContent, ButtonComponent],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.scss'
})
export class NotificationDialog {
	public readonly data = inject(MAT_DIALOG_DATA);
	public readonly dialogRef = inject(MatDialogRef);
}
