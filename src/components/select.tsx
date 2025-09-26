import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon, CheckIcon } from "../icons";

export interface SelectOption {
	value: string | number;
	label: string;
}

export interface SelectProps {
	options: SelectOption[];
	value?: string | number;
	onChange?: (value: string | number) => void;
	placeholder?: string;
	size?: "xs" | "md";
}

const sizeClasses = {
	xs: {
		button: "py-1 px-2 text-xs",
		option: "px-2 py-1 text-xs",
	},
	md: {
		button: "py-2 px-3 text-sm",
		option: "px-3 py-2 text-sm",
	},
};

export function Select({
	options,
	value,
	onChange,
	placeholder,
	size = "md",
}: SelectProps) {
	const selectedOption = options.find((option) => option.value === value);
	const sizeClass = sizeClasses[size];

	return (
		<div className="relative">
			<Listbox value={value} onChange={onChange}>
				<ListboxButton
					className={clsx(
						"relative w-full rounded-lg border bg-white text-left shadow-sm transition-colors",
						"focus:outline-none focus:ring-offset-2",
						sizeClass.button,
						"border-gray-300 text-gray-900",
						"pr-8"
					)}>
					<span className="block truncate">
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<ChevronDownIcon />
					</span>
				</ListboxButton>

				<ListboxOptions
					anchor="bottom start"
					transition
					className={clsx(
						"z-10 max-h-60 w-[var(--button-width)] overflow-auto rounded-lg bg-white shadow-lg border border-gray-200 py-1",
						"focus:outline-none",
						"transition duration-100 ease-in data-leave:data-closed:opacity-0 data-leave:data-closed:scale-95"
					)}>
					{options.map((option) => (
						<ListboxOption
							key={option.value}
							value={option.value}
							className={({ focus, selected }) =>
								clsx(
									"relative cursor-default select-none transition-colors",
									sizeClass.option,
									focus ? "bg-blue-50 text-blue-700" : "text-gray-700",
									selected && "font-medium"
								)
							}>
							{({ selected }) => (
								<div className="flex items-center justify-between">
									<span
										className={clsx(
											"block truncate",
											selected && "font-medium"
										)}>
										{option.label}
									</span>
									{selected && <CheckIcon />}
								</div>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Listbox>
		</div>
	);
}
