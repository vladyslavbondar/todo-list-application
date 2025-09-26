import { useState } from "react";
import { DropDownMenu, DropDownMenuItem } from "../../../../components";
import { ThreeDotsIcon } from "../../../../icons/three-dots";
import { CreateTaskModal } from "./create-task-modal";
import { useTodoListContext } from "../../../context";
import type { TaskColumnId } from "../../../types";

export function ColumnActions({ columnId }: { columnId: TaskColumnId }) {
	const { deleteColumn } = useTodoListContext();
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<>
			<DropDownMenu title={<ThreeDotsIcon />}>
				<DropDownMenuItem onClick={toggleModal}>Create Task</DropDownMenuItem>
				<DropDownMenuItem onClick={() => deleteColumn(columnId)}>
					Delete
				</DropDownMenuItem>
			</DropDownMenu>
			<CreateTaskModal
				columnId={columnId}
				isOpen={isOpen}
				onClose={toggleModal}
			/>
		</>
	);
}
