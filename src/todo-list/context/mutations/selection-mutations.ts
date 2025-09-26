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
				  }
				: column
		),
	};
}

export function unselectAll(state: TodoListState): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) => ({
			...column,
			tasks: column.tasks.map((task) => ({
				...task,
				selected: false,
			})),
		})),
	};
}
