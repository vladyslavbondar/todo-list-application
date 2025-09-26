export type TaskId = string;

export interface Task {
	id: TaskId;
	description: string;
	completed: boolean;
	selected: boolean;
}

export type TaskColumnId = string;

export interface TaskColumn {
	id: TaskColumnId;
	title: string;
	tasks: Task[];
	version: number;
}
