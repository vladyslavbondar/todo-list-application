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
						version: column.version + 1,
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
		columns: state.columns.map((column) => {
			const filteredTasks = column.tasks.filter(
				(task: Task) => task.id !== taskId
			);
			// Only increment version if task was actually removed from this column
			const hasChanged = filteredTasks.length !== column.tasks.length;
			return {
				...column,
				tasks: filteredTasks,
				version: hasChanged ? column.version + 1 : column.version,
			};
		}),
	};
}

export function toggleTaskCompletion(
	state: TodoListState,
	taskId: TaskId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => {
			const hasTask = column.tasks.some((task) => task.id === taskId);
			return {
				...column,
				tasks: column.tasks.map((task: Task) =>
					task.id === taskId ? { ...task, completed: !task.completed } : task
				),
				version: hasTask ? column.version + 1 : column.version,
			};
		}),
	};
}

export function toggleTaskSelection(
	state: TodoListState,
	taskId: TaskId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => {
			const hasTask = column.tasks.some((task) => task.id === taskId);
			return {
				...column,
				tasks: column.tasks.map((task: Task) =>
					task.id === taskId ? { ...task, selected: !task.selected } : task
				),
				version: hasTask ? column.version + 1 : column.version,
			};
		}),
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
		columns: state.columns.map((column) => {
			const hasTask = column.tasks.some((task) => task.id === taskId);
			return {
				...column,
				tasks: column.tasks.map((task: Task) =>
					task.id === taskId ? { ...task, description: title.trim() } : task
				),
				version: hasTask ? column.version + 1 : column.version,
			};
		}),
	};
}

export function bulkDeleteTasks(
	state: TodoListState,
	taskIds: TaskId[]
): TodoListState {
	const taskIdSet = new Set(taskIds);

	return {
		...state,
		columns: state.columns.map((column) => {
			const filteredTasks = column.tasks.filter(
				(task: Task) => !taskIdSet.has(task.id)
			);
			// Only increment version if tasks were actually removed from this column
			const hasChanged = filteredTasks.length !== column.tasks.length;
			return {
				...column,
				tasks: filteredTasks,
				version: hasChanged ? column.version + 1 : column.version,
			};
		}),
	};
}

export function markTasksAsCompleted(
	state: TodoListState,
	taskIds: TaskId[]
): TodoListState {
	const taskIdSet = new Set(taskIds);

	return {
		...state,
		columns: state.columns.map((column) => {
			const hasAnyTask = column.tasks.some((task) => taskIdSet.has(task.id));
			return {
				...column,
				tasks: column.tasks.map((task: Task) =>
					taskIdSet.has(task.id) ? { ...task, completed: true } : task
				),
				version: hasAnyTask ? column.version + 1 : column.version,
			};
		}),
	};
}

export function moveTasksToColumn(
	state: TodoListState,
	taskIds: TaskId[],
	destinationColumnId: TaskColumnId
): TodoListState {
	const taskIdSet = new Set(taskIds);
	const tasksToMove: Task[] = [];

	// Collect all tasks that need to be moved and remove them from their current columns
	const columnsWithTasksRemoved = state.columns.map((column) => {
		const remainingTasks = column.tasks.filter((task: Task) => {
			if (taskIdSet.has(task.id)) {
				tasksToMove.push(task);
				return false;
			}
			return true;
		});

		// Only increment version if tasks were actually removed from this column
		const hasChanged = remainingTasks.length !== column.tasks.length;
		return {
			...column,
			tasks: remainingTasks,
			version: hasChanged ? column.version + 1 : column.version,
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
						version: column.version + 1,
				  }
				: column
		),
	};
}
