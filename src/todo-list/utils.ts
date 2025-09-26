import type { Task, TaskColumn, TaskColumnId } from "./types";

export interface TaskDragData {
	task: Task;
	columnId: TaskColumnId;
	rect: DOMRect;
}

export function isTaskData(value: unknown): value is TaskDragData {
	return (
		typeof value === "object" &&
		value !== null &&
		"task" in value &&
		typeof value.task === "object" &&
		value.task !== null
	);
}

export function isDraggingATask({
	source,
}: {
	source: { data: Record<string, unknown> };
}): boolean {
	return isTaskData(source.data);
}

export interface TaskDropTargetData {
	task: Task;
	columnId: TaskColumnId;
}

export function isTaskDropTargetData(
	value: unknown
): value is TaskDropTargetData {
	return (
		typeof value === "object" &&
		value !== null &&
		"task" in value &&
		typeof value.task === "object" &&
		value.task !== null
	);
}

export interface ColumnData {
	column: TaskColumn;
}

export function isColumnData(value: unknown): value is ColumnData {
	return (
		typeof value === "object" &&
		value !== null &&
		"column" in value &&
		typeof value.column === "object" &&
		value.column !== null
	);
}

export function isDraggingAColumn({
	source,
}: {
	source: { data: Record<string, unknown> };
}): boolean {
	return source.data.task === undefined;
}

export function isShallowEqual(
	obj1: Record<string, unknown>,
	obj2: Record<string, unknown>
): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}
	return keys1.every((key1) => Object.is(obj1[key1], obj2[key1]));
}
