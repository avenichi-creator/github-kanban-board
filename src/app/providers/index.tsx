import compose from 'compose-function';
import React from 'react';
import { withChakra } from './with-chakra';
import { withStore } from './with-store';

export const withProviders = compose(withChakra, withStore);
