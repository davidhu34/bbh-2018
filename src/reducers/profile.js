const profileInit = {
    user: {
        id: 'lukeskywalker',
        firstName: 'Luke',
        lastName: 'Skywalker',
        weight: '100',
        targetWeight: '123',
        diabolism: '1234',
        height: '200',
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
