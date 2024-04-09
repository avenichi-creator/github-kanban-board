import { ChakraProvider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export function withChakra(child: ReactNode) {
	return <ChakraProvider>{child}</ChakraProvider>;
}
