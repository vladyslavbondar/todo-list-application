import type { TodoListState } from "../types";

export function initState(
	state: TodoListState,
	stateData: TodoListState
): TodoListState {
	return {
		...state,
		...stateData,
	};
}
