import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Skeleton,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { appColors } from 'shared/config/colors';

export function ColumnLoader() {
	return (
		<Flex
			flexDirection="column"
			flexGrow="1"
			gap="12px"
			padding={['8px', '8px', '8px', '12px']}
			background={appColors.issueColumn}
			borderRadius="5px"
		>
			<Card
				size="sm"
				padding={['10px', '10px', '12px', '16px']}
				borderWidth="2px"
				borderStyle="solid"
				borderLeft="none"
				borderTop="none"
				borderRight="none"
				borderColor="gray"
				boxShadow="0 0 5px #00000033"
			>
				<CardHeader padding="unset" paddingBottom={['8px', '8px', '10px', '12px']}>
					<Skeleton>
						<Heading size="md">Skeleton heading</Heading>
					</Skeleton>
				</CardHeader>
				<CardBody padding="unset" paddingBottom={['8px', '8px', '10px', '12px']}>
					<Skeleton>
						<Text>Skeleton text</Text>
					</Skeleton>
				</CardBody>
				<CardFooter padding="unset">
					<Skeleton>
						<Text>Skeleton text</Text>
					</Skeleton>
				</CardFooter>
			</Card>
		</Flex>
	);
}
