import { type PropsWithChildren } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
}

export function Modal({
	open,
	onClose,
	children,
}: PropsWithChildren<ModalProps>) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black opacity-50 transition-opacity"
				onClick={onClose}
			/>
			<div className="relative bg-white rounded-lg shadow-xl min-w-96 mx-4 max-h-screen overflow-y-auto">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
