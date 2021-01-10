import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger/src';
// eslint-disable-next-line import/named
import { rootReducer } from './rootReducer';
// eslint-disable-next-line import/named
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(sagaMiddleware, logger);
const composedEnhancers = compose(middlewareEnhancer);

export const store = createStore(
	rootReducer,
	composedEnhancers,
);

sagaMiddleware.run(rootSaga);
