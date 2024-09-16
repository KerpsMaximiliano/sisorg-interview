import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notOnlySpaces(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value === null || control.value === '') return null;
		const REGEX: RegExp = /^\s+$/;
		return REGEX.test(control.value) ? { onlySpaces: true } : null;
	};
}

export function getErrorMessage(control: AbstractControl): string {
	if (control.errors?.['required']) {
		return `Este campo es obligatorio.`;
	} else {
		if (control.errors?.['minlength']) return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;

		if (control.errors?.['maxlength']) return `No puede tener más de ${control.errors['maxlength'].requiredLength} caracteres.`;

		if (control.errors?.['email']) return `Debe ser un correo electrónico válido.`;

		if (control.errors?.['min']) return `El valor mínimo es ${control.errors['min'].min}.`;

		if (control.errors?.['max']) return `El valor máximo es ${control.errors['max'].max}.`;

		if (control.errors?.['onlySpaces']) return 'No puede tener solo espacios en blanco.';
	}

	return '';
}
