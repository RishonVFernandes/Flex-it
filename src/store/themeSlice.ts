import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode:
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
};

if(initialState.darkMode) {
    document.documentElement.classList.add('dark');
}
else{
    document.documentElement.classList.remove('dark');
}
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem("theme", state.darkMode ? "dark" : "light");
            document.documentElement.classList.toggle("dark", state.darkMode);
        },
        setTheme: (state, action: PayloadAction<"dark" | "light">) => {
            state.darkMode = action.payload === "dark";
            localStorage.setItem("theme", action.payload);
            document.documentElement.classList.toggle("dark", state.darkMode);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
