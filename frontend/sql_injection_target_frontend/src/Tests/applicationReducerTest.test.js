import applicationReducer from '../Redux/reducers/applicationReducer'
import * as type from '../Redux/actions/actionTypes'
import deepFreeze from 'deep-freeze'


test('Application reducer - change tab', () => {
    const prevState = { selectedTabIndex: 0 };
    const nextState = { selectedTabIndex: 1 }
    const action = { type: type.APPLICATION_CHANGE_TAB, tab: 1 }

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - show spinner', () => {
    const prevState = { showSpinner: false };
    const nextState = { showSpinner: true };
    const action = { type: type.APPLICATION_SHOW_SPINNER }

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action)
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - fetch stores for select', () => {
    const stores = [{ storeId: 1, name: 'Store', address: 'Address', phone: '111/111-111' }]
    const prevState = { stores: [] }
    const nextState = { stores }
    const action = { type: type.APPLICATION_FETCH_STORES_FOR_SELECT, stores }

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action)
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - fetch books for select', () => {
    const books = [{ bookId: 1, name: 'Book', writer: 'Writer', publisher: 'Publisher', publishingYear: 1987 }]
    const prevState = { books: [] }
    const nextState = { books };
    const action = { type: type.APPLICATION_FETCH_BOOKS_FOR_SELECT, books };

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - user logged in', () => {
    const prevState = { isLoggedIn: false };
    const nextState = { isLoggedIn: true };
    const action = { type: type.APPLICATION_USER_LOGGED, isLoggedIn: true };

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - set user details', () => {
    const details = {
        username: 'Username',
        firstName: 'First name',
        lastName: 'Last name',
        photo: 'photo',
        accountBalance: 1234,
    }
    const prevState = {
        userDetails: {
            username: '',
            firstName: '',
            lastName: '',
            photo: '',
            accountBalance: 0,
        }
    }
    const nextState = { userDetails: details }
    const action = { type: type.APPLICATION_SET_USER_DETAILS, details }

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
});

test('Application reducer - set account balance', () => {
    const userDetails = {
        username: '',
        firstName: '',
        lastName: '',
        photo: '',
        accountBalance: 0,
    }
    const prevState = { userDetails }
    const nextState = { userDetails: { ...userDetails, accountBalance: 1234 } }
    const action = { type: type.APPLICATION_SET_USER_ACCOUNT_BALANCE, balance: 1234 }

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Application reducer - show toast', () => {
    const prevState = { showToast: false, toastMessage: '' };
    const nextState = { showToast: true, toastMessage: 'Toast' }
    const action = { type: type.APPLICATION_SHOW_TOAST, toastInfo: { showToast: true, toastMessage: 'Toast' } };

    deepFreeze(prevState);
    const calculatedState = applicationReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})