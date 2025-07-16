import { toggleTheme } from "../../store/themeSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

const DarkModeToggle = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const dispatch = useDispatch();
    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-800 text-black dark:text-white transition"
        >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
};

export default DarkModeToggle;
