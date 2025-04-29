import {createSlice} from '@reduxjs/toolkit';

interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true;
        },
        closeSidebar: (state) => {
            state.isOpen = false;
        },
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        setSidebar: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const {openSidebar, closeSidebar, toggleSidebar, setSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;