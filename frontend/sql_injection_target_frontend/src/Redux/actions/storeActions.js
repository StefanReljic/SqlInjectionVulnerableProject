import * as type from './actionTypes'
import { application_show_spinner, showToast } from './applicationActions';
import { post } from './requests';
import { validate } from './validators/storeValidator';

export function addStore(store) {
    return function (dispatch) {
        let validationErrors = validate(store)
        if (validationErrors.length > 0) {
            dispatch(add_store_validation_errors(validationErrors))
            return;
        }
        const endpoint = '/store/addStore';
        const actions = {
            beginAction: () => dispatch(add_store_begin()),
            errorAction: error => dispatch(add_store_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        };
        post(endpoint, store, actions).then(data => {
            if (data.message) {
                dispatch(add_store_success())
                showToast(dispatch, "Action completed successfully")
            }
        });
    }
}

export function storeFieldChange(params) {
    return function (dispatch) {
        dispatch(add_store_field_change(params))
    }
}

export function storeModal() {
    return function (dispatch) {
        dispatch(add_store_modal())
    }
}

export function add_store_begin() {
    return { type: type.ADD_STORE_BEGIN }
}

export function add_store_error(message) {
    return { type: type.ADD_STORE_ERROR, message }
}

export function add_store_success() {
    return { type: type.ADD_STORE_SUCCESS }
}

export function add_store_field_change(params) {
    return { type: type.ADD_STORE_FIELD_CHANGE, params }
}

export function add_store_modal() {
    return { type: type.ADD_STORE_MODAL }
}

export function add_store_validation_errors(errors) {
    return { type: type.ADD_STORE_VALIDATION_ERRORS, errors }
}