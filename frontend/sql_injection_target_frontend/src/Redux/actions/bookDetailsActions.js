import * as type from "./actionTypes";
import { application_show_spinner } from "./applicationActions";
import { get } from "./requests";

export function getStoresForBook(searchParams) {
    return function (dispatch) {
        const endpoint = "/book/getStoresForBook"
        const actions = {
            beginAction: () => dispatch(book_details_fetch_stores_begin()),
            errorAction: error => dispatch(book_details_fetch_stores_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        }
        get(endpoint, searchParams, actions).then(data => {
            const list = data.list.map(item => { return { ...item, selectedQuantity: 1 } })
            dispatch(book_details_fetch_stores_success({ list, totalPages: data.totalPages }));
            dispatch(application_show_spinner())
        });
    }
}

export function quantityChange(result) {
    return function (dispatch) {
        dispatch(book_details_quantity_change(result))
    }
}

export function onPageChange(pageNumber) {
    return function (dispatch) {
        dispatch(book_details_page_number(pageNumber));
    }
}

export function book_details_fetch_stores_begin() {
    return { type: type.BOOK_DETAILS_FETCH_STORES_BEGIN }
}

export function book_details_fetch_stores_error(message) {
    return { type: type.BOOK_DETAILS_FETCH_STORES_ERROR, message }
}

export function book_details_fetch_stores_success(data) {
    return { type: type.BOOK_DETAILS_FETCH_STORES_SUCCESS, data }
}

export function book_details_page_number(pageNumber) {
    return { type: type.BOOK_DETAILS_PAGE_NUMBER, pageNumber }
}

export function book_details_quantity_change(result) {
    return { type: type.BOOK_DETAILS_QUANTITY_CHANGE, result };
}

