import { IssueObjectProps } from 'shared/store/kanban/reducer';
import { reorderIssues } from '../ui/kanbanBoard';

const mockIssues: IssueObjectProps = {
	todo: [
		{
			id: 1,
			title: 'test1',
			number: 1,
			comments: 0,
			createdAt: new Date().toString(),
			userLogin: 'testlogin1',
		},
	],
	progress: [
		{
			id: 2,
			title: 'test2',
			number: 2,
			comments: 0,
			createdAt: new Date().toString(),
			userLogin: 'testlogin2',
		},
	],
	done: [],
};

it('Amount of drag and drop elements remains same (different columns)', () => {
	const issuesAmountBefore = Object.values(mockIssues).flat().length;

	const issuesAmountAfter = Object.values(
		reorderIssues(
			mockIssues,
			{ index: 0, droppableId: 'todo' },
			{ index: 0, droppableId: 'progress' },
		),
	).flat().length;

	expect(issuesAmountBefore).toEqual(issuesAmountAfter);
});

it('Amount of drag and drop elements remains same (same column)', () => {
	const issuesAmountBefore = Object.values(mockIssues).flat().length;

	const issuesAmountAfter = Object.values(
		reorderIssues(mockIssues, { index: 0, droppableId: 'todo' }, { index: 0, droppableId: 'todo' }),
	).flat().length;

	expect(issuesAmountBefore).toEqual(issuesAmountAfter);
});

it('Amount of drag and drop elements remains same (to empty column)', () => {
	const issuesAmountBefore = Object.values(mockIssues).flat().length;

	const issuesAmountAfter = Object.values(
		reorderIssues(mockIssues, { index: 0, droppableId: 'todo' }, { index: 0, droppableId: 'done' }),
	).flat().length;

	expect(issuesAmountBefore).toEqual(issuesAmountAfter);
});
