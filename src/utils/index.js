export const getDateId = (date) => {
    if (date && date.getTime()) {
        return date.getFullYear().toString().padStart(4,'0')
            + (date.getMonth()+1).toString().padStart(2,'0')
            + date.getDate().toString().padStart(2,'0')
    } else return ''
}

export const filterOfDate = (date) => {
    if (date && date.getTime()) {
        const hour = date.getHours()
        return hour >= 5 && hour < 11? 'BREAKFAST'
            : hour >= 11 && hour < 16? 'LUNCH'
            : hour >= 16 && hour < 23? 'DINNER'
            : 'SNACK';
    } else return '';
}
