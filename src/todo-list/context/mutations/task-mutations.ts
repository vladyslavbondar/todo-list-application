import type { TodoListState } from "../types";
import type { Task, TaskColumnId, TaskId } from "../../types";
import { generateId } from "../utils/id-generator";

export function addTaskToColumn(
	state: TodoListState,
	columnId: TaskColumnId,
	title: string
): TodoListState {
	if (!title.trim()) {
		throw new Error("Task title cannot be empty");
	}

	return {
		...state,
		columns: state.columns.map((column) =>
			column.id === columnId
				? {
						...column,
						tasks: [
							{
								id: generateId(),
								description: title,
								completed: false,
								selected: false,
							},
							...column.tasks,
						],
				  }
				: column
		),
	};
}

export function deleteTaskFromColumns(
	state: TodoListState,
	taskId: TaskId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.filter((task: Task) => task.id !== taskId),
		})),
	};
}

export function toggleTaskCompletion(
	state: TodoListState,
	taskId: TaskId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.map((task: Task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			),
		})),
	};
}

export function toggleTaskSelection(
	state: TodoListState,
	taskId: TaskId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.map((task: Task) =>
				task.id === taskId ? { ...task, selected: !task.selected } : task
			),
		})),
	};
}

export function editTask(
	state: TodoListState,
	taskId: TaskId,
	title: string
): TodoListState {
	if (!title.trim()) {
		throw new Error("Task title cannot be empty");
	}

	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.map((task: Task) =>
				task.id === taskId ? { ...task, description: title.trim() } : task
			),
		})),
	};
}

export function bulkDeleteTasks(
	state: TodoListState,
	taskIds: TaskId[]
): TodoListState {
	const taskIdSet = new Set(taskIds);

	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.filter((task: Task) => !taskIdSet.has(task.id)),
		})),
	};
}

export function markTasksAsCompleted(
	state: TodoListState,
	taskIds: TaskId[]
): TodoListState {
	const taskIdSet = new Set(taskIds);

	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.map((task: Task) =>
				taskIdSet.has(task.id) ? { ...task, completed: true } : task
			),
		})),
	};
}

export function moveTasksToColumn(
	state: TodoListState,
	taskIds: TaskId[],
	destinationColumnId: TaskColumnId
): TodoListState {
	const taskIdSet = new Set(taskIds);
	const tasksToMove: Task[] = [];

	// TODO: Refactor this to use a more efficient algorithm
	// First, collect all tasks that need to be moved and remove them from their current columns
	const columnsWithTasksRemoved = state.columns.map((column) => {
		const remainingTasks = column.tasks.filter((task: Task) => {
			if (taskIdSet.has(task.id)) {
				tasksToMove.push(task);
				return false; // Remove from current column
			}
			return true; // Keep in current column
		});

		return {
			...column,
			tasks: remainingTasks,
		};
	});

	// Then, add all collected tasks to the destination column
	return {
		...state,
		columns: columnsWithTasksRemoved.map((column) =>
			column.id === destinationColumnId
				? {
						...column,
						tasks: [...column.tasks, ...tasksToMove],
				  }
				: column
		),
	};
}
