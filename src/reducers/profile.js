const profileInit = {
    user: {
        id: 'lukeskywalker',
        firstName: 'Lara',
        lastName: 'Su',
        weight: '55',
        targetWeight: '45',
        diabolism: '666',
        height: '200',
    },
    users: {
        'lukeskywalker': {
            id: 'lukeskywalker',
            name: 'Lara Su',
            image: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
        },
        '1': {
            id: '1',
            name: 'Steve Rogers',
            image: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
        },
        '2': {
            id: '2',
            name: '周傑倫',
            image: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
        },
        '3': {
            id: '3',
            name: '王小明',
            image: 'https://react.semantic-ui.com/images/avatar/small/tom.jpg',
        },
        '4': {
            id: '4',
            name: '華生',
            image: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
        },
        '5': {
            id: '5',
            name: 'Tyler Durden',
            image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
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
