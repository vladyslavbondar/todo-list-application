import { createContext, useContext } from "react";
import type { TaskColumn, TaskColumnId, TaskId } from "../types";
import type { FilterType } from "./types";

interface TodoListContextValue {
	columns: TaskColumn[];
	columnFilters: { [columnId: TaskColumnId]: FilterType };
	searchQuery: string;
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

export const TodoListContext = createContext<TodoListContextValue | null>(null);

export type { TodoListContextValue };

export function useTodoListContext(): TodoListContextValue {
	const context = useContext(TodoListContext);

	if (context === null) {
		throw new Error(
			"useTodoListContext must be used within a TodoListContextProvider"
		);
	}

	return context;
}
