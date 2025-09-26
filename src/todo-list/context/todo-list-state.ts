import { useReducer } from "react";
import type { TodoListState, ActionType } from "./types";
import {
	setAllColumns,
	addNewColumn,
	editColumn,
	deleteColumn,
	addTaskToColumn,
	deleteTaskFromColumns,
	toggleTaskCompletion,
	toggleTaskSelection,
	editTask,
	bulkDeleteTasks,
	markTasksAsCompleted,
	moveTasksToColumn,
	selectAllTasksInColumn,
	unselectAllTasksInColumn,
	unselectAll,
	setColumnFilter,
	clearColumnFilter,
	setSearchQuery,
	initState,
	setColumnById,
	moveTaskBetweenColumns,
} from "./mutations";

function todoListReducer(
	state: TodoListState,
	action: ActionType
): TodoListState {
	switch (action.type) {
		case "INIT_STATE":
			return initState(state, action.stateData);

		case "SET_COLUMNS":
			return setAllColumns(state, action.columns);

		case "SET_COLUMN_BY_ID":
			return setColumnById(state, action.columnId, action.updatedColumn);

		case "MOVE_TASK_BETWEEN_COLUMNS":
			return moveTaskBetweenColumns(
				state,
				action.homeColumnId,
				action.homeTaskIndex,
				action.destinationColumnId,
				action.destinationIndex
			);

		case "ADD_COLUMN":
			return addNewColumn(state, action.title);

		case "ADD_TASK":
			return addTaskToColumn(state, action.columnId, action.title);

		case "DELETE_TASK":
			return deleteTaskFromColumns(state, action.taskId);

		case "TOGGLE_COMPLETE_TASK":
			return toggleTaskCompletion(state, action.taskId);

		case "TOGGLE_SELECT_TASK":
			return toggleTaskSelection(state, action.taskId);

		case "SELECT_ALL_TASKS":
			return selectAllTasksInColumn(state, action.columnId);

		case "UNSELECT_ALL_TASKS":
			return unselectAllTasksInColumn(state, action.columnId);

		case "SET_COLUMN_FILTER":
			return setColumnFilter(state, action.columnId, action.filter);

		case "CLEAR_COLUMN_FILTER":
			return clearColumnFilter(state, action.columnId);

		case "EDIT_COLUMN":
			return editColumn(state, action.columnId, action.title);

		case "DELETE_COLUMN":
			return deleteColumn(state, action.columnId);

		case "EDIT_TASK":
			return editTask(state, action.taskId, action.title);

		case "BULK_DELETE_TASKS":
			return bulkDeleteTasks(state, action.taskIds);

		case "MARK_TASKS_AS_COMPLETED":
			return markTasksAsCompleted(state, action.taskIds);

		case "MOVE_TASKS_TO_COLUMN":
			return moveTasksToColumn(
				state,
				action.taskIds,
				action.destinationColumnId
			);

		case "UNSELECT_ALL":
			return unselectAll(state);

		case "SET_SEARCH_QUERY":
			return setSearchQuery(state, action.searchQuery);

		default:
			return state;
	}
}

export const initialState: TodoListState = {
	columns: [],
	columnFilters: {},
	searchQuery: "",
};

export function useTodoListState() {
	const [state, dispatch] = useReducer(todoListReducer, initialState);

	return {
		state,
		dispatch,
	};
}
