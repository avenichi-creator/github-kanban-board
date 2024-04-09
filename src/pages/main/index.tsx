import { Flex } from '@chakra-ui/react';
import React from 'react';
import { KanbanBoard } from 'features/kanbanBoard';
import { RepoLinks } from 'features/repoLinks';
import { Search } from 'features/search';

export function MainPage() {
	return (
		<Flex flexDirection="column" gap="16px" minHeight="100vh" width="100%" padding="32px 24px">
			<Search />
			<RepoLinks />
			<KanbanBoard />
		</Flex>
	);
}
