import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Icon } from 'semantic-ui-react'


class FoodDetail extends Component {

    render () {

        const { food } = this.props

        return <Grid padded>
            <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                paddingBottom: 0
            }}>
                {food.desc}
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                {food.calories + ' cal'}
            </Grid.Row>
            <Grid.Row />
        </Grid>
    }
}

export default FoodDetail
