import { put, take, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
    launchModal,
    launchFormError,
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

    yield put(closeLoader())
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

    yield put(closeLoader())
}

function* activityEditSubmit(action) {
    yield put({type: 'ACTIVITY_EDIT_SUBMIT_START'})
    yield put(launchLoader())

    const activity = yield select( state => state.activityData.data[state.activityUI.viewing] || {})

    const form = action.form
    const { DESC, TIME, MAX } = form
    const DATE = new Date(TIME)
    const isNew = activity.id? false: true

    let newActivity = null
    if (!DESC) {
        yield put(launchFormError('請輸入說明~'))
    } else if (DESC.length > 10) {
        yield put(launchFormError('說明不要超過10個字拜託'))
    } else if (!DATE || isNaN(DATE.getTime())) {
        yield put(launchFormError('日期要輸入好~'))
    } else if (!MAX || isNaN(MAX)) {
        yield put(launchFormError('要輸入人數上限(數字)'))
    } else if (MAX.toString().length > 2) {
        yield put(launchFormError('確定一百個人揪的到嗎@@'))
    } else {
        const time = (new Date()).getTime()
        newActivity = {
            ...activity,
            id: activity.id || time.toString(),
            participating: activity.participating || '1',
            participation: activity.participation || '3',
            time: DATE.getTime(),
            desc: form.DESC,
            max: form.MAX,
        }
    }

    yield delay(1)

    yield put({ type: 'ACTIVITY_EDIT_SUBMIT_END', activity: newActivity })

    if (newActivity) {
        if (isNew) {
            let previewIndex = 0
            const newSchedule = yield select( ({ activityData }) => {
                let list = []
                let inserted = false
                activityData.schedule.map( (id, order) => {
                    const a = activityData.data[id]
                    if (a.time > newActivity.time) {
                        list.push(newActivity.id)
                        previewIndex = order
                        inserted = true
                    }
                    list.push(id)
                })

                if (!inserted) {
                    list.push(newActivity.id)
                    previewIndex = list.length -1
                }
                return list
            })
            yield put({
                type: 'ACTIVITY_UPDATE_SCHEDULE',
                index: previewIndex,
                schedule: newSchedule
            })
        }
        yield put({ type: 'ACTIVITY_LIST_FILTER', filter: 'MINE' })
    }

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

    let previewIndex = 0
    const newSchedule = yield select( ({ activityData }) => {
        let list = []
        activityData.schedule.map( (id, order) => {
            const a = activityData.data[id]
            if (id == newActivity.id) {
                if (participation == 2) {
                    previewIndex = order
                    list.push(id)
                }
            } else list.push(id)
        })
        return list
    })
    yield put({
        type: 'ACTIVITY_UPDATE_SCHEDULE',
        index: previewIndex,
        schedule: newSchedule
    })

    yield put({type: 'ACTIVITY_LIST_FILTER', filter: 'LIKED' })
    yield put(closeModal())
    // yield put(closeLoader())
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
