const initialState = {
    
}

export default function backImgReducer(state = initialState, action) {
    switch (action.type) {
        case 'BACK_IMG':
            return {
                ...state,
                [action.cityName]: action.img
            }
        default:
            return state;
    }
}