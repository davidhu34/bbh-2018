import { put, take, takeEvery, takeLatest, all, call,  select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'connected-react-router'

import { getDateId, filterOfDate } from '../utils'

import {
    launchModal,
    closeModal,
    launchLoader,
    closeLoader,
} from '../actions'

const filterExerciseList = (dataList, filter) => {
    let idList = []
    dataList.map( exercise => {
        if (exercise.category == filter) idList.push(exercise.id)
    })
    return Promise.resolve(idList)
}
function* exerciseListFilter(action) {

    const filter = action.filter
    yield put({type: 'EXERCISE_LIST_FILTER_START', filter})

    const dataList = yield select(state => {
        return state.exerciseData.dateList[state.exerciseUI.dateId].map( key => state.exerciseData.data[key] )
    })
    const filteredList = yield call(filterExerciseList, dataList, filter)
    yield put({
        type: 'EXERCISE_LIST_FILTER_END',
        filter: action.filter,
        list: filteredList
    })
}

const getExerciseDateList = (state, dateId) => state.exerciseData.dateList[dateId] || []

export function* exerciseTimeChange(action) {
    yield put({type: 'EXERCISE_TIME_CHANGE_START'})
    yield put(launchLoader())

    const { filter, date } = action
    const dateId = getDateId(date)
    const newDataList = yield select(state => {
        console.log(getExerciseDateList(state, dateId))
        return getExerciseDateList(state, dateId)//.map( exerciseId => state.exerciseData.data[exerciseId] )
    })

    const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
    const prevDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
    const nextDayList = yield select(state => getExerciseDateList(state,getDateId(nextDay)))
    const prevDayList = yield select(state => getExerciseDateList(state,getDateId(prevDay)))


    yield put({
        type: 'EXERCISE_TIME_CHANGE_END',
        dateTime: action.date.getTime(),
        dateId,
        hasNextDay: nextDayList.length,
        hasPrevDay: prevDayList.length,
        filter,
        list: newDataList
    })

    yield put(closeLoader())
}

export default function* exerciseSaga() {
    yield all([
        takeLatest('EXERCISE_LIST_FILTER', exerciseListFilter),
        takeLatest('EXERCISE_TIME_CHAGNE', exerciseTimeChange),
    ])
}
