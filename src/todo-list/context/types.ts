import type { TaskColumn, TaskColumnId, TaskId } from "../types";

export type FilterType = "all" | "completed" | "uncompleted";

export type ColumnFilters = { [columnId: TaskColumnId]: FilterType };

export interface TodoListState {
	columns: TaskColumn[];
	columnFilters: ColumnFilters;
	searchQuery: string;
}

export type ActionType =
	| {
			type: "INIT_STATE";
			stateData: TodoListState;
	  }
	| {
			type: "SET_COLUMNS";
			columns: TaskColumn[];
	  }
	| {
			type: "SET_COLUMN_BY_ID";
			columnId: TaskColumnId;
			updatedColumn: TaskColumn;
	  }
	| {
			type: "MOVE_TASK_BETWEEN_COLUMNS";
			homeColumnId: TaskColumnId;
			homeTaskIndex: number;
			destinationColumnId: TaskColumnId;
			destinationIndex: number;
	  }
	| {
			type: "SET_COLUMN_BY_INDEX";
			columnIndex: number;
			updatedColumn: TaskColumn;
	  }
	| {
			type: "ADD_COLUMN";
			title: string;
	  }
	| {
			type: "ADD_TASK";
			columnId: TaskColumnId;
			title: string;
	  }
	| {
			type: "DELETE_TASK";
			taskId: TaskId;
	  }
	| {
			type: "TOGGLE_COMPLETE_TASK";
			taskId: TaskId;
	  }
	| {
			type: "TOGGLE_SELECT_TASK";
			taskId: TaskId;
	  }
	| {
			type: "SELECT_ALL_TASKS";
			columnId: TaskColumnId;
	  }
	| {
			type: "UNSELECT_ALL_TASKS";
			columnId: TaskColumnId;
	  }
	| {
			type: "SET_COLUMN_FILTER";
			columnId: TaskColumnId;
			filter: FilterType;
	  }
	| {
			type: "CLEAR_COLUMN_FILTER";
			columnId: TaskColumnId;
	  }
	| {
			type: "EDIT_COLUMN";
			columnId: TaskColumnId;
			title: string;
	  }
	| {
			type: "DELETE_COLUMN";
			columnId: TaskColumnId;
	  }
	| {
			type: "EDIT_TASK";
			taskId: TaskId;
			title: string;
	  }
	| {
			type: "BULK_DELETE_TASKS";
			taskIds: TaskId[];
	  }
	| {
			type: "MARK_TASKS_AS_COMPLETED";
			taskIds: TaskId[];
	  }
	| {
			type: "MOVE_TASKS_TO_COLUMN";
			taskIds: TaskId[];
			destinationColumnId: TaskColumnId;
	  }
	| {
			type: "UNSELECT_ALL";
	  }
	| {
			type: "SET_SEARCH_QUERY";
			searchQuery: string;
	  };
