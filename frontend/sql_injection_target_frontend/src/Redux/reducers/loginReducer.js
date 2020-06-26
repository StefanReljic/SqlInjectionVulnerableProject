import * as type from '../actions/actionTypes'
import initialState from './initialState'

export default function loginReducer(state = initialState.login, action) {

  switch (action.type) {

    case type.LOGIN_BEGIN: {
      return {
        ...state, showLoading: true, errorMessage: ''
      }
    }

    case type.LOGIN_ERROR: {
      return {
        ...state, showLoading: false, username: '',
        password: '',
        errorMessage: action.result
      };
    }

    case type.LOGIN_SUCCESS: {
      return {
        ...state, showLoading: false, username: '',
        password: '',
        errorMessage: ''
      };
    }

    case type.LOGIN_FIELD_CHANGE: {
      return { ...state, [action.result.field]: action.result.value };
    }

    case type.LOGIN_CLEAR: {
      return {
        ...state, username: '',
        password: '',
        errorMessage: '',
        showLoading: false
      }
    }

    default:
      return state;
  }
}
