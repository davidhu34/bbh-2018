import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon, Header } from 'semantic-ui-react'

import { noNotice, showProfile } from '../../../actions'

const AppBar = ({ noNotice, showProfile }) => <div style={{
        backgroundColor: 'aquamarine',
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '3rem'
    }}>
    <Grid padded
        textAlign={'center'}
        verticalAlign={'middle'}>
        <Grid.Row>
            <Grid.Column width={2}>
                <Icon inverted size="large" name="user outline"
                    onClick={(e) => showProfile()} />
            </Grid.Column>
            <Grid.Column width={12}>
                <Header inverted as='h3'>卡路里長伯</Header>
            </Grid.Column>
            <Grid.Column width={2}>
                <Icon.Group size='large' onClick={(e) => noNotice()}>
                    <Icon inverted name='bell outline' />
                </Icon.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
</div>

export default connect(
	({}) => ({}),
    dispatch => ({
        noNotice: () => dispatch(noNotice()),
        showProfile: () => dispatch(showProfile()),
    })
)(AppBar)
