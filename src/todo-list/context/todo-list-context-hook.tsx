import { createContext, useContext } from "react";
import type { TaskColumn, TaskColumnId, TaskId } from "../types";
import type { FilterType } from "./types";

interface TodoListStateContextValue {
	columns: TaskColumn[];
	columnFilters: { [columnId: TaskColumnId]: FilterType };
	searchQuery: string;
}

interface TodoListDispatchContextValue {
	setColumns: (columns: TaskColumn[]) => void;
	addColumn: (title: string) => void;
	editColumn: (columnId: TaskColumnId, title: string) => void;
	deleteColumn: (columnId: TaskColumnId) => void;
	addTask: (columnId: TaskColumnId, title: string) => void;
	editTask: (taskId: TaskId, title: string) => void;
	deleteTask: (taskId: TaskId) => void;
	toggleCompleteTask: (taskId: TaskId) => void;
	toggleSelectTask: (taskId: TaskId) => void;
	selectAllTasks: (columnId: TaskColumnId) => void;
	unselectAllTasks: (columnId: TaskColumnId) => void;
	unselectAll: () => void;
	setColumnFilter: (columnId: TaskColumnId, filter: FilterType) => void;
	bulkDeleteTasks: (taskIds: TaskId[]) => void;
	markTasksAsCompleted: (taskIds: TaskId[]) => void;
	moveTasksToColumn: (
		taskIds: TaskId[],
		destinationColumnId: TaskColumnId
	) => void;
	setSearchQuery: (searchQuery: string) => void;
	setColumnById: (columnId: TaskColumnId, updatedColumn: TaskColumn) => void;
	moveTaskBetweenColumns: (
		homeColumnId: TaskColumnId,
		homeTaskIndex: number,
		destinationColumnId: TaskColumnId,
		destinationIndex: number
	) => void;
}

export const TodoListStateContext =
	createContext<TodoListStateContextValue | null>(null);

export const TodoListDispatchContext =
	createContext<TodoListDispatchContextValue | null>(null);

export function useTodoListStateContext(): TodoListStateContextValue {
	const context = useContext(TodoListStateContext);

	if (context === null) {
		throw new Error(
			"useTodoListStateContext must be used within a TodoListContextProvider"
		);
	}

	return context;
}

export function useTodoListDispatchContext(): TodoListDispatchContextValue {
	const context = useContext(TodoListDispatchContext);

	if (context === null) {
		throw new Error(
			"useTodoListDispatchContext must be used within a TodoListContextProvider"
		);
	}

	return context;
}
