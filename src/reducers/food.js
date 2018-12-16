import { getDateId } from '../utils'

const day0 = new Date()
const y = day0.getFullYear()
const m = day0.getMonth()
const d = day0.getDate()
const day0Id = getDateId(day0)

const day1 = new Date(y,m,d-1)
const day1Id = getDateId(day1)

const day2 = new Date(y,m,d-2)
const day2Id = getDateId(day2)

const foodDataInit = () => {

    return {
        list: ['1','2','3'],
        dateList: {
            [day2Id]: ['1','7','8'],
            [day1Id]: ['3','4','5','6'],
            [day0Id]: ['2','9'],
        },
        data: {
            '1': {
                id: '1',
                time: 1538406978195,
                desc: '炸雞桶',
                category: 'LUNCH',
                tags: [],
                calories: '2000',
                count: '六塊'
            },
            '2': {
                id: '2',
                time: 1538406998195,
                desc: '便利商店飯糰',
                category: 'BREAKFAST',
                tags: [],
                calories: '500',
                count: '一個'
            },
            '3': {
                id: '3',
                time: 1538406988195,
                desc: '牛排',
                category: 'DINNER',
                tags: [],
                calories: '3000',
                count: '12oz'
            },
            '4': {
                id: '4',
                time: 1538406988195,
                desc: '拉麵',
                category: 'LUNCH',
                tags: [],
                calories: '1234',
                count: '一碗'
            },
            '5': {
                id: '5',
                time: 1538406988195,
                desc: '燒餅油條',
                category: 'SNACK',
                tags: [],
                calories: '450',
                count: '一份'
            },
            '6': {
                id: '6',
                time: 1538406988195,
                desc: '豆漿',
                category: 'SNACK',
                tags: [],
                calories: '300',
                count: '一杯'
            },
            '7': {
                id: '7',
                time: 1538406988195,
                desc: '培根蛋餅',
                category: 'BREAKFAST',
                tags: [],
                calories: '400',
                count: '一份'
            },
            '8': {
                id: '8',
                time: 1538406988195,
                desc: '烤肉飯',
                category: 'DINNER',
                tags: [],
                calories: '900',
                count: '一碗'
            },
            '9': {
                id: '9',
                time: 1538406988195,
                desc: '水餃',
                category: 'LUNCH',
                tags: [],
                calories: '800',
                count: '十顆'
            },
        }
    }
}

const dateList = (state, action) => {
    switch (action.type) {
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            const foodDate = new Date(action.food.time)
            const dateId = getDateId(foodDate)
            const prevList = state[dateId] || []
            return {
                ...state,
                [dateId]: [...prevList,action.food.id],
            }
        default:
            return state
    }
}

export const foodData = (state = foodDataInit(), action) => {
    switch (action.type) {
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            if (action.food) {
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
            } else return state
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
    filter: '',
    dateTime: day0.getTime(),
    dateId: day0Id,
    hasNextDay: false,
    hasPrevDay: false,
    list: [],
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
                filter: action.filter,
                list: action.list,
            }
        case 'FOOD_PHOTO_SUBMIT_END':
        case 'FOOD_EDIT_SUBMIT_END':
            if (action.food) {
                const isNew = state.list.indexOf(action.food.id) < 0
                return {
                    ...state,
                    loading: false,
                    viewing: null,
                    viewingMode: null,
                    list: isNew? [...state.list, action.food.id]: state.list,
                    form: foodForm(state.form, action),
                }
            } else return {
                ...state,
                loading: false
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
