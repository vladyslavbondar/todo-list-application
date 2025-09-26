import clsx from "clsx";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { memo, type RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import {
	type Edge,
	attachClosestEdge,
	extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isShallowEqual, isTaskData, isDraggingATask } from "../../utils";
import type { Task, TaskColumnId } from "../../types";

import { CardContent } from "./card-content";

type TCardState =
	| {
			type: "idle";
	  }
	| {
			type: "is-dragging";
	  }
	| {
			type: "is-dragging-and-left-self";
	  }
	| {
			type: "is-over";
			dragging: DOMRect;
			closestEdge: Edge;
	  }
	| {
			type: "preview";
			container: HTMLElement;
			dragging: DOMRect;
	  };

const idle: TCardState = { type: "idle" };

const innerStyles: { [Key in TCardState["type"]]?: string } = {
	idle: "hover:outline hover:outline-blue-400 cursor-grab",
	"is-dragging": "opacity-40",
};

const outerStyles: { [Key in TCardState["type"]]?: string } = {
	// We no longer render the draggable item after we have left it
	// as it's space will be taken up by a shadow on adjacent items.
	// Using `display:none` rather than returning `null` so we can always
	// return refs from this component.
	// Keeping the refs allows us to continue to receive events during the drag.
	"is-dragging-and-left-self": "hidden",
};

export function CardShadow({ dragging }: { dragging: DOMRect }) {
	return (
		<div
			className="flex-shrink-0 rounded bg-gray-200 border border-gray-300"
			style={{ height: dragging.height }}
		/>
	);
}

export function CardDisplay({
	task,
	state,
	outerRef,
	innerRef,
}: {
	task: Task;
	state: TCardState;
	outerRef?: RefObject<HTMLDivElement | null>;
	innerRef?: RefObject<HTMLDivElement | null>;
}) {
	return (
		<div
			ref={outerRef}
			className={clsx(
				"flex flex-shrink-0 flex-col px-3 py-1",
				outerStyles[state.type]
			)}>
			{/* Put a shadow before the item if closer to the top edge */}
			{state.type === "is-over" && state.closestEdge === "top" ? (
				<CardShadow dragging={state.dragging} />
			) : null}
			<div
				className={clsx(
					"group rounded p-2 text-gray-700 flex flex-row justify-between items-center border shadow-sm gap-2",
					innerStyles[state.type],
					task.completed
						? "bg-green-50 border-green-200"
						: "bg-white border-gray-200"
				)}
				ref={innerRef}
				style={
					state.type === "preview"
						? {
								width: state.dragging.width,
								height: state.dragging.height,
						  }
						: undefined
				}>
				<CardContent task={task} />
			</div>
			{/* Put a shadow after the item if closer to the bottom edge */}
			{state.type === "is-over" && state.closestEdge === "bottom" ? (
				<CardShadow dragging={state.dragging} />
			) : null}
		</div>
	);
}

export const Card = memo(function Card({
	task,
	columnId,
}: {
	task: Task;
	columnId: TaskColumnId;
}) {
	const outerRef = useRef<HTMLDivElement | null>(null);
	const innerRef = useRef<HTMLDivElement | null>(null);
	const [state, setState] = useState<TCardState>(idle);

	useEffect(() => {
		const outer = outerRef.current;
		const inner = innerRef.current;
		invariant(outer && inner);

		return combine(
			draggable({
				element: inner,
				getInitialData: ({ element }) => ({
					task,
					columnId,
					rect: element.getBoundingClientRect(),
				}),
				onGenerateDragPreview({ nativeSetDragImage, location, source }) {
					const data = source.data;
					invariant(isTaskData(data));
					setCustomNativeDragPreview({
						nativeSetDragImage,
						getOffset: preserveOffsetOnSource({
							element: inner,
							input: location.current.input,
						}),
						render({ container }) {
							// Demonstrating using a react portal to generate a preview
							setState({
								type: "preview",
								container,
								dragging: inner.getBoundingClientRect(),
							});
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
				getIsSticky: () => true,
				canDrop: isDraggingATask,
				getData: ({ element, input }) => {
					return attachClosestEdge(
						{ task, columnId },
						{ element, input, allowedEdges: ["top", "bottom"] }
					);
				},
				onDragEnter({ source, self }) {
					if (!isTaskData(source.data)) {
						return;
					}
					if (source.data.task.id === task.id) {
						return;
					}
					const closestEdge = extractClosestEdge(self.data);
					if (!closestEdge) {
						return;
					}

					setState({
						type: "is-over",
						dragging: source.data.rect as DOMRect,
						closestEdge,
					});
				},
				onDrag({ source, self }) {
					if (!isTaskData(source.data)) {
						return;
					}
					if (source.data.task.id === task.id) {
						return;
					}
					const closestEdge = extractClosestEdge(self.data);
					if (!closestEdge) {
						return;
					}
					// optimization - Don't update react state if we don't need to.
					const proposed: TCardState = {
						type: "is-over",
						dragging: source.data.rect as DOMRect,
						closestEdge,
					};
					setState((current) => {
						if (isShallowEqual(proposed, current)) {
							return current;
						}
						return proposed;
					});
				},
				onDragLeave({ source }) {
					if (!isTaskData(source.data)) {
						return;
					}
					if (source.data.task.id === task.id) {
						setState({ type: "is-dragging-and-left-self" });
						return;
					}
					setState(idle);
				},
				onDrop() {
					setState(idle);
				},
			})
		);
	}, [task, columnId]);

	return (
		<>
			<CardDisplay
				outerRef={outerRef}
				innerRef={innerRef}
				state={state}
				task={task}
			/>
			{state.type === "preview"
				? createPortal(
						<CardDisplay state={state} task={task} />,
						state.container
				  )
				: null}
		</>
	);
});
