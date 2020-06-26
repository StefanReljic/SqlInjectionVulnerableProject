import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function applicationReducer(state = initialState.application, action) {
    switch (action.type) {
        case type.APPLICATION_CHANGE_TAB: {
            return { ...state, selectedTabIndex: action.tab }
        }

        case type.APPLICATION_SHOW_SPINNER: {
            return { ...state, showSpinner: !state.showSpinner }
        }

        case type.APPLICATION_FETCH_STORES_FOR_SELECT: {
            return { ...state, stores: action.stores }
        }

        case type.APPLICATION_FETCH_BOOKS_FOR_SELECT: {
            return { ...state, books: action.books }
        }

        case type.APPLICATION_USER_LOGGED: {
            return { ...state, isLoggedIn: action.isLoggedIn };
        }

        case type.APPLICATION_SET_USER_DETAILS: {
            return { ...state, userDetails: action.details }
        }

        case type.APPLICATION_SET_USER_ACCOUNT_BALANCE: {
            let userDetails = { ...state.userDetails };
            userDetails.accountBalance = action.balance;
            return { ...state, userDetails }
        }

        case type.APPLICATION_SHOW_TOAST: {
            return { ...state, showToast: action.toastInfo.showToast, toastMessage: action.toastInfo.toastMessage }
        }

        default:
            return state;
    }
}