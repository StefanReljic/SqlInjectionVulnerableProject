import initialState from "./initialState";
import * as type from '../actions/actionTypes'

export default function storeBookReducer(state = initialState.storeBook, action) {
    switch (action.type) {

        case type.STORE_BOOK_FIELD_CHANGE: {
            return { ...state, [action.data.field]: action.data.value }
        }

        case type.STORE_BOOK_MODAL: {
            return { ...state, isStoreBookModalOpen: !state.isStoreBookModalOpen }
        }

        case type.STORE_BOOK_CLEAR: {
            return { ...state, addedBooks: [], selectedStore: '', selectedBook: '', quantity: 0, price: 0, errors: [] }
        }

        case type.STORE_BOOK_ADD_TO_LIST: {
            const book = {
                storeId: action.data.selectedStore.value,
                storeName: action.data.selectedStore.label,
                bookId: action.data.selectedBook.value,
                bookName: action.data.selectedBook.label,
                quantity: parseInt(action.data.quantity),
                price: parseFloat(action.data.price)
            };
            let bookExist = false;
            let addedBooks = state.addedBooks.map(item => {
                if (item.bookId === book.bookId && item.storeId === book.storeId) {
                    bookExist = true;
                    return { ...item, quantity: item.quantity + book.quantity };
                }
                return item;
            });
            if (!bookExist)
                addedBooks = addedBooks.concat([book]);

            return { ...state, addedBooks, selectedStore: '', selectedBook: '', quantity: 0, price: 0, errors: [] }
        }

        case type.STORE_BOOK_REMOVE_FROM_LIST: {
            const index = state.addedBooks.findIndex(item => item.bookId === action.data.bookId || item.storeId === action.data.storeId)
            let addedBooks = [...state.addedBooks];
            return {
                ...state, addedBooks: addedBooks.slice(0, index).concat(addedBooks.slice(index + 1))
            }
        }

        case type.STORE_BOOK_VALIDATION_ERRORS: {
            return { ...state, errors: action.errors }
        }

        case type.STORE_BOOK_ADD_BOOKS_BEGIN: {
            return { ...state, errors: [] }
        }

        case type.STORE_BOOK_ADD_BOOKS_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) }
        }

        case type.STORE_BOOK_ADD_BOOKS_SUCCESS: {
            return { ...state, addedBooks: [], isStoreBookModalOpen: false, errors: [] }
        }

        default:
            return state;
    }
}