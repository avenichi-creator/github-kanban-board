import {
	CardBody,
	CardFooter,
	CardHeader,
	Card as ChakraCard,
	Heading,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { appColors } from 'shared/config/colors';

export type IssueState = 'todo' | 'progress' | 'done';

export interface IssueCardProps {
	id: number;
	index: number;
	title: string;
	number: number;
	createdAt: string;
	userLogin: string;
	comments: number;
	state: IssueState;
}

export function IssueCard(props: IssueCardProps) {
	const { id, index, title, number, createdAt, userLogin, comments, state } = props;

	const calculatedDate =
		(new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 3600 * 24);

	const color =
		state === 'todo'
			? appColors.todoIssue
			: state === 'progress'
				? appColors.progressIssue
				: appColors.doneIssue;

	return (
		<Draggable draggableId={`${id}`} index={index}>
			{(provided, snapshot) => (
				<ChakraCard
					ref={provided.innerRef}
					size="sm"
					padding={['10px', '10px', '12px', '16px']}
					borderWidth="2px"
					borderStyle="solid"
					borderLeft="none"
					borderTop="none"
					borderRight="none"
					borderColor={snapshot.isDragging ? appColors.issueDrag : color}
					boxShadow={snapshot.isDragging ? '0 5px 10px #00000033' : '0 0 5px #00000033'}
					overflow="hidden"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<CardHeader padding="unset" paddingBottom={['8px', '8px', '10px', '12px']}>
						<Heading size="md">{title}</Heading>
					</CardHeader>
					<CardBody padding="unset" paddingBottom={['8px', '8px', '10px', '12px']}>
						<Text>
							#{number} opened{' '}
							{calculatedDate > 365
								? `${Math.ceil(calculatedDate / 365)} years ago`
								: calculatedDate > 30
									? `${Math.ceil(calculatedDate / 30)} months ago`
									: `${Math.ceil(calculatedDate)} days ago`}
						</Text>
					</CardBody>
					<CardFooter padding="unset">
						<Text>
							{userLogin} | Comments: {comments}
						</Text>
					</CardFooter>
				</ChakraCard>
			)}
		</Draggable>
	);
}
