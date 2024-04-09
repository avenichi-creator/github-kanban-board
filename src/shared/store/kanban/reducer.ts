import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initKanban } from './thunk';

// import { getIssues, getRepo } from './thunk';

export interface RepoProps {
	id: number;
	name: string;
	htmlUrl: string;
	stargazers_count: number;
	ownerLogin: string;
	ownerUrl: string;
}

export interface IssueProps {
	id: number;
	title: string;
	number: number;
	createdAt: string;
	userLogin: string;
	comments: number;
}

export interface IssueObjectProps {
	todo: IssueProps[];
	progress: IssueProps[];
	done: IssueProps[];
}

interface InitialState {
	issues: IssueObjectProps;
	repo?: RepoProps;
	isLoading: boolean;
	error?: string;
}

const initialState: InitialState = {
	issues: {
		todo: [],
		progress: [],
		done: [],
	},
	repo: undefined,
	isLoading: false,
	error: undefined,
};

const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		setIssues: {
			reducer(state, action: PayloadAction<IssueObjectProps>) {
				state.issues = action.payload;

				if (state.repo)
					localStorage.setItem(
						`${state.repo.id}`,
						JSON.stringify({ issues: action.payload, repo: state.repo }),
					);
			},
			prepare(issues: IssueObjectProps) {
				return { payload: issues };
			},
		},
	},
	extraReducers(builder) {
		builder
			.addCase(initKanban.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(initKanban.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				state.repo = action.payload.repo;
				state.issues = action.payload.issues;
			})
			.addCase(initKanban.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { setIssues } = kanbanSlice.actions;
export default kanbanSlice.reducer;
