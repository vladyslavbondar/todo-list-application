import { useActionState } from "react";
import { Button, Input, Modal, Label } from "../../../components";
import { useTodoListContext } from "../../context";
import type { Task } from "../../types";

interface EditTaskModalProps {
	task: Task;
	isOpen: boolean;
	onClose: () => void;
}

export function EditTaskModal({ task, isOpen, onClose }: EditTaskModalProps) {
	const { editTask } = useTodoListContext();

	const editTaskAction = (_: unknown, formData: FormData) => {
		const title = formData.get("title") as string;

		if (!title?.trim()) {
			return { error: "Task title is required" };
		}

		editTask(task.id, title.trim());
		onClose();
		return { error: null };
	};

	const [state, formAction] = useActionState(editTaskAction, {
		error: null,
	});

	return (
		<Modal open={isOpen} onClose={onClose}>
			<form action={formAction} className="flex flex-col gap-6">
				<Label label="Task Title" className="w-full">
					<Input
						name="title"
						defaultValue={task.description}
						autoFocus
						error={state.error}
					/>
				</Label>
				<div className="flex flex-row justify-end gap-2">
					<Button type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Save Changes</Button>
				</div>
			</form>
		</Modal>
	);
}
