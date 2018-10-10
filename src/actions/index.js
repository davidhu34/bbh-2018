export const pushRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    route: route
})

export const foodListFilter = (filter) => ({
    type: 'FOOD_LIST_FILTER', filter
})

export const foodEdit = (index) => ({
    type: 'FOOD_EDIT', editing: index
})


export const foodEditSubmit = (food) => ({
    type: 'FOOD_EDIT_SUBMIT',
    food: food
})
