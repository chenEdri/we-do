
import {userService} from '../../services/userService.js'
import { loading, doneLoading } from './systemActions';

export function addToCart(item) {
    return dispatch => dispatch({ type: 'ADD_TO_CART', item })
}
export function clearCart() {
    return dispatch => dispatch({ type: 'CLEAR_CART' })
}
export function checkout() {
    return (dispatch, getState) => {
        console.log('state', getState());
        const { cartItems } = getState().userReducer
        const userBalance = getState().userReducer.loggedinUser.balance
        const totalPrice = cartItems.reduce((acc, item) => acc += item.price, 0)
        if (userBalance < totalPrice) return Promise.reject('You dont have enough cash!')
        // Here call the service and make change in backend
        dispatch({ type: 'SPEND_BALANCE', spendAmount: totalPrice })
        dispatch({ type: 'CLEAR_CART' })
        return Promise.resolve('Checked out successfully')
    }
}

// THUNK
export function loadUsers() {
    return async dispatch => {
      try {
        // example for loading
        dispatch(loading());
        const users = await userService.getUsers();
        dispatch({ type: 'SET_USERS', users });
      } catch (err) {
        console.log('UserActions: err in loadUsers', err);
        // example for rerouting - after changing the store
        // history.push('/some/path');
      } finally {
        dispatch(doneLoading());
      }
    };
  }
  // THUNK
  export function removeUser(userId) {
    return async dispatch => {
      try {
        await userService.remove(userId);
        dispatch({ type: 'REMOVE_USER', userId });
      } catch (err) {
        console.log('UserActions: err in removeUser', err);
      }
    };
  }
  // THUNK
  export function login(userCreds) {
    return async dispatch => {
      const user = await userService.login(userCreds);
      dispatch({ type: 'SET_USER', user });
    };
  }
  export function signup(userCreds) {
    return async dispatch => {
      const user = await userService.signup(userCreds);
      dispatch({ type: 'SET_USER', user });
    };
  }
  export function logout() {
    console.log('inside');
    return async dispatch => {
      await userService.logout();
      dispatch({ type: 'SET_USER', user: null });
    };
  }
  