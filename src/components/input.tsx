import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string | null;
}

export function Input({ error, ...props }: InputProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<input
				className="rounded-md border border-gray-300 p-2 w-full"
				{...props}
			/>
			{error ? <p className="text-red-500 text-sm">{error}</p> : null}
		</div>
	);
}
