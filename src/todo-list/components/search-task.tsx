import { Input } from "../../components";
import {
	useTodoListDispatchContext,
	useTodoListStateContext,
} from "../context";

export function SearchTask() {
	const { searchQuery } = useTodoListStateContext();
	const { setSearchQuery } = useTodoListDispatchContext();

	return (
		<Input
			placeholder="Search..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
		/>
	);
}
