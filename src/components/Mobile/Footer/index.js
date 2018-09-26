import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'

const Footer = () => (
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
                <Grid.Column>
                    <Icon color={null} size="large" name="home" />
                </Grid.Column>
                <Grid.Column>
                    <Icon size="large" name="food" />
                </Grid.Column>
                <Grid.Column>
                    <Icon size="large" name="camera" />
                </Grid.Column>
                <Grid.Column>
                    <Icon size="large" name="bicycle" />
                </Grid.Column>
                <Grid.Column>
                    <Icon size="large" name="group" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

export default connect(
	state => ({}),
    dispatch => ({})
)(Footer)
