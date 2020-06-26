import * as type from './actionTypes'
import { post } from './requests';
import { showToast } from './applicationActions';

export function registerUser(user) {
    return function (dispatch) {
        const endpoint = '/user/createUser';
        const actions = {
            beginAction: () => dispatch(register_user_begin()),
            errorAction: error => dispatch(register_user_error(error))
        };
        post(endpoint, user, actions).then(data => {
            if (data != null) {
                dispatch(register_user_success())
                showToast(dispatch, "Action completed successfully")
            }
        });
    }
}

export function onChange(result) {
    return function (dispatch) {
        dispatch(register_field_change(result));
    }
}

export function uploadPhoto(event) {
    return function (dispatch) {
        let file = event.target.files[0];
        if (file) {
            let read = new FileReader();
            read.onloadend = () => {
                dispatch(register_field_change({ field: "photo", value: read.result }))
            };
            read.readAsDataURL(file);
        }
    }
}

export function registerPageClear() {
    return function (dispatch) {
        dispatch(register_clear())
    }
}

export function register_user_begin() {
    return { type: type.REGISTER_USER_BEGIN }
}

export function register_user_error(message) {
    return { type: type.REGISTER_USER_ERROR, message }
}

export function register_user_success() {
    return { type: type.REGISTER_USER_SUCCESS }
}

export function register_field_change(result) {
    return { type: type.REGISTER_FIELD_CHANGE, result }
}

export function register_clear() {
    return { type: type.REGISTER_CLEAR }
}
