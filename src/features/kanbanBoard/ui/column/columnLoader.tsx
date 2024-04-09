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

export function ColumnLoader() {
	return (
		<Flex flexDirection="column" flexGrow="1" gap="12px" padding="12px">
			<Card size="sm">
				<CardHeader>
					<Skeleton>
						<Heading size="md">Skeleton heading</Heading>
					</Skeleton>
				</CardHeader>
				<CardBody>
					<Skeleton>
						<Text>Skeleton text</Text>
					</Skeleton>
				</CardBody>
				<CardFooter>
					<Skeleton>
						<Text>Skeleton text</Text>
					</Skeleton>
				</CardFooter>
			</Card>
		</Flex>
	);
}
