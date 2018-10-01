export const pushRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    route: route
})

export const foodListFilter = (filter) => ({
    type: 'FOOD_LIST_FILTER', filter
})
