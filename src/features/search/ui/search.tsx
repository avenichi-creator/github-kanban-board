import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useAppDispatch } from 'shared/store';
import { initKanban } from 'shared/store/kanban/thunk';

export function Search() {
	const dispatch = useAppDispatch();

	const [link, setLink] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (!inputRef.current) return;

		!inputRef.current.validity.patternMismatch && dispatch(initKanban(link));
	};

	return (
		<Flex gap="8px">
			<Input
				ref={inputRef}
				pattern="^https://github.com/.+/.+"
				onInput={(e) => setLink((e.target as HTMLInputElement).value)}
				placeholder="https://api.github.com/owner/repo"
			/>
			<Button onClick={handleClick}>Load Issues</Button>
		</Flex>
	);
}
