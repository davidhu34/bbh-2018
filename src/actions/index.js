export const pushRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    route: route
})

export const foodListFilter = (filter) => ({
    type: 'FOOD_LIST_FILTER', filter
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
