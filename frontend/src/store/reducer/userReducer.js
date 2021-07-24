

let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    users: [],
    loggedInUser: localLoggedinUser,
    cartItems: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user };
        case 'SET_USERS':
            return { ...state, users: action.users };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.toy]
            }
        case 'SPEND_BALANCE':
            return {
                ...state,
                loggedinUser: {
                    ...state.loggedinUser,
                    balance: state.loggedinUser.balance - action.spendAmount
                }
            }
        case 'CLEAR_CART':
            return { ...state, cartItems: [] }

        default:
            return state
    }
}



