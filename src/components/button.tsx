import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outlined";
}

export function Button({
	children,
	variant = "primary",
	...props
}: ButtonProps) {
	const variantClasses = {
		primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
		outlined:
			"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
	};

	return (
		<button
			className={clsx(
				"rounded-md p-2 transition-all duration-150 active:scale-95",
				variantClasses[variant]
			)}
			{...props}>
			{children}
		</button>
	);
}
