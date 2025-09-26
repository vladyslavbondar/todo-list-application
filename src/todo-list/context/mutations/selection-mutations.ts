import type { TodoListState } from "../types";
import type { TaskColumnId } from "../../types";

export function selectAllTasksInColumn(
	state: TodoListState,
	columnId: TaskColumnId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) =>
			column.id === columnId
				? {
						...column,
						tasks: column.tasks.map((task) => ({
							...task,
							selected: true,
						})),
						version: column.version + 1,
				  }
				: column
		),
	};
}

export function unselectAllTasksInColumn(
	state: TodoListState,
	columnId: TaskColumnId
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) =>
			column.id === columnId
				? {
						...column,
						tasks: column.tasks.map((task) => ({
							...task,
							selected: false,
						})),
						version: column.version + 1,
				  }
				: column
		),
	};
}

export function unselectAll(state: TodoListState): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => {
			const hasSelectedTasks = column.tasks.some((task) => task.selected);
			return {
				...column,
				tasks: column.tasks.map((task) => ({
					...task,
					selected: false,
				})),
				version: hasSelectedTasks ? column.version + 1 : column.version,
			};
		}),
	};
}
