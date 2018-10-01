const foodDataInit = {
    list: ['1','2','3'],
    data: {
        '1': {
            id: '1',
            time: 1538406978195,
            desc: 'KFC',
            category: 'LUNCH',
            tags: [],
            calorie: 500,
        },
        '2': {
            id: '2',
            time: 1538406998195,
            desc: '7-11',
            category: 'LUNCH',
            tags: [],
            calorie: 5000,
        },
        '3': {
            id: '3',
            time: 1538406988195,
            desc: '牛排',
            category: 'DINNER',
            tags: [],
            calorie: 8000,
        },
    }
}
export const foodData = (state = foodDataInit, action) => {
    switch (action.type) {
        case 'FOOD_DATA_CREATE':
        default:
            return state
    }
}

const foodUIInit = {
    loading: false,
    filter: '',
    list: ['1','2','3']
}
export const foodUI = (state = foodUIInit, action) => {
    console.log('FOODUI', action)
    switch (action.type) {
        case 'FOOD_LIST_FILTER_START':
            return {
                ...state,
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
        default:
            return state
    }
}
