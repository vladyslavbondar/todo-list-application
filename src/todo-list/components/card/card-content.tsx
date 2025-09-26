import { useState } from "react";
import clsx from "clsx";
import {
	Checkbox,
	RadioButton,
	DropDownMenu,
	DropDownMenuItem,
} from "../../../components";
import { ThreeDotsIcon } from "../../../icons/three-dots";
import {
	useTodoListDispatchContext,
	useTodoListStateContext,
} from "../../context";
import type { Task } from "../../types";

import { EditTaskModal } from "./edit-task-modal";
import { SearchHighlight } from "./search-highlight";

export function CardContent({ task }: { task: Task }) {
	const { searchQuery } = useTodoListStateContext();
	const { toggleSelectTask, toggleCompleteTask, deleteTask } =
		useTodoListDispatchContext();

	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<>
			<div
				className={clsx(
					"flex flex-col items-center",
					"group-hover:visible",
					task.selected ? "visible" : "invisible"
				)}>
				<Checkbox
					checked={task.selected}
					onChange={() => toggleSelectTask(task.id)}
				/>
			</div>
			<RadioButton
				checked={task.completed}
				onChange={() => toggleCompleteTask(task.id)}
			/>
			<SearchHighlight
				isCompleted={task.completed}
				text={task.description}
				searchQuery={searchQuery}
			/>
			<DropDownMenu title={<ThreeDotsIcon />}>
				<DropDownMenuItem onClick={toggleModal}>Edit</DropDownMenuItem>
				<DropDownMenuItem onClick={() => deleteTask(task.id)}>
					Delete
				</DropDownMenuItem>
			</DropDownMenu>
			<EditTaskModal task={task} isOpen={isOpen} onClose={toggleModal} />
		</>
	);
}
