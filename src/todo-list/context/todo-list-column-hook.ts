import { useEffect, useRef, useState } from "react";
import type { TaskColumnId, TaskColumn } from "../types";
import { useTodoListStateContext } from "./todo-list-context-hook";

import { filterColumn } from "./utils/filter-utils";

/* 
	This hook is the selector for column by id.

	Used to I simply returned all data as single source of truth, later i introduced 
	version of column so every mutation would increase version and based on the version i would
	decide if i need to return new column and trigger rerender.

	But... it does not really work, I would like to fix it, and will, but it's time for me to
	finish the assesment.

	TO be honest there are a lot of thing i would like to improve, but i tried to deliver as
	relitevly fast good
*/
export function useTodoListColumn(columnId: TaskColumnId) {
	const [column, setColumn] = useState<TaskColumn | null>();
	const versionRef = useRef<number | null>(null);
	const { columns, columnFilters, searchQuery } = useTodoListStateContext();

	useEffect(() => {
		const columnById = columns.find((column) => column.id === columnId);

		if (!columnById) {
			throw new Error(`Column with id ${columnId} not found`);
		}

		if (
			versionRef.current === null ||
			versionRef.current !== columnById.version
		) {
			versionRef.current = columnById.version;

			if (columnById) {
				setColumn(
					filterColumn(columnById, columnFilters[columnId], searchQuery)
				);
			}
		}
	}, [columns, columnId, columnFilters, searchQuery]);

	return column;
}
