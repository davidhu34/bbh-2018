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

const exerciseDataInit = () => {

    return {
        list: ['1','2','3'],
        dateList: {
            [day2Id]: ['1','3'],
            [day1Id]: ['2','3'],
            [day0Id]: ['1'],
        },
        data: {
            '1': {
                id: '1',
                time: 1538406978195,
                desc: '慢跑',
                category: '',
                tags: [],
                calories: '480',
                count: '30min'
            },
            '2': {
                id: '2',
                time: 1538406998195,
                desc: '游泳',
                category: '',
                tags: [],
                calories: '650',
                count: '30min'
            },
            '3': {
                id: '3',
                time: 1538406988195,
                desc: '重訓',
                category: '',
                tags: [],
                calories: '560',
                count: '1hr30min'
            },
        },
        menuCategoryList: {
            'LIGHT': ['1','2','3'],
            'MEDIUM': ['4','5','6'],
            'HARD': ['7','8','9'],
        },
        menuData: {
            '1': {
                id: '1',
                time: 1538406978195,
                desc: '有氧舞蹈',
                category: 'LIGHT',
                tags: [],
                calories: '100',
                count: '30min'
            },
            '2': {
                id: '2',
                time: 1538406998195,
                desc: '太極拳',
                category: 'LIGHT',
                tags: [],
                calories: '10',
                count: '30min'
            },
            '3': {
                id: '3',
                time: 1538406988195,
                desc: '走路',
                category: 'LIGHT',
                tags: [],
                calories: '220',
                count: '1hr'
            },
            '4': {
                id: '4',
                time: 1538406988195,
                desc: '足球',
                category: 'MEDIUM',
                tags: [],
                calories: '500',
                count: '1hr'
            },
            '5': {
                id: '5',
                time: 1538406988195,
                desc: '籃球',
                category: 'MEDIUM',
                tags: [],
                calories: '450',
                count: '30min'
            },
            '6': {
                id: '6',
                time: 1538406988195,
                desc: '棒球',
                category: 'MEDIUM',
                tags: [],
                calories: '820',
                count: '3hr'
            },
            '7': {
                id: '7',
                time: 1538406988195,
                desc: '游泳',
                category: 'HARD',
                tags: [],
                calories: '430',
                count: '1hr'
            },
            '8': {
                id: '8',
                time: 1538406988195,
                desc: '重訓',
                category: 'HARD',
                tags: [],
                calories: '390',
                count: '1hr'
            },
            '9': {
                id: '9',
                time: 1538406988195,
                desc: '跑步',
                category: 'HARD',
                tags: [],
                calories: '550',
                count: '30min'
            },
        },
        mapList: ['1','2'],
        mapData: {
            '1': {
                id: '1',
                desc: '象山親山步道',
                category: '健行',
                distance: '3.25',
                source: 'https://i.imgur.com/uorfKZe.png',
            },
            '2': {
                id: '2',
                desc: '南港小縱走',
                category: '健行',
                distance: '1.45',
                source: 'https://i.imgur.com/hxX50gA.png',
            },
            '3': {
                id: '3',
                desc: '福州山步道',
                category: '健行',
                distance: '1.1',
                source: '',
            },
        }
    }
}

export const exerciseData = (state = exerciseDataInit(), action) => {
    switch (action) {
        default:
            return state
    }
}

const exerciseUIInit = {
    mode: 'MENU',
    loading: false,
    filter: 'LIGHT',
    dateTime: day0.getTime(),
    dateId: day0Id,
    hasNextDay: false,
    hasPrevDay: false,
    list: [],
    viewingMap: '',
}

export const exerciseUI = (state = exerciseUIInit, action) => {
    console.log('EXERCISEUI', action)
    switch (action.type) {
        case 'EXERCISE_LIST_FILTER_START':
            return {
                ...state,
                filter: action.filter,
                loading: true
            }
        case 'EXERCISE_LIST_FILTER_END':
            return {
                ...state,
                filter: action.filter,
                loading: false,
                list: action.list
            }
        case 'EXERCISE_TIME_CHANGE_START':
            return {
                ...state,
                loading: true
            }
        case 'EXERCISE_TIME_CHANGE_END':
            return {
                ...state,
                mode: 'WORKOUT',
                loading: false,
                dateTime: action.dateTime,
                dateId: action.dateId,
                hasNextDay: action.hasNextDay,
                hasPrevDay: action.hasPrevDay,
                filter: action.filter,
                list: action.list,
            }
        case 'EXERCISE_MODE_CHANGE':
            return {
                ...state,
                mode: action.mode
            }
        case 'EXERCISE_MAP_VIEW':
            return {
                ...state,
                viewingMap: action.mapId == state.viewingMap? '': action.mapId
            }
        default:
            return state
    }
}

export const getCaloriesConsumed = (date,exerciseData) => {
    const dateId = getDateId(date)
    if (dateId) {
        const dateList = exerciseData.dateList[dateId] || []
        let calories = 0
        for (let i = 0; i < dateList.length; i++) {
            const exercise = exerciseData.data[dateList[i]] || {}
            calories += Number(exercise.calories) || 0
        }
        return calories.toString()
    } else return ''
}
