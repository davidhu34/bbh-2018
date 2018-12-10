import { delay } from 'redux-saga'
import { put, take, takeEvery, takeLatest, all, call,  select, fork } from 'redux-saga/effects'
// import { push } from 'connected-react-router'

import { filterOfDate } from '../utils'

import {
    launchModal,
    closeModal,
    launchLoader,
    closeLoader,
    routeChange,

    foodView,

} from '../actions'

import foodSaga, { foodTimeChange } from './foodSaga'
import activitySaga from './activitySaga'

export function* pushRoute(action) {
    yield put({type: 'PUSH_ROUTE_START'})
    yield put(launchLoader())
    yield delay(100)

    // yield put(push(action.route))

    switch (action.route) {
        case '/food':
            if (action.food) {
                const food = action.food
                yield call(foodTimeChange, { date: new Date(food.time), filter: food.category })
                yield put( foodView(food.id))
            } else {
                const now = new Date()
                yield call(foodTimeChange, { date: now, filter: filterOfDate(now) })
            }

        case '/':
        default:
            break;
    }
    yield put(routeChange(action.route))
    yield put(closeLoader())
}

export function* routeSaga() {
    yield takeEvery('PUSH_ROUTE', pushRoute)
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
