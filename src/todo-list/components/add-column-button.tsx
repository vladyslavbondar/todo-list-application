import { useState, useActionState } from "react";
import { Button, Input, Modal, Label } from "../../components";
import { useTodoListContext } from "../context";

export function AddColumnButton() {
	const [isOpen, setIsOpen] = useState(false);
	const { addColumn } = useTodoListContext();

	const addColumnAction = (_: unknown, formData: FormData) => {
		const title = formData.get("title") as string;

		if (!title?.trim()) {
			return { error: "Title is required" };
		}

		addColumn(title.trim());

		setIsOpen(false);
		return { error: null };
	};

	const [state, formAction] = useActionState(addColumnAction, {
		error: null,
	});

	const handleToggleModal = () => {
		setIsOpen(!isOpen);
	};

	// TODO: close modal with error, open again BUG error is still here

	return (
		<>
			<Button onClick={handleToggleModal}>Add Column</Button>
			{isOpen ? (
				<Modal open={isOpen} onClose={handleToggleModal}>
					<form action={formAction} className="flex flex-col gap-6">
						<Label label="Column Title" className="w-full">
							<Input name="title" autoFocus error={state.error} />
						</Label>
						<div className="flex flex-row justify-end gap-2">
							<Button type="button" onClick={handleToggleModal}>
								Cancel
							</Button>
							<Button type="submit">Add Column</Button>
						</div>
					</form>
				</Modal>
			) : null}
		</>
	);
}
