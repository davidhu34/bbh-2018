import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Icon } from 'semantic-ui-react'


class ActivityDetail extends Component {

    render () {

        const { activity } = this.props

        return <Grid padded>
            <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                paddingBottom: 0
            }}>
                {'some'}
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                {'activity'}
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                {'detial'}
            </Grid.Row>
            <Grid.Row />
        </Grid>
    }
}

export default ActivityDetail
