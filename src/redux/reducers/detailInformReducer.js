const initialState = {
    
}

export default function detailInformReducer(state = initialState, action) {
    switch (action.type) {
        case 'DETAIL_INFORM':
            return {
                detailInform: action.data
            }
        default:
            return state;
    }
}