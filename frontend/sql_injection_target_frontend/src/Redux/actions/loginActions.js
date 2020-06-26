import * as type from './actionTypes';
import { application_user_logged } from './applicationActions';
import { application_set_user_details } from './applicationActions';
import { post } from './requests';

export function login(credentials) {
    return function (dispatch) {
        const endpoint = "/user/loginUser"
        const actions = {
            beginAction: () => dispatch(login_begin()),
            errorAction: error => dispatch(login_error(error))
        }
        post(endpoint, credentials, actions).then(data => {
            if (data.length !== 0) {
                dispatch(login_success())
                dispatch(application_set_user_details(data))
                dispatch(application_user_logged(true))
            }
        });
    }
}

export function onChange(result) {
    return function (dispatch) {
        dispatch(login_field_change(result));
    }
}

export function clearLoginPage() {
    return function (dispatch) {
        dispatch(login_clear())
    }
}

export function login_clear() {
    return { type: type.LOGIN_CLEAR }
}

export function login_begin() {
    return { type: type.LOGIN_BEGIN };
}

export function login_error(result) {
    return { type: type.LOGIN_ERROR, result };
}

export function login_success() {
    return { type: type.LOGIN_SUCCESS }
}

export function login_field_change(result) {
    return { type: type.LOGIN_FIELD_CHANGE, result }
}