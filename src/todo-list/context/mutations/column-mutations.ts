import type { TodoListState } from "../types";
import type { TaskColumn, TaskColumnId } from "../../types";
import { generateId } from "../utils/id-generator";

export function setAllColumns(
	state: TodoListState,
	columns: TaskColumn[]
): TodoListState {
	return {
		...state,
		columns,
	};
}

export function setColumnById(
	state: TodoListState,
	columnId: TaskColumnId,
	updatedColumn: TaskColumn
): TodoListState {
	return {
		...state,
		columns: state.columns.map((column) =>
			column.id === columnId
				? { ...updatedColumn, version: column.version + 1 }
				: column
		),
	};
}

export function moveTaskBetweenColumns(
	state: TodoListState,
	homeColumnId: TaskColumnId,
	homeTaskIndex: number,
	destinationColumnId: TaskColumnId,
	destinationIndex: number
): TodoListState {
	// Remove task from home list
	const homeColumn = state.columns.find((c) => c.id === homeColumnId);
	if (!homeColumn || !homeColumn.tasks[homeTaskIndex]) {
		throw new Error("Task to move not found");
	}
	const taskToMove = { ...homeColumn.tasks[homeTaskIndex] };
	const homeTasks = [...(homeColumn.tasks || [])];
	homeTasks.splice(homeTaskIndex, 1);

	// Insert task into destination list
	const destinationColumn = state.columns.find(
		(column) => column.id === destinationColumnId
	);
	const destinationTasks = [...(destinationColumn?.tasks || [])];

	destinationTasks.splice(destinationIndex, 0, taskToMove);

	return {
		...state,
		columns: state.columns.map((column) => {
			if (column.id === homeColumn?.id) {
				return { ...column, tasks: homeTasks, version: column.version + 1 };
			}
			if (column.id === destinationColumnId) {
				return {
					...column,
					tasks: destinationTasks,
					version: column.version + 1,
				};
			}
			return column;
		}),
	};
}

export function addNewColumn(
	state: TodoListState,
	title: string
): TodoListState {
	return {
		...state,
		columns: [
			...state.columns,
			{ title, tasks: [], id: generateId(), version: 0 },
		],
	};
}

export function editColumn(
	state: TodoListState,
	columnId: TaskColumnId,
	title: string
): TodoListState {
	if (!title.trim()) {
		throw new Error("Column title cannot be empty");
	}

	return {
		...state,
		columns: state.columns.map((column) =>
			column.id === columnId
				? { ...column, title: title.trim(), version: column.version + 1 }
				: column
		),
	};
}

export function deleteColumn(
	state: TodoListState,
	columnId: TaskColumnId
): TodoListState {
	return {
		...state,
		columns: state.columns.filter((column) => column.id !== columnId),
		columnFilters: Object.fromEntries(
			Object.entries(state.columnFilters).filter(([id]) => id !== columnId)
		),
	};
}
