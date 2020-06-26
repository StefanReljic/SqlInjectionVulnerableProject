import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function booksReducer(state = initialState.books, action) {
    switch (action.type) {

        case type.BOOKS_FETCH_BEGIN:
            return { ...state, errorMesage: "" };

        case type.BOOKS_FETCH_ERROR:
            return { ...state, errorMessage: action.message };

        case type.BOOKS_FETCH_SUCCESS:
            return { ...state, list: action.books.list, totalPages: action.books.totalPages };

        case type.BOOKS_CHANGE_PAGE: {
            let searchParams = { ...state.searchParams }
            searchParams.pageNumber = action.page;
            return { ...state, searchParams }
        }

        case type.BOOKS_PARAMS_CLEAR: {
            const searchParams = {
                ...state.searchParams,
                selectedStore: '',
                name: '',
                writer: '',
                publisher: '',
                publishingYear: 1,
                totalPages: 0,
                pageNumber: 0
            }
            return { ...state, searchParams }
        }

        case type.BOOKS_PARAMS_CHANGE: {
            let searchParams = { ...state.searchParams }
            searchParams[action.params.field] = action.params.value;
            return { ...state, searchParams }
        }

        case type.BOOKS_STORE_CHANGE: {
            let searchParams = { ...state.searchParams }
            searchParams.selectedStore = action.selectedStore.value;
            return { ...state, searchParams }
        }

        case type.BOOKS_MODAL: {
            let bookDetailsObject = { ...state.bookDetailsObject }
            if (state.isBookModalOpen)
                bookDetailsObject = {};
            return {
                ...state, isBookModalOpen: !state.isBookModalOpen, bookDetailsObject
            }
        }

        case type.BOOK_DETAILS_ID_CHANGE: {
            return { ...state, bookDetailsObject: action.book }
        }

        default:
            return state;
    }
}