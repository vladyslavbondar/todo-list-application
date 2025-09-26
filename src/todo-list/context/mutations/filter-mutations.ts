import type { TaskColumnId } from "../../types";
import type { TodoListState, FilterType } from "../types";

export function setColumnFilter(
	state: TodoListState,
	columnId: TaskColumnId,
	filter: FilterType
): TodoListState {
	return {
		...state,
		columnFilters: {
			...state.columnFilters,
			[columnId]: filter,
		},
		columns: state.columns.map((column) =>
			column.id === columnId
				? { ...column, version: column.version + 1 }
				: column
		),
	};
}

export function clearColumnFilter(
	state: TodoListState,
	columnId: TaskColumnId
): TodoListState {
	const currentColumnFilters = {
		...state.columnFilters,
	};
	delete currentColumnFilters[columnId];

	return {
		...state,
		columnFilters: currentColumnFilters,
		columns: state.columns.map((column) =>
			column.id === columnId
				? { ...column, version: column.version + 1 }
				: column
		),
	};
}

export function setSearchQuery(
	state: TodoListState,
	searchQuery: string
): TodoListState {
	return {
		...state,
		searchQuery,
		columns: state.columns.map((column) => ({
			...column,
			version: column.version + 1,
		})),
	};
}
