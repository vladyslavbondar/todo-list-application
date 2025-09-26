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
	};
}

export function setSearchQuery(
	state: TodoListState,
	searchQuery: string
): TodoListState {
	return {
		...state,
		searchQuery,
	};
}
