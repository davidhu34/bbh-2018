import { getDateId } from '../utils'

const day0 = new Date()
const y = day0.getFullYear()
const m = day0.getMonth()
const d = day0.getDate()
const day0Id = getDateId(day0)

const activityDataInit = {
    list: ['1','2','3','4','5'],
    schedule: ['3','4'],
    data: {
        '1': {
            id: '1',
            time: (new Date(y,m,d+1)).getTime(),
            desc: '重訓',
            max: '5',
            participating: '1',
            participants: ['1'],
            participation: '0',
            location: '',
            locationName: '訓練中心',
            owner: '1',
            ownerName: 'Steve Rogers',
            distance: 5,
        },
        '2': {
            id: '2',
            time: (new Date(y,m,d+3)).getTime(),
            desc: '路跑',
            max: '30',
            participating: '1',
            participants: ['3'],
            participation: '1',
            location: '',
            locationName: '台北101',
            owner: '3',
            ownerName: '王小明',
            distance: 20,
        },
        '3': {
            id: '3',
            time: (new Date(y,m,d+3)).getTime(),
            desc: 'IBM棒球明星賽',
            max: '40',
            participating: '2',
            participants: ['4','lukeskywalker'],
            participation: '2',
            location: '',
            locationName: '河濱公園',
            owner: '4',
            ownerName: '華生',
            distance: 100,
        },
        '4': {
            id: '4',
            time: (new Date(y,m,d+5)).getTime(),
            desc: '3v3鬥牛',
            max: '15',
            participating: '3',
            participants: ['2','1','lukeskywalker'],
            participation: '2',
            location: '',
            locationName: '橋下',
            owner: '2',
            ownerName: '周傑倫',
            distance: 80,
        },
        '5': {
            id: '5',
            time: (new Date(y,m+1,d)).getTime(),
            desc: 'Fight Club',
            max: '2',
            participating: '2',
            participants: ['1','5'],
            participation: '0',
            location: '',
            locationName: '地下室',
            owner: '5',
            ownerName: 'Tyler Durden',
            distance: 15,
        },
    }
}
export const activityData = (state = activityDataInit, action) => {
    switch (action.type) {
        case 'ACTIVITY_UPDATE_SCHEDULE':
            return {
                ...state,
                schedule: action.schedule
            }
        case 'ACTIVITY_JOIN_SUBMIT_END':
        case 'ACTIVITY_EDIT_SUBMIT_END':
            if (action.activity) {
                const isNew = state.list.indexOf(action.activity.id) < 0
                return {
                    ...state,
                    list: isNew? [...state.list, action.activity.id]: state.list,
                    data: {
                        ...state.data,
                        [action.activity.id]: action.activity
                    }
                }
            } else return state
        default:
            return state
    }
}

const activityFormInit = {
    TIME: '',
    DESC: '',
    MAX: '',
}

const activityUIInit = {
    viewing: null,
    viewingMode: null,
    loading: false,
    sorting: 'TIME',
    filter: 'ALL',
    list: ['1','2','3','4','5'],
    previewScheduleIndex: 0,
    form: activityFormInit
}

const activityForm = (state , action) => {
    console.log('ACTIVITYFORM', action)
    switch (action.type) {
        case 'ACTIVITY_FORM_CHANGE':
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

export const activityUI = (state = activityUIInit, action) => {
    console.log('ACTIVITYUI', action)
    switch (action.type) {
        case 'ACTIVITY_LIST_SORT_START':
            return {
                ...state,
                viewing: null,
                viewingMode: null,
                sorting: action.sorting,
                loading: true
            }
        case 'ACTIVITY_LIST_SORT_END':
            return {
                ...state,
                sorting: action.sorting,
                loading: false,
                list: action.list
            }
        case 'ACTIVITY_LIST_FILTER_START':
            return {
                ...state,
                viewing: null,
                viewingMode: null,
                filter: action.filter,
                sorting: action.sorting,
                loading: true
            }
        case 'ACTIVITY_LIST_FILTER_END':
            return {
                ...state,
                filter: action.filter,
                sorting: action.sorting,
                loading: false,
                list: action.list
            }
        case 'ACTIVITY_VIEW':
            return {
                ...state,
                viewing: action.viewing == state.viewing && state.viewingMode == 'VIEW'? null: action.viewing,
                viewingMode: 'VIEW',
            }
        case 'ACTIVITY_FORM_CHANGE':
            return {
                ...state,
                form: activityForm(state.form, action)
            }
        case 'ACTIVITY_EDIT_START':
            return {
                ...state,
                viewing: action.editing,
                viewingMode: 'EDIT',
            }
        case 'ACTIVITY_EDIT_END':
            return {
                ...state,
                viewing: null,
                viewingMode: null,
            }
        case 'ACTIVITY_EDIT_SUBMIT_START':
        case 'ACTIVITY_JOIN_SUBMIT_START':
            return {
                ...state,
                loading: true
            }
        case 'ACTIVITY_EDIT_SUBMIT_END':
        case 'ACTIVITY_JOIN_SUBMIT_END':
            if (action.activity) {
                const isNew = state.list.indexOf(action.activity.id) < 0
                return {
                    ...state,
                    loading: false,
                    viewing: null,
                    viewingMode: null,
                    list: isNew? [...state.list, action.activity.id]: state.list,
                    form: activityForm(state.form, action),
                }
            } else return {
                ...state,
                loading: false
            }
        case 'ACTIVITY_UPDATE_SCHEDULE':
        case 'ACTIVITY_PREVIEW_SCHEDULE':
            return {
                ...state,
                previewScheduleIndex: action.index
            }
        default:
            return state
    }
}
