const initialState = {
    items: []
}

export function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(items => items._id !== action._id)
            }
            case 'SAVE_ITEM':
                return {...state, items : state.items.map(item=>(item._id === action.savedItem._id)? action.savedItem: item)}
        default:
            return state;
    }
}