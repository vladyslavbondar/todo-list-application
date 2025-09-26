import { useMemo } from "react";
import {
	useTodoListDispatchContext,
	useTodoListStateContext,
} from "../../context";
import type { TaskId } from "../../types";

import { Button, Select } from "../../../components";

export function BulkActions() {
	const { columns } = useTodoListStateContext();

	const hasSelectedTasks = useMemo(() => {
		return columns.some((column) => column.tasks.some((task) => task.selected));
	}, [columns]);

	if (!hasSelectedTasks) {
		return null;
	}

	return <BulkActionsContent />;
}

function BulkActionsContent() {
	const { columns } = useTodoListStateContext();
	const {
		markTasksAsCompleted,
		bulkDeleteTasks,
		moveTasksToColumn,
		unselectAll,
	} = useTodoListDispatchContext();

	const columnOptions = useMemo(() => {
		return columns.map((column) => ({
			label: column.title,
			value: column.id,
		}));
	}, [columns]);

	const selectedTaskIds = useMemo(() => {
		return columns.reduce((acc, column) => {
			column.tasks.forEach((task) => {
				if (task.selected) {
					acc.push(task.id);
				}
			});
			return acc;
		}, [] as TaskId[]);
	}, [columns]);

	return (
		<div className="w-max fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-row items-center gap-2 p-3 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-gray-300">
			<Button
				variant="outlined"
				onClick={() => markTasksAsCompleted(selectedTaskIds)}>
				Mark as completed
			</Button>
			<Button
				variant="outlined"
				onClick={() => bulkDeleteTasks(selectedTaskIds)}>
				Delete
			</Button>
			<div className="flex flex-row items-center gap-2">
				<p>Move to column:</p>
				<div className="min-w-40">
					<Select
						placeholder="Select column"
						options={columnOptions}
						onChange={(value) =>
							moveTasksToColumn(selectedTaskIds, value as string)
						}
					/>
				</div>
			</div>
			<Button variant="outlined" onClick={unselectAll}>
				Close
			</Button>
		</div>
	);
}
