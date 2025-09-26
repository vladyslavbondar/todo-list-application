import React from "react";

export const RadioButton = ({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<label className="relative inline-flex items-center cursor-pointer transition-opacity duration-200">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="peer sr-only"
			/>

			<div
				className={`
          w-6 h-6 rounded-full border-2 border-gray-300 bg-white
          flex items-center justify-center
          transition-all duration-200
          peer-checked:bg-green-600
        `}>
				<div
					className={`
            w-2.5 h-2.5 rounded-full bg-white
            opacity-0 scale-0 transition-all duration-200
            peer-checked:opacity-100 peer-checked:scale-100
          `}
				/>
			</div>
		</label>
	);
};
