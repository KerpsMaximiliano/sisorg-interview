import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'timestamp', standalone: true, pure: true })
export class TimestampPipe implements PipeTransform {
	public transform(value: Timestamp | null): string {
		if (!value) return 'No disponible';
		return value.toDate().toLocaleDateString();
	}
}
