import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
// import { routerReducer } from 'react-router-redux'

import { foodData, foodUI, foodCameraUI } from './food'
import { activityData, activityUI } from './activity'

const reducer = combineReducers({
    foodData,
    foodUI,
    foodCameraUI,
    activityData,
    activityUI,
})

export default reducer
