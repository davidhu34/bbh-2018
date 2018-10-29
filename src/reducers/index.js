import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
// import { routerReducer } from 'react-router-redux'

import { foodData, foodUI, foodCameraUI } from './food'
const reducer = combineReducers({
    foodData,
    foodUI,
    foodCameraUI,
})

export default reducer
