import { useActionState } from "react";
import { Button, Input, Modal, Label } from "../../../../components";
import { useTodoListDispatchContext } from "../../../context";
import type { TaskColumnId } from "../../../types";

interface CreateTaskModalProps {
	columnId: TaskColumnId;
	isOpen: boolean;
	onClose: () => void;
}

export function CreateTaskModal({
	columnId,
	isOpen,
	onClose,
}: CreateTaskModalProps) {
	const { addTask } = useTodoListDispatchContext();

	const addTaskAction = (_: unknown, formData: FormData) => {
		const title = formData.get("title") as string;

		if (!title?.trim()) {
			return { error: "Task title is required" };
		}

		addTask(columnId, title.trim());
		onClose();
		return { error: null };
	};

	const [state, formAction] = useActionState(addTaskAction, {
		error: null,
	});

	return (
		<Modal open={isOpen} onClose={onClose}>
			<form action={formAction} className="flex flex-col gap-6">
				<Label label="Task Title" className="w-full">
					<Input name="title" autoFocus error={state.error} />
				</Label>
				<div className="flex flex-row justify-end gap-2">
					<Button type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Add Task</Button>
				</div>
			</form>
		</Modal>
	);
}
