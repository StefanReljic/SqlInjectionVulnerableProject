import * as type from "./actionTypes";
import { post } from "./requests";
import { application_set_user_account_balance, showToast } from "./applicationActions";

export function completePayment(cart, username) {
    return function (dispatch) {
        if (cart.items.length === 0) {
            dispatch(cart_complete_payment_error("Must have items in cart to process payment"))
            return;
        }
        const endpoint = "/transaction/completePayment"
        const actions = {
            beginAction: () => dispatch(cart_complete_payment_begin()),
            errorAction: error => dispatch(cart_complete_payment_error(error)),
        }
        post(endpoint, { cart, username }, actions).then(data => {
            if (data.message) {
                dispatch(cart_complete_payment_success(data))
                dispatch(application_set_user_account_balance(parseFloat(data.message)))
                showToast(dispatch, "Action completed successfully")
            }
        });
    }
}

export function addToCart(item) {
    return function (dispatch) {
        dispatch(cart_add(item))
    }
}

export function removeFromCart(item) {
    return function (dispatch) {
        dispatch(cart_remove(item))
    }
}

export function cartClearErrorMessages() {
    return function (dispatch) {
        dispatch(cart_clear_error_messages())
    }
}

export function cart_clear_error_messages() {
    return { type: type.CART_CLEAR_ERROR_MESSAGES }
}

export function cart_add(item) {
    return { type: type.CART_ADD, item }
}

export function cart_remove(item) {
    return { type: type.CART_REMOVE, item }
}

export function cart_complete_payment_begin() {
    return { type: type.CART_COMPLETE_PAYMENT_BEGIN }
}

export function cart_complete_payment_error(message) {
    return { type: type.CART_COMPLETE_PAYMENT_ERROR, message }
}

export function cart_complete_payment_success(message) {
    return { type: type.CART_COMPLETE_PAYMENT_SUCCESS, message }
}