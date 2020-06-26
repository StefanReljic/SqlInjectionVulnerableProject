import * as type from "./actionTypes";

export function changeTab(event, tab) {
    return function (dispatch) {
        dispatch(application_change_tab(tab));
    }
}

export function logout() {
    return function (dispatch) {
        dispatch(application_user_logged(false))
    }
}

export function showToast(dispatch, toastMessage) {
    dispatch(application_show_toast({ showToast: true, toastMessage }));
    dispatch(application_show_toast({ showToast: false, toastMessage: '' }))
}

export function application_show_toast(toastInfo) {
    return { type: type.APPLICATION_SHOW_TOAST, toastInfo }
}

export function application_fetch_books_for_select(data) {
    return { type: type.APPLICATION_FETCH_BOOKS_FOR_SELECT, books: data.list }
}

export function application_fetch_stores_for_select(data) {
    return { type: type.APPLICATION_FETCH_STORES_FOR_SELECT, stores: data.list }
}

export function application_set_user_account_balance(balance) {
    return { type: type.APPLICATION_SET_USER_ACCOUNT_BALANCE, balance }
}

export function application_user_logged(isLoggedIn) {
    return { type: type.APPLICATION_USER_LOGGED, isLoggedIn }
}

export function application_change_tab(tab) {
    return { type: type.APPLICATION_CHANGE_TAB, tab }
}

export function application_show_spinner() {
    return { type: type.APPLICATION_SHOW_SPINNER }
}

export function application_set_user_details(details) {
    return { type: type.APPLICATION_SET_USER_DETAILS, details }
}