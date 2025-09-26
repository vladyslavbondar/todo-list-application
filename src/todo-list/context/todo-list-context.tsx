import {
	useEffect,
	useMemo,
	useRef,
	type PropsWithChildren,
	useCallback,
} from "react";
import {
	TodoListDispatchContext,
	TodoListStateContext,
} from "./todo-list-context-hook";
import { useTodoListState, initialState } from "./todo-list-state";
import type { TaskColumn, TaskColumnId, TaskId } from "../types";
import type { FilterType } from "./types";
import { mockTodoData } from "../mock-todo-list";

const STORAGE_KEY = "todoListState";

export function TodoListContextProvider({ children }: PropsWithChildren) {
	const isLoadedRef = useRef(false);
	const { state, dispatch } = useTodoListState();

	const addColumn = useCallback(
		(title: string) => {
			dispatch({ type: "ADD_COLUMN", title });
		},
		[dispatch]
	);

	const addTask = useCallback(
		(columnId: TaskColumnId, title: string) => {
			dispatch({ type: "ADD_TASK", columnId, title });
		},
		[dispatch]
	);

	const deleteTask = useCallback(
		(taskId: TaskId) => {
			dispatch({ type: "DELETE_TASK", taskId });
		},
		[dispatch]
	);

	const toggleCompleteTask = useCallback(
		(taskId: TaskId) => {
			dispatch({ type: "TOGGLE_COMPLETE_TASK", taskId });
		},
		[dispatch]
	);

	const toggleSelectTask = useCallback(
		(taskId: TaskId) => {
			dispatch({ type: "TOGGLE_SELECT_TASK", taskId });
		},
		[dispatch]
	);

	const selectAllTasks = useCallback(
		(columnId: TaskColumnId) => {
			dispatch({ type: "SELECT_ALL_TASKS", columnId });
		},
		[dispatch]
	);

	const unselectAllTasks = useCallback(
		(columnId: TaskColumnId) => {
			dispatch({ type: "UNSELECT_ALL_TASKS", columnId });
		},
		[dispatch]
	);

	const unselectAll = useCallback(() => {
		dispatch({ type: "UNSELECT_ALL" });
	}, [dispatch]);

	const setColumnFilter = useCallback(
		(columnId: TaskColumnId, filter: FilterType) => {
			if (filter === "all") {
				dispatch({ type: "CLEAR_COLUMN_FILTER", columnId });
			} else {
				dispatch({ type: "SET_COLUMN_FILTER", columnId, filter });
			}
		},
		[dispatch]
	);

	const editColumn = useCallback(
		(columnId: TaskColumnId, title: string) => {
			dispatch({ type: "EDIT_COLUMN", columnId, title });
		},
		[dispatch]
	);

	const deleteColumn = useCallback(
		(columnId: TaskColumnId) => {
			dispatch({ type: "DELETE_COLUMN", columnId });
		},
		[dispatch]
	);

	const editTask = useCallback(
		(taskId: TaskId, title: string) => {
			dispatch({ type: "EDIT_TASK", taskId, title });
		},
		[dispatch]
	);

	const bulkDeleteTasks = useCallback(
		(taskIds: TaskId[]) => {
			dispatch({ type: "BULK_DELETE_TASKS", taskIds });
		},
		[dispatch]
	);

	const markTasksAsCompleted = useCallback(
		(taskIds: TaskId[]) => {
			dispatch({ type: "MARK_TASKS_AS_COMPLETED", taskIds });
		},
		[dispatch]
	);

	const moveTasksToColumn = useCallback(
		(taskIds: TaskId[], destinationColumnId: TaskColumnId) => {
			dispatch({ type: "MOVE_TASKS_TO_COLUMN", taskIds, destinationColumnId });
		},
		[dispatch]
	);

	const setColumns = useCallback(
		(columns: TaskColumn[]) => {
			dispatch({ type: "SET_COLUMNS", columns });
		},
		[dispatch]
	);

	const setSearchQuery = useCallback(
		(searchQuery: string) => {
			dispatch({ type: "SET_SEARCH_QUERY", searchQuery });
		},
		[dispatch]
	);

	const setColumnById = useCallback(
		(columnId: TaskColumnId, updatedColumn: TaskColumn) => {
			dispatch({ type: "SET_COLUMN_BY_ID", columnId, updatedColumn });
		},
		[dispatch]
	);

	const moveTaskBetweenColumns = useCallback(
		(
			homeColumnId: TaskColumnId,
			homeTaskIndex: number,
			destinationColumnId: TaskColumnId,
			destinationIndex: number
		) => {
			dispatch({
				type: "MOVE_TASK_BETWEEN_COLUMNS",
				homeColumnId,
				homeTaskIndex,
				destinationColumnId,
				destinationIndex,
			});
		},
		[dispatch]
	);

	useEffect(() => {
		if (!isLoadedRef.current) {
			const stored = localStorage.getItem(STORAGE_KEY);
			const storedColumns = stored ? JSON.parse(stored) : initialState;
			if (storedColumns.columns.length > 0) {
				dispatch({ type: "INIT_STATE", stateData: storedColumns });
			} else {
				// Use mock data for development when localStorage is empty
				dispatch({
					type: "INIT_STATE",
					stateData: {
						columns: mockTodoData,
						columnFilters: {},
						searchQuery: "",
					},
				});
			}
			isLoadedRef.current = true;
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state, dispatch]);

	const dispatchContextValue = useMemo(
		() => ({
			setColumns,
			addColumn,
			addTask,
			deleteTask,
			toggleCompleteTask,
			toggleSelectTask,
			selectAllTasks,
			unselectAllTasks,
			unselectAll,
			setColumnFilter,
			editColumn,
			deleteColumn,
			editTask,
			bulkDeleteTasks,
			markTasksAsCompleted,
			moveTasksToColumn,
			setSearchQuery,
			setColumnById,
			moveTaskBetweenColumns,
		}),
		[
			setColumns,
			addColumn,
			addTask,
			deleteTask,
			toggleCompleteTask,
			toggleSelectTask,
			selectAllTasks,
			unselectAllTasks,
			unselectAll,
			setColumnFilter,
			editColumn,
			deleteColumn,
			editTask,
			bulkDeleteTasks,
			markTasksAsCompleted,
			moveTasksToColumn,
			setSearchQuery,
			setColumnById,
			moveTaskBetweenColumns,
		]
	);

	const stateContextValue = useMemo(
		() => ({
			columns: state.columns,
			columnFilters: state.columnFilters,
			searchQuery: state.searchQuery,
		}),
		[state.columns, state.columnFilters, state.searchQuery]
	);

	return (
		<TodoListDispatchContext.Provider value={dispatchContextValue}>
			<TodoListStateContext.Provider value={stateContextValue}>
				{children}
			</TodoListStateContext.Provider>
		</TodoListDispatchContext.Provider>
	);
}
