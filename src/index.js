import React from 'react'
import { render } from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import rootSaga from './sagas'
import { freshStore } from './configureStore'

import App from './App'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const store = freshStore(history, sagaMiddleware)
sagaMiddleware.run(rootSaga)

render(
    <App store={store} history={history} />,
    document.getElementById('root')
)
