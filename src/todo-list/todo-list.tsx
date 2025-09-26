import { Board, AddColumnButton, BulkActions, SearchTask } from "./components";
import { TodoListContextProvider } from "./context";

export function TodoList() {
	return (
		<TodoListContextProvider>
			<div className="h-screen w-screen flex flex-col gap-5 p-3">
				<div className="w-full flex justify-center gap-2">
					<div className="max-w-2xl">
						<SearchTask />
					</div>
					<AddColumnButton />
				</div>
				<Board />
			</div>
			<BulkActions />
		</TodoListContextProvider>
	);
}
