import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { appColors } from 'shared/config/colors';
import { useAppSelector } from 'shared/store';
import { RepoLinkLoader } from './repoLinksLoader';

export function RepoLinks() {
	const { repo, isLoading } = useAppSelector((state) => state.kanban);

	return (
		<Flex width="100%" flexDirection="row" flexWrap="wrap" gap={['8px', '12px', '16px']}>
			{isLoading ? (
				<RepoLinkLoader />
			) : repo ? (
				<>
					<Flex maxWidth="100%" alignItems="center" flexDirection="row" overflow="hidden" gap="4px">
						<Link
							whiteSpace="nowrap"
							textOverflow="ellipsis"
							overflow="hidden"
							color={appColors.link}
							href={repo.ownerUrl}
							target="_blank"
						>
							{repo.ownerLogin}
						</Link>
						<ChevronRightIcon color={appColors.link} />
						<Link
							whiteSpace="nowrap"
							textOverflow="ellipsis"
							overflow="hidden"
							color={appColors.link}
							href={repo.htmlUrl}
							target="_blank"
						>
							{repo.name}
						</Link>
					</Flex>
					<Flex alignItems="center" flexDirection="row" gap="4px">
						<StarIcon color={appColors.star} />
						<Text>{repo.stargazers_count}</Text>
					</Flex>
				</>
			) : (
				<>
					<Flex maxWidth="100%" alignItems="center" flexDirection="row" overflow="hidden" gap="4px">
						<Text
							whiteSpace="nowrap"
							textOverflow="ellipsis"
							overflow="hidden"
							color={appColors.link}
						>
							Owner Name
						</Text>
						<ChevronRightIcon color={appColors.link} />
						<Text
							whiteSpace="nowrap"
							textOverflow="ellipsis"
							overflow="hidden"
							color={appColors.link}
						>
							Repo Name
						</Text>
					</Flex>
					<Flex alignItems="center" flexDirection="row" gap="4px">
						<StarIcon color={appColors.star} />
						<Text>Stargazers Count</Text>
					</Flex>
				</>
			)}
		</Flex>
	);
}
