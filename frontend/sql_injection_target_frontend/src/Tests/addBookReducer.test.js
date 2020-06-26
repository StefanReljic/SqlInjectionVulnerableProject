import addBookReducer from '../Redux/reducers/addBookReducer'
import * as type from '../Redux/actions/actionTypes'
import deepFreeze from 'deep-freeze'

test('Add book reducer - clear page', () => {
    const prevState = {
        book: {
            name: 'Name',
            writer: 'Writer',
            publisher: 'Publisher',
            publishingYear: 1232,
            photo: 'photo'
        },
        errors: ['Greska 1', 'Greska 2'],
    }
    const nextState = {
        book: {
            name: '',
            writer: '',
            publisher: '',
            publishingYear: '',
            photo: null
        },
        errors: [],
    }
    const action = { type: type.ADD_BOOK_CLEAR };

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
});

test('Add book reducer - field change', () => {
    const prevState = {
        book: {
            name: '',
            writer: '',
            publisher: '',
            publishingYear: '',
            photo: null
        },
        errors: [],
    }
    const nextState = {
        book: {
            name: 'Name',
            writer: '',
            publisher: '',
            publishingYear: '',
            photo: null
        },
        errors: [],
    }
    const action = { type: type.ADD_BOOK_FIELD_CHANGE, book: { field: 'name', value: 'Name' } }

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Add book reducer - validation errors', () => {
    const errors = ['Error 1', 'Error 2']
    const prevState = { errors: [] }
    const nextState = { errors }
    const action = { type: type.ADD_BOOK_VALIDATION_ERRORS, errors };

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Add book reducer - add book begin', () => {
    const prevState = { errors: ['Error 1', 'Error 2'] }
    const nextState = { errors: [] };
    const action = { type: type.ADD_BOOK_BEGIN }

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState)
})

test('Add book reducer - add book error', () => {
    const prevState = { errors: [] }
    const nextState = { errors: ['Error 1'] }
    const action = { type: type.ADD_BOOK_ERROR, message: 'Error 1' };

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState);
})

test('Add book reducer - add book success', () => {
    const prevState = {
        book: {
            name: 'Name',
            writer: 'Writer',
            publisher: 'Publisher',
            publishingYear: 1987,
            photo: 'photo'
        }, errors: []
    }
    const nextState = {
        book: {
            name: '',
            writer: '',
            publisher: '',
            publishingYear: '',
            photo: null
        }, errors: []
    }
    const action = { type: type.ADD_BOOK_SUCCESS }

    deepFreeze(prevState);
    const calculatedState = addBookReducer(prevState, action);
    expect(nextState).toEqual(calculatedState)
})