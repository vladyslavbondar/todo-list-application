import clsx from "clsx";

export function SearchHighlight({
	isCompleted,
	text,
	searchQuery,
}: {
	isCompleted: boolean;
	text: string;
	searchQuery: string;
}) {
	if (searchQuery.trim() === "") {
		return (
			<div
				className={clsx(
					"flex-grow",
					isCompleted && "line-through text-gray-500"
				)}>
				{text}
			</div>
		);
	}

	const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

	return (
		<span
			className={clsx(
				"flex-grow",
				isCompleted && "line-through text-gray-500"
			)}>
			{parts.map((part, index) => (
				<span
					key={index}
					className={clsx(
						part.toLowerCase() === searchQuery.toLowerCase()
							? "text-blue-500"
							: ""
					)}>
					{part}
				</span>
			))}
		</span>
	);
}
