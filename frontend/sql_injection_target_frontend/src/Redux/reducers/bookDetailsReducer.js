import initialState from "./initialState";
import * as type from '../actions/actionTypes'

export default function bookDetailsReducer(state = initialState.bookDetails, action) {
    switch (action.type) {

        case type.BOOK_DETAILS_FETCH_STORES_BEGIN: {
            return { ...state, errorMessage: '', pageNumber: 0 };
        }

        case type.BOOK_DETAILS_FETCH_STORES_ERROR: {
            return { ...state, errorMessage: action.message };
        }

        case type.BOOK_DETAILS_FETCH_STORES_SUCCESS: {
            return { ...state, storesForBook: action.data.list, totalPages: action.data.totalPages };
        }

        case type.BOOK_DETAILS_QUANTITY_CHANGE: {
            let selectedQuantity = parseInt(action.result.selectedQuantity);
            return {
                ...state, storesForBook: state.storesForBook.map(item => {
                    if (item.bookId === action.result.bookId && item.storeId === action.result.storeId) {
                        if (selectedQuantity > item.quantityInStore)
                            selectedQuantity = item.quantityInStore;
                        else
                            if (selectedQuantity < 1)
                                selectedQuantity = 1;
                        return { ...item, selectedQuantity }
                    }
                    return item;
                })
            };
        }

        case type.BOOK_DETAILS_PAGE_NUMBER: {
            return { ...state, pageNumber: action.pageNumber }
        }

        default:
            return state;
    }
}