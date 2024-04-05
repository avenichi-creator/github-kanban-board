import compose from 'compose-function';
import React from 'react';
import { withStore } from './with-store';

export const withProviders = compose(withStore);
