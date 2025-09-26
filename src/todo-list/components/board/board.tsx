import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { Column } from "../column";

import type { TaskColumn } from "../../types";
import {
	isDraggingATask,
	isTaskData,
	isTaskDropTargetData,
	isColumnData,
	isDraggingAColumn,
} from "../../utils";
import { useTodoListContext } from "../../context";

export function Board() {
	const { columns, setColumns, setColumnById, moveTaskBetweenColumns } =
		useTodoListContext();

	const scrollableRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = scrollableRef.current;
		invariant(element);
		return combine(
			monitorForElements({
				canMonitor: isDraggingATask,
				onDrop({ source, location }) {
					const dragging = source.data;
					if (!isTaskData(dragging)) {
						return;
					}

					const innerMost = location.current.dropTargets[0];

					if (!innerMost) {
						return;
					}
					const dropTargetData = innerMost.data;
					const homeColumnIndex = columns.findIndex(
						(column) => column.id === dragging.columnId
					);
					const home: TaskColumn | undefined = columns[homeColumnIndex];

					if (!home) {
						return;
					}
					const cardIndexInHome = home.tasks.findIndex(
						(task) => task.id === dragging.task.id
					);

					// dropping on a card
					if (isTaskDropTargetData(dropTargetData)) {
						const destinationColumnIndex = columns.findIndex(
							(column) => column.id === dropTargetData.columnId
						);
						const destination = columns[destinationColumnIndex];
						// reordering in home column
						if (home === destination) {
							const cardFinishIndex = home.tasks.findIndex(
								(task) => task.id === dropTargetData.task.id
							);

							// could not find cards needed
							if (cardIndexInHome === -1 || cardFinishIndex === -1) {
								return;
							}

							// no change needed
							if (cardIndexInHome === cardFinishIndex) {
								return;
							}

							const closestEdge = extractClosestEdge(dropTargetData);

							const reordered = reorderWithEdge({
								axis: "vertical",
								list: home.tasks,
								startIndex: cardIndexInHome,
								indexOfTarget: cardFinishIndex,
								closestEdgeOfTarget: closestEdge,
							});

							setColumnById(home.id, {
								...home,
								tasks: reordered,
							});
							return;
						}

						// moving card from one column to another

						// unable to find destination
						if (!destination) {
							return;
						}

						const indexOfTarget = destination.tasks.findIndex(
							(task) => task.id === dropTargetData.task.id
						);

						const closestEdge = extractClosestEdge(dropTargetData);
						const finalIndex =
							closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget;

						moveTaskBetweenColumns(
							home.id,
							cardIndexInHome,
							destination.id,
							finalIndex
						);

						return;
					}

					// dropping onto a column, but not onto a card
					if (isColumnData(dropTargetData)) {
						const destinationColumnIndex = columns.findIndex(
							(column) => column.id === dropTargetData.column.id
						);
						const destination = columns[destinationColumnIndex];

						if (!destination) {
							return;
						}

						// dropping on home
						if (home === destination) {
							// move to last position
							const reordered = reorder({
								list: home.tasks,
								startIndex: cardIndexInHome,
								finishIndex: home.tasks.length - 1,
							});

							setColumnById(home.id, {
								...home,
								tasks: reordered,
							});
							return;
						}

						moveTaskBetweenColumns(
							home.id,
							cardIndexInHome,
							destination.id,
							destination.tasks.length
						);
						return;
					}
				},
			}),
			monitorForElements({
				canMonitor: isDraggingAColumn,
				onDrop({ source, location }) {
					const dragging = source.data;
					if (!isColumnData(dragging)) {
						return;
					}

					const innerMost = location.current.dropTargets[0];

					if (!innerMost) {
						return;
					}
					const dropTargetData = innerMost.data;

					if (!isColumnData(dropTargetData)) {
						return;
					}

					const homeIndex = columns.findIndex(
						(column) => column.id === dragging.column.id
					);
					const destinationIndex = columns.findIndex(
						(column) => column.id === dropTargetData.column.id
					);

					if (homeIndex === -1 || destinationIndex === -1) {
						return;
					}

					if (homeIndex === destinationIndex) {
						return;
					}

					const reordered = reorder({
						list: columns,
						startIndex: homeIndex,
						finishIndex: destinationIndex,
					});
					setColumns(reordered);
				},
			}),
			autoScrollForElements({
				canScroll({ source }) {
					return isDraggingATask({ source }) || isDraggingAColumn({ source });
				},
				getConfiguration: () => ({ maxScrollSpeed: "fast" }),
				element,
			})
		);
	}, [columns, setColumns, setColumnById, moveTaskBetweenColumns]);

	return (
		<div className="flex h-[90%] flex-col ">
			<div
				className="p-0.5 flex h-full flex-row gap-3 overflow-x-auto [scrollbar-color:theme(colors.sky.600)_theme(colors.sky.800)] [scrollbar-width:thin]"
				ref={scrollableRef}>
				{columns.map((column) => (
					<Column key={column.id} column={column} />
				))}
			</div>
		</div>
	);
}
