import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
// import { routerReducer } from 'react-router-redux'

import { foodData, foodUI, foodCameraUI } from './food'
import { exerciseData, exerciseUI } from './exercise'
import { activityData, activityUI } from './activity'
import { modal } from './modal'
import { route } from './route'
import { profile } from './profile'

const reducer = combineReducers({
    foodData,
    foodUI,
    exerciseData,
    exerciseUI,
    foodCameraUI,
    activityData,
    activityUI,
    profile,
    modal,
    route,
})

export default reducer
