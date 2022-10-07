const initialState = {
    showModale: false
}

export default function citiesListReducer(state = initialState, action) {
    switch (action.type) {
        case 'CITIES_LIST':
            return {
                citiesList: action.data
            }
        default:
            return state;
    }
}