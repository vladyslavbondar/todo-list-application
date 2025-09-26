import type { Task, TaskColumn } from "../../types";
import type { FilterType, ColumnFilters } from "../types";

function findTasksBySearchQuery(task: Task, searchQuery: string) {
	if (searchQuery.trim() === "") {
		return true;
	}

	return task.description.toLowerCase().includes(searchQuery.toLowerCase());
}

export function filterTasks(
	tasks: Task[],
	filter: FilterType,
	searchQuery: string
): Task[] {
	switch (filter) {
		case "completed":
			return tasks.filter(
				(task) => task.completed && findTasksBySearchQuery(task, searchQuery)
			);
		case "uncompleted":
			return tasks.filter(
				(task) => !task.completed && findTasksBySearchQuery(task, searchQuery)
			);
		case "all":
			return tasks.filter((task) => findTasksBySearchQuery(task, searchQuery));
		default:
			if (searchQuery.trim() === "") {
				return tasks;
			}
			return tasks.filter((task) =>
				task.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
	}
}

export function filterColumn(
	column: TaskColumn,
	filter: FilterType,
	searchQuery: string
): TaskColumn {
	if (filter === "all" && searchQuery.trim() === "") {
		return column;
	}

	return {
		...column,
		tasks: filterTasks(column.tasks, filter, searchQuery),
	};
}

/* deprecated soon */
export function filterColumns(
	columns: TaskColumn[],
	columnFilters: ColumnFilters,
	searchQuery: string
): TaskColumn[] {
	return columns.map((column) =>
		filterColumn(column, columnFilters[column.id] || "all", searchQuery)
	);
}
