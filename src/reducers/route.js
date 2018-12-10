const routeInit = {
    path: '/'
}

export const route = ( state = routeInit, action ) => {
    switch ( action.type ) {
        case 'ROUTE_CHANGE':
            return {
                ...state,
                path: action.route
            }
        default:
            return state
    }
}
