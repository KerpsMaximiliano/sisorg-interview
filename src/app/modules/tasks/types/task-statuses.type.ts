interface IStatus {
	1: 'Nuevo';
	2: 'En progreso';
	3: 'Completado';
}

export type TTaskStatuses = {
	[K in keyof IStatus]: {
		value: K;
		label: IStatus[K];
	};
}[keyof IStatus];
