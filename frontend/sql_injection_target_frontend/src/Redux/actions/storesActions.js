import * as type from './actionTypes'
import { application_show_spinner, application_fetch_stores_for_select } from './applicationActions'
import { post } from './requests'

export function fetchStores(searchParams) {
    return function (dispatch) {
        const endpoint = "/store/getStores"
        const actions = {
            beginAction: () => dispatch(stores_fetch_begin()),
            errorAction: error => dispatch(stores_fetch_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        }
        post(endpoint, searchParams, actions).then(data => {
            if (searchParams.pageNumber < 0)
                dispatch(application_fetch_stores_for_select(data))
            else {
                dispatch(stores_fetch_success(data))
                if (searchParams.pageNumber > data.totalPages - 1)
                    dispatch(store_params_change({ field: "pageNumber", value: 0 }));
            }
            dispatch(application_show_spinner())
        });
    }
}

export function searchChange(params) {
    return function (dispatch) {
        dispatch(store_params_change(params))
    }
}

export function onPageChange(page) {
    return function (dispatch) {
        dispatch(store_params_change({ field: "pageNumber", value: page }));
    }
}

export function store_params_change(params) {
    return { type: type.STORES_PARAMS_CHANGE, params }
}

export function stores_fetch_begin() {
    return { type: type.STORES_FETCH_BEGIN }
}

export function stores_fetch_error(messages) {
    return { type: type.STORES_FETCH_ERROR, messages }
}

export function stores_fetch_success(data) {
    return { type: type.STORES_FETCH_SUCCESS, data }
}