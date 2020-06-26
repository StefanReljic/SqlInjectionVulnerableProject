import initialState from "./initialState";
import * as type from '../actions/actionTypes'

export default function storeReducer(state = initialState.storeState, action) {
    switch (action.type) {

        case type.ADD_STORE_BEGIN: {
            return { ...state, errors: [] }
        }

        case type.ADD_STORE_ERROR: {
            return { ...state, errors: [...state.errors].concat(action.message) }
        }

        case type.ADD_STORE_SUCCESS: {
            return { ...state, errors: [], isStoreModalOpen: false }
        }

        case type.ADD_STORE_VALIDATION_ERRORS: {
            return { ...state, errors: action.errors }
        }

        case type.ADD_STORE_FIELD_CHANGE: {
            let store = { ...state.store }
            store[action.params.field] = action.params.value;
            return { ...state, store }
        }

        case type.ADD_STORE_MODAL: {
            const store = {
                name: "",
                address: "",
                phone: ""
            }
            return { ...state, isStoreModalOpen: !state.isStoreModalOpen, store }
        }

        default:
            return state;
    }
}