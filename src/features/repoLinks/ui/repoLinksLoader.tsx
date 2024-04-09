import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { appColors } from 'shared/config/colors';

export function RepoLinkLoader() {
	return (
		<Flex width="100%" flexDirection="row" gap="24px">
			<Flex alignItems="center" direction="row" gap="4px">
				<Skeleton>
					<Text>Skeleton text</Text>
				</Skeleton>
				<ChevronRightIcon color={appColors.link} />
				<Skeleton>
					<Text>Skeleton text</Text>
				</Skeleton>
			</Flex>
			<Flex alignItems="center" flexDirection="row" gap="4px">
				<StarIcon color={appColors.star} />
				<Skeleton>
					<Text>Skeleton text</Text>
				</Skeleton>
			</Flex>
		</Flex>
	);
}
