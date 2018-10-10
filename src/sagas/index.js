import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call,  select, fork } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'

import { foodEditEnd } from '../actions'

export function* changeRoute(action) {
    yield put({type: 'CHANGE_ROUTE_START'})
    yield delay(1)
    yield put(push(action.route))
}

export function* routeSaga() {
    yield takeEvery('CHANGE_ROUTE', changeRoute)
}


const filterFoodList = (dataList, filter) => {
    let idList = []
    dataList.map( food => {
        if (food.category == filter) idList.push(food.id)
    })
    return Promise.resolve(idList)
}
function* foodListFilter(action) {

    const filter = action.filter
    yield put({type: 'FOOD_LIST_FILTER_START', action})

    const dataList = yield select(state => {
        return state.foodData.list.map( key => state.foodData.data[key] )
    })
    const filteredList = yield call(filterFoodList, dataList, filter)
    console.log(dataList,filteredList, action)
    yield put({type: 'FOOD_LIST_FILTER_END',
        filter: action.filter,
        list: filteredList
    })
}

function* foodEditSubmit(action) {
    yield put({type: 'FOOD_EDIT_SUBMIT_START'})
    yield delay(1)
    yield put({type: 'FOOD_EDIT_SUBMIT_END', food: action.food })
}

function* foodEdit(action) {
    yield put({type: 'FOOD_EDIT_END' })
    yield put({type: 'FOOD_EDIT_START', editing: action.editing })
}

export function* foodSaga() {
    yield all([
        takeLatest('FOOD_LIST_FILTER', foodListFilter),
        takeLatest('FOOD_EDIT_SUBMIT', foodEditSubmit),
        takeLatest('FOOD_EDIT', foodEdit)
    ])
}
export default function* rootSaga() {
    yield all([
        fork(routeSaga),
        fork(foodSaga),
    ])
}
