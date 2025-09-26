import React from "react";

export interface ToggleProps {
	/** Whether the toggle is checked/on */
	checked?: boolean;
	/** Callback when toggle state changes */
	onChange?: (checked: boolean) => void;
	/** Whether the toggle is disabled */
	disabled?: boolean;
	/** Label text for the toggle */
	label?: string;
	/** Additional CSS classes */
	className?: string;
	/** ID for the toggle input */
	id?: string;
}

export function Toggle({
	checked = false,
	onChange,
	disabled = false,
	label,
	className = "",
	id,
}: ToggleProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		onChange?.(event.target.checked);
	};

	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					id={id}
					checked={checked}
					onChange={handleChange}
					disabled={disabled}
					className="sr-only peer"
				/>
				<div
					className={`
            relative w-11 h-6 bg-gray-200 rounded-full 
            peer-focus:ring-2 peer-focus:ring-blue-300
            transition-all duration-200 ease-in-out
            ${checked ? "bg-blue-600" : "bg-gray-200"}
            ${
							disabled
								? "opacity-50 cursor-not-allowed"
								: "cursor-pointer hover:bg-gray-300 peer-checked:hover:bg-blue-700"
						}
            peer-checked:bg-blue-600
          `}>
					<div
						className={`
              absolute top-0.5 left-0.5 bg-white border border-gray-300 
              rounded-full h-5 w-5 shadow-sm
              transition-all duration-200 ease-in-out
              ${
								checked
									? "translate-x-5 border-blue-600"
									: "translate-x-0 border-gray-300"
							}
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            `}
					/>
				</div>
			</label>
			{label && (
				<label
					htmlFor={id}
					className={`
            text-sm font-medium text-gray-900 select-none
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}>
					{label}
				</label>
			)}
		</div>
	);
}
