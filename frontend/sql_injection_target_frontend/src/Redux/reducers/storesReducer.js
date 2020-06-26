import initialState from "./initialState";
import * as type from '../actions/actionTypes'

export default function storesReducer(state = initialState.stores, action) {
    switch (action.type) {

        case type.STORES_FETCH_BEGIN: {
            return { ...state, errorMessage: "" };
        }

        case type.STORES_FETCH_ERROR: {
            return { ...state, errorMessage: action.message };
        }

        case type.STORES_FETCH_SUCCESS: {
            return { ...state, list: action.data.list, totalPages: action.data.totalPages, errorMessage: "" }
        }

        case type.STORES_PARAMS_CHANGE: {
            let searchParams = { ...state.searchParams }
            searchParams[action.params.field] = action.params.value;
            return { ...state, searchParams }
        }

        default:
            return state;
    }
}