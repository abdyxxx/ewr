const initialState = {
    cityName: localStorage[`${sessionStorage.currentUser + '_city'}`]
}

export default function selectedCityReducer(state = initialState, action) {
    switch (action.type) {
        case 'SELECT_CITY':
            return {
                cityName: action.data
            }
        default:
            return state;
    }
}