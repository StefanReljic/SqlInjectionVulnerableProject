import initialState from "./initialState";
import * as type from '../actions/actionTypes'

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {

        case type.CART_ADD: {
            const index = state.items.findIndex(item => item.bookId === action.item.bookId && item.storeId === action.item.storeId);
            let items = [...state.items]
            if (index !== -1)
                items = state.items.map(item => {
                    if (item.bookId === action.item.bookId && item.storeId === action.item.storeId)
                        return { ...item, quantity: item.quantity + action.item.selectedQuantity };
                    return item;
                })
            else
                items.push(action.item)
            return {
                ...state, items, totalQuantity: state.totalQuantity + action.item.selectedQuantity,
                totalPrice: state.totalPrice + action.item.selectedQuantity * action.item.price
            };
        }

        case type.CART_REMOVE: {
            const index = state.items.findIndex(item => item.bookId === action.item.bookId && item.storeId === action.item.storeId);
            let price = state.items[index].price * state.items[index].selectedQuantity
            let items = state.items.slice(0, index).concat(state.items.slice(index + 1))
            return { ...state, items, totalPrice: state.totalPrice - price };
        }

        case type.CART_COMPLETE_PAYMENT_BEGIN: {
            return { ...state, errors: [] };
        }

        case type.CART_COMPLETE_PAYMENT_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) }
        }

        case type.CART_COMPLETE_PAYMENT_SUCCESS: {
            return {
                ...state, errors: [], items: [],
                totalQuantity: 0,
                totalPrice: 0,
            }
        }

        case type.CART_CLEAR_ERROR_MESSAGES: {
            return { ...state, errors: [] }
        }

        default:
            return state;
    }
}