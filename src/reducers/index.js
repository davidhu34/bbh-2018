import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
// import { routerReducer } from 'react-router-redux'

import { foodData, foodUI } from './food'
const reducer = combineReducers({
    foodData,
    foodUI,
})

export default reducer
