const activityDataInit = {
    list: ['1','2','3','4','5'],
    schedule: ['3','4'],
    data: {
        '1': {
            id: '1',
            time: 1538406978195,
            desc: 'BIKING',
            max: '10',
            participating: '1',
            participation: '0',
            location: '',
        },
        '2': {
            id: '2',
            time: 1538406998195,
            desc: 'SWIMMIN',
            max: '3',
            participating: '1',
            participation: '1',
            location: '',
        },
        '3': {
            id: '3',
            time: 1538906988195,
            desc: 'BASEBALL',
            max: '40',
            participating: '1',
            participation: '2',
            location: '',
        },
        '4': {
            id: '4',
            time: 1538406988195,
            desc: 'Basketball',
            max: '10',
            participating: '1',
            participation: '3',
            location: '',
        },
        '5': {
            id: '5',
            time: 1538406988195,
            desc: 'fight',
            max: '2',
            participating: '1',
            participation: '0',
            location: '',
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
            const isNew = state.list.indexOf(action.activity.id) < 0
            return {
                ...state,
                list: isNew? [...state.list, action.activity.id]: state.list,
                data: {
                    ...state.data,
                    [action.activity.id]: action.activity
                }
            }
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
            const isNew = state.list.indexOf(action.activity.id) < 0
            return {
                ...state,
                loading: false,
                viewing: null,
                viewingMode: null,
                list: isNew? [...state.list, action.activity.id]: state.list,
                form: activityForm(state.form, action),
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
