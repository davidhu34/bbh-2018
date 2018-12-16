import React, { Component } from 'react'
import { connect } from 'react-redux'

import Camera from './Camera'
import FoodList from './FoodList'

import { cameraSnapshot, foodPhotoSubmit } from '../../../actions'

class FoodCamera extends Component {
    state = {}
    render () {
        const { foodCameraUI, selectFood } = this.props
        const {log} = this.state
        const insightDataList = foodCameraUI.insights

        return <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 0
        }}>
            <Camera log={ (log) => this.setState({ log }) }
                width={window.innerWidth}
                height={window.innerWidth}
                displaySnapshot={this.props.cameraSnapshot}
            />
            <React.Fragment>
                <FoodList style={{
                    paddingTop: window.innerWidth
                }}
                    foodDataList={insightDataList}
                    selectFood={ (food) => selectFood(food) }

                />
            </React.Fragment>


        </div>
    }
}
export default connect(
    ({ foodData, foodCameraUI }) => ({
        foodData, foodCameraUI
    }),
    dispatch => ({
        cameraSnapshot: (insights) => dispatch(cameraSnapshot(insights)),
        selectFood: food => dispatch(foodPhotoSubmit(food))
    })
)(FoodCamera)
