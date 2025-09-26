import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outlined";
	size?: "sm" | "md";
}

export function Button({
	children,
	variant = "primary",
	size = "md",
	...props
}: ButtonProps) {
	const variantClasses = {
		primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
		outlined:
			"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
	};

	const sizeClasses = {
		sm: "p-1 text-sm ",
		md: "p-2 text-sm",
	};

	return (
		<button
			className={clsx(
				"rounded-md transition-all duration-150 active:scale-95",
				variantClasses[variant],
				sizeClasses[size]
			)}
			{...props}>
			{children}
		</button>
	);
}
