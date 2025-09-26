export function isTaskData(value: Record<string, unknown>): boolean {
	return "task" in value;
}

export function isDraggingATask({
	source,
}: {
	source: { data: Record<string, unknown> };
}): boolean {
	return isTaskData(source.data);
}

export function isTaskDropTargetData(value: Record<string, unknown>) {
	return value.task !== undefined;
}

export function isColumnData(value: Record<string, unknown>) {
	return value.task === undefined;
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
