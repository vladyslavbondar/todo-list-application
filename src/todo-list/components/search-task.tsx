import { useState, useEffect } from "react";
import { Input } from "../../components";
import {
	useTodoListDispatchContext,
	useTodoListStateContext,
} from "../context";
import { useDebounce } from "../context/utils/use-debounce";

export function SearchTask() {
	const { searchQuery } = useTodoListStateContext();
	const { setSearchQuery } = useTodoListDispatchContext();

	const [inputValue, setInputValue] = useState(searchQuery);

	const debouncedSearchQuery = useDebounce(inputValue, 300);

	useEffect(() => {
		setSearchQuery(debouncedSearchQuery);
	}, [debouncedSearchQuery, setSearchQuery]);

	useEffect(() => {
		setInputValue(searchQuery);
	}, [searchQuery]);

	return (
		<Input
			placeholder="Search..."
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
		/>
	);
}
