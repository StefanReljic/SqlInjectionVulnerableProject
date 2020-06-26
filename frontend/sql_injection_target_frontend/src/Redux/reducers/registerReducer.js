import * as type from '../actions/actionTypes'
import initialState from './initialState';

export default function userReducer(state = initialState.register, action) {
  switch (action.type) {
    case type.REGISTER_USER_BEGIN: {
      return { ...state, showLoading: true, isUserCreated: false, errorMessage: '' };
    }

    case type.REGISTER_USER_ERROR: {
      return { ...state, showLoading: false, errorMessage: action.message };
    }

    case type.REGISTER_USER_SUCCESS: {
      return {
        ...state, showLoading: false, isUserCreated: true, errorMessage: '', username: '',
        password: '',
        firstName: '',
        lastName: '',
      };
    }

    case type.REGISTER_FIELD_CHANGE: {
      return { ...state, [action.result.field]: action.result.value };
    }

    case type.REGISTER_CLEAR: {
      return {
        ...state, isUserCreated: false, errorMessage: '', username: '',
        password: '',
        firstName: '',
        lastName: '', photo: ''
      }
    }

    default:
      return state;
  }
}
