import { Select } from "../../../../components";
import { useTodoListContext } from "../../../context";
import type { FilterType } from "../../../context/types";
import type { TaskColumnId } from "../../../types";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "completed", label: "Completed" },
	{ value: "uncompleted", label: "Uncompleted" },
];

export function FilterColumn({ columnId }: { columnId: TaskColumnId }) {
	const { setColumnFilter, columnFilters } = useTodoListContext();

	return (
		<div className="w-24">
			<Select
				size="xs"
				value={columnFilters[columnId] || "all"}
				onChange={(value) => {
					setColumnFilter(columnId, value as FilterType);
				}}
				options={FILTER_OPTIONS}
			/>
		</div>
	);
}
