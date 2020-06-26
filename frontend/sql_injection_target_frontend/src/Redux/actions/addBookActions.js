import * as type from './actionTypes'
import { application_show_spinner, showToast } from './applicationActions';
import { books_modal } from './booksActions';
import { post } from './requests';
import { validate } from './validators/bookValidator';

export function addBook(book) {
    return function (dispatch) {
        dispatch(add_book_begin())
        let validationErrors = validate(book);
        if (validationErrors.length > 0) {
            dispatch(add_book_validation_errors(validationErrors))
            return;
        }
        const endpoint = "/book/addBook"
        const actions = {
            beginAction: () => dispatch(add_book_begin()),
            errorAction: error => dispatch(add_book_error(error)),
            showSpinner: () => dispatch(application_show_spinner())
        }
        post(endpoint, book, actions).then(data => {
            if (data.message) {
                dispatch(add_book_success())
                dispatch(add_book_clear())
                dispatch(books_modal())
                showToast(dispatch, "Action completed successfully")
            }
        });
    }
}

export function addBookFieldChange(book) {
    return function (dispatch) {
        return dispatch(add_book_field_change(book))
    }
}

export function addBookUploadPhoto(event) {
    return function (dispatch) {
        let file = event.target.files[0];
        if (file) {
            let read = new FileReader();
            read.onloadend = () => {
                dispatch(add_book_field_change({ field: "photo", value: read.result }))
            };
            read.readAsDataURL(file);
        }
    }
}

export function add_book_clear() {
    return { type: type.ADD_BOOK_CLEAR }
}

export function add_book_field_change(book) {
    return { type: type.ADD_BOOK_FIELD_CHANGE, book }
}

export function add_book_begin() {
    return { type: type.ADD_BOOK_BEGIN }
}

export function add_book_error(message) {
    return { type: type.ADD_BOOK_ERROR, message }
}

export function add_book_success() {
    return { type: type.ADD_BOOK_SUCCESS }
}

export function add_book_validation_errors(errors) {
    return { type: type.ADD_BOOK_VALIDATION_ERRORS, errors }
}