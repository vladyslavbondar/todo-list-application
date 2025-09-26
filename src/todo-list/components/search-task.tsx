import { Input } from "../../components";
import { useTodoListContext } from "../context";

export function SearchTask() {
	const { searchQuery, setSearchQuery } = useTodoListContext();

	return (
		<Input
			placeholder="Search..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
		/>
	);
}
