export const pushRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    route: route
})

export const foodListFilter = (filter) => ({
    type: 'FOOD_LIST_FILTER', filter
})

export const foodView = (foodId) => ({
    type: 'FOOD_VIEW', viewing: foodId
})

export const foodEdit = (foodId) => ({
    type: 'FOOD_EDIT', editing: foodId
})

export const foodEditEnd = () => ({
    type: 'FOOD_EDIT_END'
})

export const foodEditSubmit = (form) => ({
    type: 'FOOD_EDIT_SUBMIT',
    form: form
})

export const foodFormChange = (change) => ({
    type: 'FOOD_FORM_CHANGE',
    change: change
})

export const foodPhotoSubmit = ({ desc, calories, count }) => ({
    type: 'FOOD_PHOTO_SUBMIT', desc, calories, count
})

export const foodTimeChange = (date) => ({
    type: 'FOOD_TIME_CHAGNE', date
})

export const cameraSnapshot = (insights) => ({
    type: 'CAMERA_SNAPSHOT',
    insights: insights
})

export const activityListSort = (sorting) => ({
    type: 'ACTIVITY_LIST_SORT', sorting
})

export const activityListFilter = ({ filter, sorting }) => ({
    type: 'ACTIVITY_LIST_FILTER', filter, sorting
})

export const activityEdit = (activityId) => ({
    type: 'ACTIVITY_EDIT', editing: activityId
})

export const activityView = (activityId) => ({
    type: 'ACTIVITY_VIEW', viewing: activityId
})

export const activityEditEnd = () => ({
    type: 'ACTIVITY_EDIT_END'
})

export const activityEditSubmit = (form) => ({
    type: 'ACTIVITY_EDIT_SUBMIT',
    form: form
})

export const activityFormChange = (change) => ({
    type: 'ACTIVITY_FORM_CHANGE',
    change: change
})

export const activityJoin = (activityId) => ({
    type: 'ACTIVITY_JOIN', activity: activityId
})

export const activityJoinSubmit = (participation) => ({
    type: 'ACTIVITY_JOIN_SUBMIT', participation
})

export const launchLoader = () => ({ type: 'LOADER_LAUNCH' })

export const closeLoader = () => ({ type: 'LOADER_CLOSE' })


export const launchModal = ({ modalType, data }) => ({
    type: 'MODAL_LAUNCH',
    modalType, data
})

export const closeModal = () => ({
    type: 'MODAL_CLOSE'
})
