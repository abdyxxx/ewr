const initialState = {
    
}

export default function cityDataReducer(state = initialState, action) {
    switch (action.type) {
        case 'CITY_DATA':
            return {
                ...state,
                [action.cityName]: action.data
            }
        default:
            return state;
    }
}