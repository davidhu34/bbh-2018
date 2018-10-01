import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call,  select, fork } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'

export function* changeRoute(action) {
    yield put({type: 'CHANGE_ROUTE_START'})
    yield delay(1000)
    yield put(push(action.route))
}

export function* routeSaga() {
    yield takeEvery('CHANGE_ROUTE', changeRoute)
}


const filterFoodList = (list, filter) => {
    return Promise.resolve(list.filter( food => food.category == filter ));
}
export function* foodListFilter(action) {

    const filter = action.filter
    yield put({type: 'FOOD_UI_LIST_FILTER_START', action})

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

export function* foodSaga() {
    yield takeLatest('FOOD_LIST_FILTER', foodListFilter)
}
export default function* rootSaga() {
    yield all([
        fork(routeSaga),
        foodSaga(),
    ])
}
