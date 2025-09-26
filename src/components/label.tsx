import { type LabelHTMLAttributes, type PropsWithChildren } from "react";

interface LabelProps
	extends PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>> {
	label: string;
}

export function Label({ children, label, ...props }: LabelProps) {
	return (
		<label {...props}>
			<p className="p-2">{label}</p>
			{children}
		</label>
	);
}
