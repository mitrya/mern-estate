import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice.js'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/lib/persistStore'

const rootReducer = combineReducers({user : userReducer});

const persistConfig = {
        key : 'root',
        storage: storage,
        version : 1,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
        reducer: persistedReducer,
        middleware : 
        (getDefaultMiddleWare) => getDefaultMiddleWare({
                serializableCheck:false,
            }),
        
});

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

