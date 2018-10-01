import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'

import { pushRoute } from '../../../actions'

const Footer = ({
    pushRoute
}) => (
    <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '4rem',
        backgroundColor: 'white',
        borderTop: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'lightgray',
    }}>
        <Grid columns={5}
            padded
            relaxed
            textAlign={'center'}
            verticalAlign={'middle'}>
            <Grid.Row>
                <Grid.Column onClick={() => pushRoute('/')}>
                    <Icon color={null} size="large" name="home" />
                </Grid.Column>
                <Grid.Column onClick={() => pushRoute('/food')}>
                    <Icon size="large" name="food" />
                </Grid.Column>
                <Grid.Column onClick={() => pushRoute('/temp')}>
                    <Icon size="large" name="camera" />
                </Grid.Column>
                <Grid.Column onClick={() => pushRoute('/')}>
                    <Icon size="large" name="bicycle" />
                </Grid.Column>
                <Grid.Column onClick={() => pushRoute('/')}>
                    <Icon size="large" name="group" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

export default connect(
	state => ({}),
    dispatch => ({
        pushRoute: (route) => dispatch(pushRoute(route))
    })
)(Footer)
