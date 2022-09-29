export function setItem(city) {
    return {
        type: 'ADD_ITEM',
        data: city
    }
}

export function replaceItem(city) {
    return {
        type: 'REPLACE_ITEM',
        data: city
    }
}
export function addData(data) {
    return {
        type: 'ADD_DATA',
        data
    }
}
export function selectCity(city) {
    return {
        type: 'SELECT_CITY',
        data: city
    }
}
export function setAuth(value) {
    return {
        type: 'AUTH',
        data: value
    }
}
export function detailInform(value) {
    return {
        type: 'SHOW_DETAIL',
        data: value
    }
}