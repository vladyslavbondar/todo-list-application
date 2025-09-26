import { useMemo } from "react";
import clsx from "clsx";
import { Checkbox } from "../../../../components";
import { FilterColumn } from "./filter-column";
import type { TaskColumn } from "../../../types";
import { useTodoListContext } from "../../../context";
import { ColumnActions } from "./column-actions";

export function ColumnHeader({ column }: { column: TaskColumn }) {
	const { selectAllTasks, unselectAllTasks } = useTodoListContext();

	const hasSelected = useMemo(() => {
		return column.tasks.some((task) => task.selected);
	}, [column]);

	const selectAllDisabled = useMemo(() => {
		return column.tasks.length === 0;
	}, [column]);

	const selectedAll = useMemo(() => {
		return !selectAllDisabled && column.tasks.every((task) => task.selected);
	}, [column, selectAllDisabled]);
	return (
		<>
			<div className="flex flex-row items-center gap-2">
				<div
					className={clsx(
						"flex flex-col items-center",
						"group-hover:visible pl-2",
						hasSelected ? "visible" : "invisible"
					)}>
					<Checkbox
						disabled={selectAllDisabled}
						checked={selectedAll}
						onChange={() => {
							if (selectedAll) {
								unselectAllTasks(column.id);
							} else {
								selectAllTasks(column.id);
							}
						}}
					/>
				</div>
			</div>
			<div className="pl-2 font-bold leading-4 flex-grow pr-1">
				{column.title}
			</div>
			<div className="flex flex-row items-center gap-2">
				<FilterColumn columnId={column.id} />

				<div className="pr-2">
					<ColumnActions columnId={column.id} />
				</div>
			</div>
		</>
	);
}
