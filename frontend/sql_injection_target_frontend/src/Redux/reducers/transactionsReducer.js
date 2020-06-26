import * as type from '../actions/actionTypes'
import initialState from './initialState'

export default function transactionReducer(state = initialState.transactions, action) {
    switch (action.type) {
        case type.TRANSACTIONS_FETCH_BEGIN: {
            return { ...state, errors: [] }
        }

        case type.TRANSACTIONS_FETCH_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) }
        }

        case type.TRANSACTIONS_FETCH_SUCCESS: {
            return { ...state, errors: [], transactionList: action.transactionList }
        }

        case type.TRANSACTIONS_DETAILS_FETCH_BEGIN: {
            return { ...state, errors: [] };
        }

        case type.TRANSACTIONS_DETAILS_FETCH_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) };
        }

        case type.TRANSACTIONS_DETAILS_FETCH_SUCCESS: {
            return { ...state, errors: [], transactionDetails: action.transactionDetails };
        }

        case type.TRANSACTIONS_SELECT_CHANGE: {
            let selectedTransaction = [...state.transactionList].find(transaction =>
                transaction.cartId === action.transaction.value);
            return {
                ...state, selectedTransaction: { ...action.transaction, totalPrice: selectedTransaction.totalPrice }
            }
        }

        default:
            return state;
    }
}