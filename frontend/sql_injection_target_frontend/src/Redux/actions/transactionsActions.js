import { get } from './requests'
import * as type from "./actionTypes";

export function fetchTransactions(username) {
    return function (dispatch) {
        const actions = {
            beginAction: () => dispatch(transactions_fetch_begin()),
            errorAction: error => dispatch(transactions_fetch_error(error)),
        }
        get("/transaction/transactions", { username }, actions).then(data => {
            if (data.list) {
                dispatch(transactions_fetch_success(data.list))
            }
        })
    }
}

export function fetchTransactionDetails(transaction) {
    return function (dispatch) {
        const actions = {
            beginAction: () => dispatch(transactions_details_fetch_begin()),
            errorAction: error => dispatch(transactions_details_fetch_error(error)),
        }
        get("/transaction/transactionDetails", { cartId: transaction.value }, actions).then(data => {
            if (data.list) {
                dispatch(transactions_details_fetch_success(data.list))
                dispatch(transactions_select_change(transaction))
            }
        })
    }
}

export function transactions_select_change(transaction) {
    return { type: type.TRANSACTIONS_SELECT_CHANGE, transaction }
}

export function transactions_details_fetch_begin() {
    return { type: type.TRANSACTIONS_DETAILS_FETCH_BEGIN }
}

export function transactions_details_fetch_error(message) {
    return { type: type.TRANSACTIONS_DETAILS_FETCH_ERROR, message }
}

export function transactions_details_fetch_success(transactionDetails) {
    return { type: type.TRANSACTIONS_DETAILS_FETCH_SUCCESS, transactionDetails }
}

export function transactions_fetch_begin() {
    return { type: type.TRANSACTIONS_FETCH_BEGIN }
}

export function transactions_fetch_error(message) {
    return { type: type.TRANSACTIONS_FETCH_ERROR, message }
}

export function transactions_fetch_success(transactionList) {
    return { type: type.TRANSACTIONS_FETCH_SUCCESS, transactionList }
}