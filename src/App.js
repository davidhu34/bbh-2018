import React from 'react'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { Responsive } from 'semantic-ui-react'

import Main from './components/Main'

const App = ({ store, history }) => (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>
)

export default hot(module)(App)
