import React, { Component } from 'react'
import { connect } from 'react-redux'

import Camera from './Camera'
import FoodList from './FoodList'

import { cameraSnapshot } from '../../../actions'

class FoodCamera extends Component {
    render () {
        const { foodCameraUI } = this.props
        const insightDataList = foodCameraUI.insights.map( insight => ({
            desc: insight.food_name,
            calories: insight.calories,
            score: insight.score,
        }))

        return <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 0
        }}>
            <Camera
                width={window.innerWidth}
                height={window.innerWidth}
                displaySnapshot={this.props.cameraSnapshot}
            />
            <React.Fragment>
                <FoodList style={{
                    paddingTop: window.innerWidth
                }}
                    foodDataList={insightDataList}
                    selectFood={() => {}}
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
    })
)(FoodCamera)
