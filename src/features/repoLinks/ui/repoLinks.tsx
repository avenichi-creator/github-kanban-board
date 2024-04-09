import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { appColors } from 'shared/config/colors';
import { useAppSelector } from 'shared/store';
import { RepoLinkLoader } from './repoLinksLoader';

export function RepoLinks() {
	const { repo, isLoading } = useAppSelector((state) => state.kanban);

	return (
		<Flex width="100%" flexDirection="row" gap="24px">
			{isLoading ? (
				<RepoLinkLoader />
			) : repo ? (
				<>
					<Flex alignItems="center" flexDirection="row" gap="4px">
						<Link color={appColors.link} href={repo.ownerUrl}>
							{repo.ownerLogin}
						</Link>
						<ChevronRightIcon color={appColors.link} />
						<Link color={appColors.link} href={repo.htmlUrl}>
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
					<Flex alignItems="center" flexDirection="row" gap="4px">
						<Text color={appColors.link}>Owner Name</Text>
						<ChevronRightIcon color={appColors.link} />
						<Text color={appColors.link}>Repo Name</Text>
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
