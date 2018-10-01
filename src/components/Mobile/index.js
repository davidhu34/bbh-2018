import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { Button } from 'semantic-ui-react'

import { pushRoute } from '../../actions'
import AppBar from './AppBar'
import Home from './Home'
import Food from './Food'
import Temp from './Temp'
import Profile from './Profile'
import Footer from './Footer'

const Mobile = ({
    router,
    pushRoute
}) => (
    <div style={{
        backgroundColor: 'white',
        color: 'slategray',
        position: 'fixed',
        width: '100%',
        height: '100%',
        paddingTop: '3rem'
    }}>
        <AppBar />
        <Route exact path="/" component={Home} />
        <Route path="/food" component={Food} />
        <Route path="/temp" component={Temp} />

        <Footer />
    </div>
)

export default withRouter(connect(
	({ router }) => ({ router }),
    dispatch => ({
        pushRoute: (route) => dispatch(pushRoute(route))
    })
)(Mobile))
