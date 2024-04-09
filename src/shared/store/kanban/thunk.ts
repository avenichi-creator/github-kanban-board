import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from 'shared/config/baseUrl';
import { IssueObjectProps, RepoProps } from './reducer';

interface UserPayload {
	login: string;
	html_url: string;
}

export interface IssuePayload {
	assignee: UserPayload | null;
	created_at: string;
	id: number;
	number: number;
	state: 'open' | 'closed';
	title: string;
	user: UserPayload;
	comments: number;
}

export interface RepoPayload {
	id: number;
	name: string;
	html_url: string;
	stargazers_count: number;
	owner: UserPayload;
}

const fetchIssues = async (url: string): Promise<IssuePayload[]> => {
	return fetch(url, {
		method: 'GET',
	}).then((data) => {
		if (data.ok) return data.json();
		else return [];
	});
};

const fetchRepo = async (url: string): Promise<RepoPayload> => {
	return fetch(url, {
		method: 'GET',
	}).then((data) => {
		if (data.ok) return data.json();
		else return undefined;
	});
};

export const initKanban = createAsyncThunk(
	'kanban/init',
	async (url: string): Promise<{ issues: IssueObjectProps; repo: RepoProps }> => {
		const urlSplit = url.split('/');

		const repoResponse = await fetchRepo(`${baseUrl}/${urlSplit[3]}/${urlSplit[4]}`);

		const repoResult: RepoProps = {
			id: repoResponse.id,
			name: repoResponse.name,
			stargazers_count: repoResponse.stargazers_count,
			htmlUrl: repoResponse.html_url,
			ownerLogin: repoResponse.owner.login,
			ownerUrl: repoResponse.owner.html_url,
		};

		const localStorageData = localStorage.getItem(`${repoResult.id}`);

		if (localStorageData) {
			return { ...(JSON.parse(localStorageData) as { issues: IssueObjectProps; repo: RepoProps }) };
		}

		const issuesResponse = await fetchIssues(
			`${baseUrl}/${urlSplit[3]}/${urlSplit[4]}/issues?state=all`,
		);

		const issuesResult: IssueObjectProps = {
			todo: [],
			progress: [],
			done: [],
		};

		for (const item of issuesResponse) {
			const itemState =
				item.state === 'open' && item.assignee === null
					? 'todo'
					: item.state === 'open' && item.assignee !== null
						? 'progress'
						: 'done';

			issuesResult[itemState].push({
				id: item.id,
				title: item.title,
				number: item.number,
				createdAt: item.created_at,
				userLogin: item.user.login,
				comments: item.comments,
			});
		}

		return {
			issues: issuesResult,
			repo: repoResult,
		};
	},
);
