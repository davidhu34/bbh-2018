import { delay } from 'redux-saga'
import { put, take, takeEvery, takeLatest, all, call,  select, fork } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'

import {
    launchModal,
    closeModal,
    launchLoader,
    closeLoader,
    foodFormChange,
    activityFormChange,
    foodView
} from '../actions'

import foodSaga from './foodSaga'
import activitySaga from './activitySaga'

export function* changeRoute(action) {
    yield put({type: 'CHANGE_ROUTE_START'})
    yield delay(1)
    yield put(push(action.route))
}

export function* routeSaga() {
    yield takeEvery('CHANGE_ROUTE', changeRoute)
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
