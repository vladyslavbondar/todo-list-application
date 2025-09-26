import type { TaskColumn } from "./types";

export const mockTodoData: TaskColumn[] = [
	{
		id: "1",
		title: "To Do",
		tasks: [
			{
				id: "task-1",
				description: "Set up project structure",
				completed: false,
				selected: false,
			},
			{
				id: "task-2",
				description: "Design user interface mockups",
				completed: false,
				selected: false,
			},
			{
				id: "task-3",
				description: "Research best practices for state management",
				completed: false,
				selected: false,
			},
		],
	},
	{
		id: "2",
		title: "In Progress",
		tasks: [
			{
				id: "task-4",
				description: "Implement task creation functionality",
				completed: false,
				selected: false,
			},
			{
				id: "task-5",
				description: "Add drag and drop support",
				completed: false,
				selected: false,
			},
		],
	},
	{
		id: "3",
		title: "Done",
		tasks: [
			{
				id: "task-6",
				description: "Initialize React project",
				completed: true,
				selected: false,
			},
			{
				id: "task-7",
				description: "Install required dependencies",
				completed: true,
				selected: false,
			},
			{
				id: "task-8",
				description: "Configure TypeScript",
				completed: true,
				selected: false,
			},
		],
	},
];
