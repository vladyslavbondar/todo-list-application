import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: "square" | "circle";
}

export function Checkbox({
	variant = "square",
	disabled = false,
	...props
}: CheckboxProps) {
	const shapeClass = variant === "circle" ? "rounded-full" : "rounded";

	return (
		<input
			type="checkbox"
			disabled={disabled}
			className={clsx(
				"w-5 h-5 border-2 bg-white text-blue-600 transition-all duration-200",
				shapeClass,
				disabled
					? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
					: "border-gray-300 hover:border-blue-400 checked:bg-blue-600"
			)}
			{...props}
		/>
	);
}
