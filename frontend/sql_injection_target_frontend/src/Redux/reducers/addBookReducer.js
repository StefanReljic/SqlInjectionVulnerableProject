import * as type from '../actions/actionTypes'
import initialState from './initialState';

export default function bookReducer(state = initialState.addBookState, action) {

    switch (action.type) {
        case type.ADD_BOOK_CLEAR: {
            return {
                ...state, book: {
                    name: '',
                    writer: '',
                    publisher: '',
                    publishingYear: '',
                    photo: null
                },
                errors: []
            }
        }

        case type.ADD_BOOK_FIELD_CHANGE: {
            let book = { ...state.book }
            book[action.book.field] = action.book.value;
            return { ...state, book }
        }

        case type.ADD_BOOK_VALIDATION_ERRORS: {
            return { ...state, errors: action.errors }
        }

        case type.ADD_BOOK_BEGIN: {
            return { ...state, errors: [] }
        }

        case type.ADD_BOOK_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) }
        }

        case type.ADD_BOOK_SUCCESS: {
            return {
                ...state, book: {
                    name: '',
                    writer: '',
                    publisher: '',
                    publishingYear: '',
                    photo: null
                }, errors: []
            }
        }

        default:
            return state;
    }
}