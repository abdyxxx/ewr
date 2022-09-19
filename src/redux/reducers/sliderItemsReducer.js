const initialState = {
    items: ['Moscow', 'New York', 'Paris', 'London', 'Beijing']
}

export default function sliderItemsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                items: [...state.items, action.data]
            }
        case 'REPLACE_ITEM':
            return {
                items: [...state.items.slice(0, 5), action.data]
            }
        default:
            return state;
    }
}