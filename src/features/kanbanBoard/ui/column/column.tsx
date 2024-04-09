import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { appColors } from 'shared/config/colors';
import { useAppSelector } from 'shared/store';
import { IssueProps } from 'shared/store/kanban/reducer';
import { IssueCard, IssueState } from '../card/card';
import { ColumnLoader } from './columnLoader';

interface ColumnProps {
	title: string;
	items: IssueProps[];
	type: IssueState;
}

export function Column(props: ColumnProps) {
	const { title, items, type } = props;

	const { isLoading } = useAppSelector((state) => state.kanban);

	return (
		<Droppable droppableId={type}>
			{(provided) => (
				<Flex
					ref={provided.innerRef}
					flexDirection="column"
					as="section"
					width="400px"
					gap="16px"
					margin="0px"
					{...provided.droppableProps}
				>
					<Heading as="h2" size="lg" textAlign="center">
						{title}
					</Heading>
					<Flex
						flexDirection="column"
						flexGrow="1"
						gap="12px"
						padding="12px"
						background={appColors.issueColumn}
						borderRadius="5px"
					>
						{isLoading ? (
							<ColumnLoader />
						) : (
							items.map((item, index) => (
								<IssueCard key={item.id} index={index} state={type} {...item} />
							))
						)}
					</Flex>
					{provided.placeholder}
				</Flex>
			)}
		</Droppable>
	);
}
