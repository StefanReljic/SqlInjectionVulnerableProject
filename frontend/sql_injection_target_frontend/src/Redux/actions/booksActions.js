import * as type from "./actionTypes";
import { application_show_spinner, application_fetch_books_for_select } from "./applicationActions";
import { add_book_clear } from "./addBookActions";
import { post } from "./requests";

export function fetchBooks(params) {
    return function (dispatch) {
        const endpoint = "/book/getBooks"
        const actions = {
            beginAction: () => dispatch(books_fetch_begin()),
            errorAction: error => dispatch(books_fetch_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        }
        post(endpoint, params, actions).then(data => {
            if (params.pageNumber < 0)
                dispatch(application_fetch_books_for_select(data));
            else {
                dispatch(books_fetch_success(data))
            }
            dispatch(application_show_spinner())
        });
    }
}

export function clearBooksParams() {
    return function (dispatch) {
        dispatch(books_params_clear());
    }
}

export function searchChange(params) {
    return function (dispatch) {
        dispatch(books_params_change(params))
    }
}

export function onPageChange(page) {
    return function (dispatch) {
        dispatch(books_change_page(page))
    }
}

export function toggleBooksModal() {
    return function (dispatch) {
        dispatch(books_modal())
        dispatch(add_book_clear())
    }
}

export function openBookDetails(book) {
    return function (dispatch) {
        dispatch(book_details_id_change(book));
        dispatch(books_modal());
    }
}

export function selectedStoreChange(selectedStore) {
    return function (dispatch) {
        dispatch(books_store_change(selectedStore));
    }
}

export function book_details_id_change(book) {
    return { type: type.BOOK_DETAILS_ID_CHANGE, book }
}

export function books_modal() {
    return { type: type.BOOKS_MODAL }
}

export function books_params_clear() {
    return { type: type.BOOKS_PARAMS_CLEAR }
}

export function books_store_change(selectedStore) {
    return { type: type.BOOKS_STORE_CHANGE, selectedStore }
}

export function books_change_page(page) {
    return { type: type.BOOKS_CHANGE_PAGE, page }
}

export function books_fetch_begin(params) {
    return { type: type.BOOKS_FETCH_BEGIN, params };
}

export function books_fetch_error(params) {
    return { type: type.BOOKS_FETCH_ERROR, params };
}

export function books_fetch_success(books) {
    return { type: type.BOOKS_FETCH_SUCCESS, books };
}

export function books_params_change(params) {
    return { type: type.BOOKS_PARAMS_CHANGE, params }
}