import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon, Header } from 'semantic-ui-react'

const AppBar = () => <div style={{
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
                <Icon inverted size="large" name="bars" />
            </Grid.Column>
            <Grid.Column width={12}>
                <Header inverted as='h3'>Calorima</Header>
            </Grid.Column>
            <Grid.Column width={2}>
                <Icon.Group size='large'>
                    <Icon inverted name='bell outline' />
                    <Icon corner size="mini" color="red" name='circle' />
                </Icon.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
</div>

export default connect(
	({}) => ({}),
    dispatch => ({})
)(AppBar)
