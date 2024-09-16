export interface ITask {
	id: string;
	title: string;
	description: string | null;
	status: number;
	priority: number;
	createdAt: Date;
	updatedAt: Date | null;
}
