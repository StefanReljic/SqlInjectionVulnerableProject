import * as type from "./actionTypes"
import { application_show_spinner, showToast } from "./applicationActions";
import { post } from "./requests";
import { validate } from "./validators/storeBookValidator";

export function addBooksToStore(data) {
    return function (dispatch) {
        if (data.length === 0) {
            dispatch(store_book_validation_errors(["Must add at least one book"]))
            return;
        }
        const endpoint = "/store/addBooksToStore"
        const actions = {
            beginAction: () => dispatch(store_book_add_store_begin()),
            errorAction: error => dispatch(store_book_add_store_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        }
        post(endpoint, data, actions).then(data => {
            if (data.length !== 0) {
                dispatch(store_book_add_store_success())
                dispatch(application_show_spinner())
                showToast(dispatch, "Action completed successfully")
            }
        });
    }
}

export function toggleStoreBookModal() {
    return function (dispatch) {
        dispatch(store_book_modal())
        dispatch(store_book_clear())
    }
}

export function bookStoreFieldChange(data) {
    return function (dispatch) {
        dispatch(store_book_field_change(data))
    }
}

export function addBookToList(data) {
    return function (dispatch) {
        let validationErrors = validate(data);
        if (validationErrors.length > 0) {
            dispatch(store_book_validation_errors(validationErrors));
            return;
        }
        dispatch(store_book_add_to_list(data));
    }
}

export function removeBookFromList(data) {
    return function (dispatch) {
        dispatch(store_book_remove_from_list(data))
    }
}

export function store_book_add_store_begin() {
    return { type: type.STORE_BOOK_ADD_BOOKS_BEGIN }
}

export function store_book_add_store_error(message) {
    return { type: type.STORE_BOOK_ADD_BOOKS_ERROR, message }
}

export function store_book_add_store_success() {
    return { type: type.STORE_BOOK_ADD_BOOKS_SUCCESS }
}

export function store_book_add_to_list(data) {
    return { type: type.STORE_BOOK_ADD_TO_LIST, data, errors: [] }
}

export function store_book_remove_from_list(data) {
    return { type: type.STORE_BOOK_REMOVE_FROM_LIST, data }
}

export function store_book_field_change(data) {
    return { type: type.STORE_BOOK_FIELD_CHANGE, data }
}

export function store_book_modal() {
    return { type: type.STORE_BOOK_MODAL }
}

export function store_book_validation_errors(errors) {
    return { type: type.STORE_BOOK_VALIDATION_ERRORS, errors }
}

export function store_book_clear() {
    return { type: type.STORE_BOOK_CLEAR }
}