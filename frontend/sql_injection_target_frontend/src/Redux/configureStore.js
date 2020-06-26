import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk'

export default function configureStore(initalState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTESION_COMPOSE__ || compose;

    const persistConfig = { key: 'root', storage }
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    let store = createStore(
        persistedReducer,
        initalState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware))
    )
    let persistor = persistStore(store)

    return { store, persistor };
}
