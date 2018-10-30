import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call,  select, fork } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'

import { foodFormChange } from '../actions'

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
    yield put({
        type: 'FOOD_LIST_FILTER_END',
        filter: action.filter,
        list: filteredList
    })
}

function* foodEditSubmit(action) {
    yield put({type: 'FOOD_EDIT_SUBMIT_START'})

    const food = yield select( state => state.foodData.data[state.foodUI.viewing] || {})
    const form = action.form
    const time = (new Date()).getTime()
    const newFood = {
        ...food,
        id: food.id || time.toString(),
        time: food.time || time,
        desc: form.DESC,
        calories: form.CALORIES,
        count: form.COUNT,
    }
    yield delay(1)
    yield put({type: 'FOOD_EDIT_SUBMIT_END', food: newFood })
}

function* foodEdit(action) {
    yield put({type: 'FOOD_EDIT_END' })

    const food = yield select( state => state.foodData.data[action.editing] || {})
    yield put(
        foodFormChange({
            DESC: food.desc || '',
            CALORIES: food.calories || '',
            COUNT: food.count || '',
        })
    )
    yield put({type: 'FOOD_EDIT_START', editing: action.editing })
}

export function* foodSaga() {
    yield all([
        takeLatest('FOOD_LIST_FILTER', foodListFilter),
        takeLatest('FOOD_EDIT_SUBMIT', foodEditSubmit),
        takeLatest('FOOD_EDIT', foodEdit)
    ])
}

const sortActivityList = (dataList, sorting) => {
    let newList = dataList.map( a => a.id )
    newList.sort( (a,b) => {
        switch(sortng) {
            case 'TIME':
                return dataList[a].time - dataList[b].time
            case 'PARTICIPATION':
                return dataList[a].participation - dataList[b].participation
            case 'DISTANCE':
            default:
                return 0
        }
    })
    return Promise.resolve(newList)
}

function* activityListSort(action) {

    const sorting = action.sorting
    yield put({type: 'ACTIVITY_LIST_SORT_START', action})

    const dataList = yield select(state => {
        return state.activityData.list.map( key => state.activityData.data[key] )
    })
    const sortedList = yield call(sortActivityList, dataList, sorting)
    console.log(dataList,sortedList,action)
    yield put({
        type: 'ACTIVITY_LIST_SORT_END',
        sorting: action.sorting,
        list: sortedList
    })
}
function* activityEditSubmit(action) {
    yield put({type: 'ACTIVITY_EDIT_SUBMIT_START'})

    const activity = yield select( state => state.activityData.data[state.activityUI.viewing] || {})
    const form = action.form
    const time = (new Date()).getTime()
    const newActivity = {
        ...activity,
        id: activity.id || time.toString(),
        time: form.TIME,
        desc: form.DESC,
        max: form.MAX,
    }
    yield delay(1)
    yield put({type: 'ACTIVITY_EDIT_SUBMIT_END', activity: newActivity })
}

function* activityEdit(action) {
    yield put({type: 'ACTIVITY_EDIT_END' })

    const activity = yield select( state => state.activityData.data[action.editing] || {})
    yield put(
        activityFormChange({
            TIME: form.TIME || '',
            DESC: form.DESC || '',
            MAX: form.MAX || '',
        })
    )
    yield put({type: 'ACTIVITY_EDIT_START', editing: action.editing })
}
export function* activitySaga() {
    yield all([
        takeLatest('ACTIVITY_LIST_SORT', activityListSort),
        takeLatest('ACTIVITY_EDIT_SUBMIT', activityEditSubmit),
        takeLatest('ACTIVITY_EDIT', activityEdit)
    ])
}


export function* cameraSaga() {
    yield all([
    ])
}
export default function* rootSaga() {
    yield all([
        fork(routeSaga),
        fork(cameraSaga),
        fork(foodSaga),
        fork(activitySaga),
    ])
}
