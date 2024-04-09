import { Flex } from '@chakra-ui/react';
import React from 'react';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'shared/store';
import { IssueObjectProps, setIssues } from 'shared/store/kanban/reducer';
import { Column } from './column/column';

export const reorderIssues = (
	issues: IssueObjectProps,
	source: DraggableLocation,
	destination: DraggableLocation,
): any => {
	const sourceIssues = [...(issues as any)[source.droppableId]];
	const destinationIssues = [...(issues as any)[destination.droppableId]];
	const draggableIssue = { ...sourceIssues.splice(source.index, 1)[0] };

	if (source.droppableId === destination.droppableId) {
		sourceIssues.splice(destination.index, 0, draggableIssue);

		return { ...issues, [source.droppableId]: sourceIssues };
	} else {
		draggableIssue.state = destination.droppableId;
		destinationIssues.splice(destination.index, 0, draggableIssue);

		const result = {
			...issues,
			[source.droppableId]: sourceIssues,
			[destination.droppableId]: destinationIssues,
		};

		return result;
	}
};

export function KanbanBoard() {
	const { issues } = useAppSelector((state) => state.kanban);

	const dispatch = useAppDispatch();

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		dispatch(setIssues(reorderIssues(issues, source, destination)));
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Flex
				flexGrow="1"
				direction={['column', 'row']}
				justifyContent={['flex-start', 'flex-start', 'space-evenly']}
				alignItems={['center', 'unset']}
				gap={['32px', '16px', '16px', '32px']}
				width="100%"
			>
				<Column title="ToDo" items={issues.todo} type="todo" />
				<Column title="In Progress" items={issues.progress} type="progress" />
				<Column title="Done" items={issues.done} type="done" />
			</Flex>
		</DragDropContext>
	);
}

export * from './card/card';
export * from './column/column';
