import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import booksReducer from './booksReducer';
import cartReducer from './cartReducer';
import addBookReducer from './addBookReducer'
import applicationReducer from './applicationReducer';
import storesReducer from './storesReducer'
import storeReducer from './storeReducer'
import storeBookReducer from "./storeBookReducer"
import bookDetailsReducer from './bookDetailsReducer'
import transactionsReducer from './transactionsReducer'

const rootReducer = combineReducers({
    loginReducer, applicationReducer, registerReducer, booksReducer,
    cartReducer, addBookReducer, storesReducer, storeReducer, storeBookReducer, bookDetailsReducer,
    transactionsReducer
})

export default rootReducer;