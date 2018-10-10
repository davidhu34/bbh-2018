const foodDataInit = {
    list: ['1','2','3'],
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
export const foodData = (state = foodDataInit, action) => {
    switch (action.type) {
        case 'FOOD_EDIT_SUBMIT_END':
            const isNew = state.list.indexOf(action.food.id) < 0
            return {
                ...state,
                list: isNew? [...state.list, action.food.id]: state.list,
                data: {
                    ...state.data,
                    [action.food.id]: action.food
                }
            }
        default:
            return state
    }
}

const foodUIInit = {
    editing: null,
    loading: false,
    filter: 'LUNCH',
    list: ['1','2','3']
}
export const foodUI = (state = foodUIInit, action) => {
    console.log('FOODUI', action)
    switch (action.type) {
        case 'FOOD_LIST_FILTER_START':
            return {
                ...state,
                editing: null,
                filter: action.filter,
                loading: true
            }
        case 'FOOD_LIST_FILTER_END':
        console.log(action)
            return {
                ...state,
                filter: action.filter,
                loading: false,
                list: action.list
            }
        case 'FOOD_EDIT_START':
            return {
                ...state,
                editing: action.editing
            }
        case 'FOOD_EDIT_END':
            return {
                ...state,
                editing: null
            }
        case 'FOOD_EDIT_SUBMIT_START':
            return {
                ...state,
                loading: true
            }
        case 'FOOD_EDIT_SUBMIT_END':
            const isNew = state.list.indexOf(action.food.id) < 0
            return {
                ...state,
                loading: false,
                editing: null,
                list: isNew? [...state.list, action.food.id]: state.list
            }
        default:
            return state
    }
}
