import { put, take, takeEvery, takeLatest, all, call,  select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'connected-react-router'

import { getDateId } from '../utils'

import {
    launchModal,
    launchFormError,
    closeModal,
    launchLoader,
    closeLoader,
    foodFormChange,
    foodView
} from '../actions'

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
    yield put({
        type: 'FOOD_LIST_FILTER_END',
        filter: action.filter,
        list: filteredList
    })
}

function* foodEditSubmit(action) {
    yield put({type: 'FOOD_EDIT_SUBMIT_START'})
    yield put(launchLoader())

    const food = yield select( state => state.foodData.data[state.foodUI.viewing] || {})
    const form = action.form
    const { DESC, CALORIES, COUNT } = form

    let newFood = null
    
    if (!DESC) {
        yield put(launchFormError('請輸入說明~'))
    } else if (DESC.length > 10) {
        yield put(launchFormError('說明不要超過10個字拜託'))
    } else if (!CALORIES || isNaN(CALORIES)) {
        yield put(launchFormError('卡路里要輸入數字~'))
    } else if (CALORIES.toString().length > 5) {
        yield put(launchFormError('卡路里超過五位數了'))
    } else if (!COUNT || isNaN(COUNT)) {
        yield put(launchFormError('要輸入份量數量'))
    } else if (COUNT.toString().length > 2) {
        yield put(launchFormError('哪有吃到一百份的'))
    } else {
        const time = (new Date()).getTime()
        newFood = {
            ...food,
            id: food.id || time.toString(),
            time: food.time || time,
            desc: DESC,
            calories: CALORIES,
            count: COUNT,
        }
        yield delay(1000)
    }

    yield put({type: 'FOOD_EDIT_SUBMIT_END', food: newFood })
    yield put(closeLoader())
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

function* foodPhotoSubmit(action) {
    yield put({type: 'FOOD_PHOTO_SUBMIT_START'})
    yield put(launchLoader())

    const time = (new Date()).getTime()
    const { desc, calories, count } = action
    const newFood = {
        id: time.toString(),
        time: time,
        desc, calories, count
    }
    yield delay(1000)
    yield put({type: 'FOOD_PHOTO_SUBMIT_END', food: newFood })
    yield put(push('/food'))
    yield put(foodView(newFood.id))
    yield put(closeLoader())
}

const getFoodDateList = (state, dateId) => state.foodData.dateList[dateId] || []

function* foodTimeChange(action) {
    yield put({type: 'FOOD_TIME_CHANGE_START'})
    yield put(launchLoader())

    const date = action.date
    const dateId = getDateId(date)
    const newList = yield select(state => getFoodDateList(state, dateId))

    const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
    const prevDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
    const nextDayList = yield select(state => getFoodDateList(state,getDateId(nextDay)))
    const prevDayList = yield select(state => getFoodDateList(state,getDateId(prevDay)))

    yield put({
        type: 'FOOD_TIME_CHANGE_END',
        dateTime: action.date.getTime(),
        dateId,
        hasNextDay: nextDayList.length,
        hasPrevDay: prevDayList.length,
        list: newList
    })
    yield put(closeLoader())
}

export default function* foodSaga() {
    yield all([
        takeLatest('FOOD_LIST_FILTER', foodListFilter),
        takeLatest('FOOD_EDIT_SUBMIT', foodEditSubmit),
        takeLatest('FOOD_PHOTO_SUBMIT', foodPhotoSubmit),
        takeLatest('FOOD_TIME_CHAGNE', foodTimeChange),
        takeLatest('FOOD_EDIT', foodEdit)
    ])
}
