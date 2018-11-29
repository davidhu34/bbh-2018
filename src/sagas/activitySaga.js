import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
    launchModal,
    closeModal,
    launchLoader,
    closeLoader,
    activityFormChange
} from '../actions'

const sortActivityList = (dataList, sorting) => {
    let newList = [...dataList]
    newList.sort( (a,b) => {
        switch(sorting) {
            case 'TIME':
                return a.time - b.time
            case 'PARTICIPATION':
                return a.participation - b.participation
            case 'DISTANCE':
            default:
                return 0
        }
    })
    return Promise.resolve(newList.map( a => a.id ))
}

function* activityListSort(action) {

    const sorting = action.sorting
    yield put({type: 'ACTIVITY_LIST_SORT_START', action})

    const dataList = yield select(state => {
        return state.activityUI.list.map( key => state.activityData.data[key] )
    })
    const sortedList = yield call(sortActivityList, dataList, sorting)
    yield put({
        type: 'ACTIVITY_LIST_SORT_END',
        sorting: action.sorting,
        list: sortedList
    })
}

const activityFilter = (activity, filter) => {
    const { participation } = activity

    if (!participation) return false;
    switch (filter) {
        case 'MINE':
            return participation == '3'
        case 'LIKED':
            return participation == '1' || participation == '2'
        case 'ALL':
        default:
            return true;
    }
}
const filterActivityList = (dataList, filter) => {
    let filteredList = []
    dataList.map( activity => {
        if (activityFilter(activity, filter)) filteredList.push(activity)
    })
    return Promise.resolve(filteredList)
}

function* activityListFilter(action) {

    const filter = action.filter
    const sorting = action.sorting || 'TIME'
    yield put({type: 'ACTIVITY_LIST_FILTER_START', action})

    const dataList = yield select(state => {
        return state.activityData.list.map( key => state.activityData.data[key] )
    })
    const filteredList = yield call(filterActivityList, dataList, filter)
    const resultList = yield call(sortActivityList, filteredList, sorting)
    yield put({
        type: 'ACTIVITY_LIST_FILTER_END',
        filter: filter,
        sorting: sorting,
        list: resultList
    })
}

function* activityEditSubmit(action) {
    yield put({type: 'ACTIVITY_EDIT_SUBMIT_START'})
    yield put(launchLoader())

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
    yield put(closeLoader())
}

function* activityEdit(action) {
    yield put({type: 'ACTIVITY_EDIT_END' })

    const activity = yield select( state => state.activityData.data[action.editing] || {})
    yield put(
        activityFormChange({
            TIME: activity.time || '',
            DESC: activity.desc || '',
            MAX: activity.max || '',
        })
    )
    yield put({type: 'ACTIVITY_EDIT_START', editing: action.editing })
}

function* activityJoin(action) {
    yield put({type: 'ACTIVITY_JOIN_END' })

    yield put({type: 'ACTIVITY_JOIN_START' })

    const activity = yield select( state => state.activityData.data[action.activity] || {})

    yield put(launchModal({
        modalType: 'ACTIVITY_JOIN_OPTIONS',
        data: {
            activity: activity
        }
    }))

    const { participation } = yield take('ACTIVITY_JOIN_SUBMIT')

    yield put(launchLoader())
    yield put({type: 'ACTIVITY_JOIN_SUBMIT_START' })

    const newActivity = {
        ...activity, participation
    }
    yield delay(1)
    yield put({type: 'ACTIVITY_JOIN_SUBMIT_END', activity: newActivity })
    yield put(closeModal())
    yield put(closeLoader())
    yield put({type: 'ACTIVITY_JOIN_END' })
}

export default function* activitySaga() {
    yield all([
        takeLatest('ACTIVITY_LIST_SORT', activityListSort),
        takeLatest('ACTIVITY_LIST_FILTER', activityListFilter),
        takeLatest('ACTIVITY_EDIT_SUBMIT', activityEditSubmit),
        takeLatest('ACTIVITY_EDIT', activityEdit),
        takeLatest('ACTIVITY_JOIN', activityJoin)
    ])
}
