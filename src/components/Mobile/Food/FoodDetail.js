import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Icon } from 'semantic-ui-react'

import ImageContainer from '../../ImageContainer'

class FoodDetail extends Component {

    render () {

        const { food } = this.props

        return <Grid padded textAlign="center">
            <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                paddingBottom: 0
            }}>
                { food.imageSource && food.imageSource.length > 6
                    ? <ImageContainer standalone
                    width={window.innerWidth/2}
                    height={window.innerWidth/2}
                    src={food.imageSource}
                    />
                    : <Icon bordered color={'teal'} size={'huge'} name={'food'} />
                }
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0 }}>
                <b>{food.desc}</b>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0 }}>
                <Grid.Column textAlign="right" width={8}>
                    {food.count}
                </Grid.Column>
                <Grid.Column textAlign="left" width={8}>
                    {food.calories+'cal'}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row />
        </Grid>
    }
}

export default FoodDetail
