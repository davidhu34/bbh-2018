const modalInit = {
    open: false,
    modalType: ''
}

export const modal = ( state = modalInit, action ) => {
    switch ( action.type ) {
        case 'MODAL_LAUNCH':
            return {
                ...state,
                modalType: action.modalType,
                data: action.data,
                open: true,
            }
        case 'MODAL_CLOSE':
            return {
                ...state,
                modalType: '',
                data: null,
                open: false,
            }
        default:
            return state
    }
}
