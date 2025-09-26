import clsx from "clsx";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { Card, CardShadow } from "../card/card";
import {
	isDraggingATask,
	isTaskData,
	isTaskDropTargetData,
	isDraggingAColumn,
	isColumnData,
	isShallowEqual,
} from "../../utils";
import type { Task, TaskColumn, TaskColumnId } from "../../types";
import { ColumnHeader } from "./components/column-header";

type TColumnState =
	| {
			type: "is-card-over";
			isOverChildCard: boolean;
			dragging: DOMRect;
	  }
	| {
			type: "is-column-over";
	  }
	| {
			type: "idle";
	  }
	| {
			type: "is-dragging";
	  };

type TaskData = {
	task: Task;
	columnId: TaskColumnId;
	rect: DOMRect;
};

const stateStyles: { [Key in TColumnState["type"]]: string } = {
	idle: "cursor-grab",
	"is-card-over": "outline outline-2 outline-blue-400",
	"is-dragging": "opacity-40",
	"is-column-over": "bg-gray-200",
};

const idle = { type: "idle" } satisfies TColumnState;

const CardList = memo(({ column }: { column: TaskColumn }) => {
	return column.tasks.map((task) => (
		<Card key={task.id} task={task} columnId={column.id} />
	));
});

export const Column = memo(({ column }: { column: TaskColumn }) => {
	const scrollableRef = useRef<HTMLDivElement | null>(null);
	const outerFullHeightRef = useRef<HTMLDivElement | null>(null);
	const headerRef = useRef<HTMLDivElement | null>(null);
	const innerRef = useRef<HTMLDivElement | null>(null);
	const [state, setState] = useState<TColumnState>(idle);

	useEffect(() => {
		const outer = outerFullHeightRef.current;
		const scrollable = scrollableRef.current;
		const header = headerRef.current;
		const inner = innerRef.current;
		invariant(outer);
		invariant(scrollable);
		invariant(header);
		invariant(inner);

		function setIsCardOver({
			data,
			location,
		}: {
			data: TaskData;
			location: DragLocationHistory;
		}) {
			const innerMost = location.current.dropTargets[0];
			const isOverChildCard = Boolean(
				innerMost && isTaskDropTargetData(innerMost.data)
			);

			const proposed: TColumnState = {
				type: "is-card-over",
				dragging: data.rect,
				isOverChildCard,
			};
			// optimization - don't update state if we don't need to.
			setState((current) => {
				if (isShallowEqual(proposed, current)) {
					return current;
				}
				return proposed;
			});
		}

		return combine(
			draggable({
				element: header,
				getInitialData: () => ({
					column,
				}),
				onGenerateDragPreview({ source, location, nativeSetDragImage }) {
					const data = source.data;
					invariant(isColumnData(data));
					setCustomNativeDragPreview({
						nativeSetDragImage,
						getOffset: preserveOffsetOnSource({
							element: header,
							input: location.current.input,
						}),
						render({ container }) {
							// Simple drag preview generation: just cloning the current element.
							// Not using react for this.
							const rect = inner.getBoundingClientRect();
							const preview = inner.cloneNode(true);
							invariant(preview instanceof HTMLElement);
							preview.style.width = `${rect.width}px`;
							preview.style.height = `${rect.height}px`;

							container.appendChild(preview);
						},
					});
				},
				onDragStart() {
					setState({ type: "is-dragging" });
				},
				onDrop() {
					setState(idle);
				},
			}),
			dropTargetForElements({
				element: outer,
				getData: () => ({
					column,
				}),
				canDrop: ({ source }) =>
					isDraggingATask({ source }) || isDraggingAColumn({ source }),
				getIsSticky: () => true,
				onDragStart({ source, location }) {
					if (isTaskData(source.data)) {
						setIsCardOver({ data: source.data, location });
					}
				},
				onDragEnter({ source, location }) {
					if (isTaskData(source.data)) {
						setIsCardOver({ data: source.data, location });
						return;
					}
					if (
						isColumnData(source.data) &&
						source.data.column.id !== column.id
					) {
						setState({ type: "is-column-over" });
					}
				},
				onDropTargetChange({ source, location }) {
					if (isTaskData(source.data)) {
						setIsCardOver({ data: source.data, location });
						return;
					}
				},
				onDragLeave({ source }) {
					if (
						isColumnData(source.data) &&
						source.data.column.id === column.id
					) {
						return;
					}
					setState(idle);
				},
				onDrop() {
					setState(idle);
				},
			}),
			autoScrollForElements({
				canScroll({ source }) {
					return isDraggingATask({ source });
				},
				getConfiguration: () => ({
					maxScrollSpeed: "fast",
				}),
				element: scrollable,
			})
		);
	}, [column]);

	return (
		<div
			className="flex w-80 flex-shrink-0 select-none flex-col"
			ref={outerFullHeightRef}>
			<div
				className={clsx(
					"flex max-h-full flex-col rounded-lg border-gray-200 shadow-sm text-gray-900",
					state.type !== "is-column-over" && "bg-white border",
					stateStyles[state.type]
				)}
				ref={innerRef}>
				<div
					className={clsx(
						"flex max-h-full flex-col transition-opacity duration-200",
						state.type === "is-column-over" ? "opacity-0" : "opacity-100"
					)}>
					<div
						className="group flex flex-row items-center p-3 pb-2"
						ref={headerRef}>
						<ColumnHeader column={column} />
					</div>
					<div
						className="flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.gray.400)_theme(colors.gray.100)] [scrollbar-width:thin]"
						ref={scrollableRef}>
						<CardList column={column} />
						{state.type === "is-card-over" && !state.isOverChildCard ? (
							<div className="flex-shrink-0 px-3 py-1">
								<CardShadow dragging={state.dragging} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
});
