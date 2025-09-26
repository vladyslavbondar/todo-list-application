import { type PropsWithChildren } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

/* 
Leave comment to explain descision behind using HEadles ui library
*/

interface DropDownMenuProps {
	title: string | React.ReactNode;
}

export function DropDownMenu({
	children,
	title,
}: PropsWithChildren<DropDownMenuProps>) {
	return (
		<Menu>
			<MenuButton className="inline-flex items-center gap-2 rounded-md bg-white border border-gray-300 px-1 py-1 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-hover:bg-gray-50 data-open:bg-gray-100">
				{title}
			</MenuButton>
			<MenuItems
				transition
				anchor="bottom end"
				className="w-52 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg p-1 text-sm/6 text-gray-700 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
				{children}
			</MenuItems>
		</Menu>
	);
}

export function DropDownMenuItem({
	children,
	onClick,
}: PropsWithChildren<{ onClick?: () => void }>) {
	return (
		<MenuItem>
			<button
				onClick={onClick}
				className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 data-focus:bg-blue-50 data-focus:text-blue-700">
				{children}
			</button>
		</MenuItem>
	);
}
