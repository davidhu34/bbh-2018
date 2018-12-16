const profileInit = {
    user: {
        id: 'lukeskywalker',
        firstName: 'Luke',
        lastName: 'Skywalker',
        weight: '85',
        targetWeight: '65',
        diabolism: '666',
        height: '200',
    },
    users: {
        'lukeskywalker': {
            id: 'lukeskywalker',
            name: 'Luke Skywalker',
        },
        '1': {
            id: '1',
            name: 'Steve Rogers'
        },
        '2': {
            id: '2',
            name: '周傑倫'
        },
        '3': {
            id: '3',
            name: '王小明'
        },
        '4': {
            id: '4',
            name: '華生'
        },
        '5': {
            id: '5',
            name: 'Tyler Durden'
        },
    },
    loggedIn: false
}

export const profile = ( state = profileInit, action ) => {
    switch ( action.type ) {
        case 'LOGIN_START':
            return {
                ...state,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.user,
                loggedIn: true,
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                user: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    weight: '',
                    height: '',
                },
                loggedIn: true,
            }
        default:
            return state
    }
}
