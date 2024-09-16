interface IPriority {
	1: 'Baja';
	2: 'Media';
	3: 'Alta';
}

export type TTaskPriorities = {
	[K in keyof IPriority]: {
		value: K;
		label: IPriority[K];
	};
}[keyof IPriority];
