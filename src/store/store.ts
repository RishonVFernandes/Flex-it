import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebarSlice';
import themeReducer from './themeSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        theme: themeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;