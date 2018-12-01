import { getDateId } from '../utils'

const foodDataInit = {
    list: ['1','2','3'],
    dateList: {
        '20181130': ['1','2'],
        '20181201': ['1','2','3'],
        '20181202': ['3'],
    },
    data: {
        '1': {
            id: '1',
            time: 1538406978195,
            desc: 'KFC',
            category: 'LUNCH',
            tags: [],
            calories: '500',
        },
        '2': {
            id: '2',
            time: 1538406998195,
            desc: '7-11',
            category: 'LUNCH',
            tags: [],
            calories: '5000',
        },
        '3': {
            id: '3',
            time: 1538406988195,
            desc: '牛排',
            category: 'DINNER',
            tags: [],
            calories: '8000',
        },
    }
}

const dateList = (state, action) => {
    switch (action.type) {
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            return {
                ...state,
                [action.dateId]: [...state[action.dateId],action.food.id],
            }
        default:
            return state
    }
}

export const foodData = (state = foodDataInit, action) => {
    switch (action.type) {
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            const isNew = state.list.indexOf(action.food.id) < 0
            return {
                ...state,
                list: isNew? [...state.list, action.food.id]: state.list,
                dateList: dateList(state.dateList, action),
                data: {
                    ...state.data,
                    [action.food.id]: action.food
                }
            }
        default:
            return state
    }
}

const foodFormInit = {
    DESC: '',
    COUNT: '',
    CALORIES: '',
}

const foodUIInit = {
    viewing: null,
    viewingMode: null,
    loading: false,
    filter: 'LUNCH',
    dateTime: 1543593600000,
    dateId: '20181201',
    hasNextDay: true,
    hasPrevDay: true,
    list: ['1','2','3'],
    form: foodFormInit
}

const foodForm = (state , action) => {
    console.log('FOODFORM', action)
    switch (action.type) {
        case 'FOOD_FORM_CHANGE':
            let changeMade = {}
            Object.keys(action.change).map( name => {
                changeMade[name] = action.change[name]
            })
            return {
                ...state,
                ...changeMade
            }
        default:
            return state
    }
}

export const foodUI = (state = foodUIInit, action) => {
    console.log('FOODUI', action)
    switch (action.type) {
        case 'FOOD_LIST_FILTER_START':
            return {
                ...state,
                viewing: null,
                viewingMode: null,
                filter: action.filter,
                loading: true
            }
        case 'FOOD_LIST_FILTER_END':
            return {
                ...state,
                filter: action.filter,
                loading: false,
                list: action.list
            }
        case 'FOOD_VIEW':
            return {
                ...state,
                viewing: action.viewing == state.viewing && state.viewingMode == 'VIEW'? null: action.viewing,
                viewingMode: 'VIEW',
            }
        case 'FOOD_FORM_CHANGE':
            return {
                ...state,
                form: foodForm(state.form, action)
            }
        case 'FOOD_EDIT_START':
            return {
                ...state,
                viewing: action.editing,
                viewingMode: 'EDIT',
            }
        case 'FOOD_EDIT_END':
            return {
                ...state,
                viewing: null,
                viewingMode: null,
            }
        case 'FOOD_TIME_CHANGE_START':
        case 'FOOD_EDIT_SUBMIT_START':
            return {
                ...state,
                loading: true
            }
        case 'FOOD_TIME_CHANGE_END':
            return {
                ...state,
                loading: false,
                viewing: null,
                viewingMode: null,
                dateTime: action.dateTime,
                dateId: action.dateId,
                hasNextDay: action.hasNextDay,
                hasPrevDay: action.hasPrevDay,
                list: action.list,
            }
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            const isNew = state.list.indexOf(action.food.id) < 0
            return {
                ...state,
                loading: false,
                viewing: null,
                viewingMode: null,
                list: isNew? [...state.list, action.food.id]: state.list,
                form: foodForm(state.form, action),
            }
        default:
            return state
    }
}

const foodCameraUIInit = {
    image: '',
    insights: [],
}

export const foodCameraUI = (state = foodCameraUIInit, action) => {
    switch (action.type) {
        case 'CAMERA_SNAPSHOT':
            return {
                ...state,
                image: action.image,
                insights: [...action.insights],
            }
        case 'CAMERA_START':
            return {
                ...state,
                image: '',
                insights: [],
            }
        case 'CAMERA_END':
            return {
                ...state,
                image: '',
                insights: [],
            }
        default:
            return state
    }
}

export const getCaloriesGained = (date,foodData) => {
    const dateId = getDateId(date)
    if (dateId) {
        const dateList = foodData.dateList[dateId] || []
        let calories = 0
        for (let i = 0; i < dateList.length; i++) {
            const food = foodData.data[dateList[i]] || {}
            calories += Number(food.calories) || 0
        }
        return calories.toString()
    } else return ''
}
