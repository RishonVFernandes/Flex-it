import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { toggleSidebar } from "../../store/sidebarSlice";
import { useLogout } from "../../hooks/useLogout.ts";
import DarkModeToggle from "../DarkModeButton/DarkModeButton.tsx";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";

const Navbar = () => {
    const dispatch = useDispatch();
    const { logoutUser, isLoggingOut } = useLogout();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return (
        <>
            <div className="flex justify-between items-center bg-teal-500 h-15 px-5 sticky top-0 z-3 dark:bg-teal-800 dark:text-white">
                <div className="w-10" onClick={() => dispatch(toggleSidebar())}>
                    <img src={logo} alt="" className="hidden md:flex" />
                    <div className="md:hidden h-6 flex flex-col items-center gap-1 justify-center ">
                        <div className="w-8 h-1 bg-black dark:bg-white rounded-full"></div>
                        <div className="w-8 h-1 bg-black dark:bg-white rounded-full"></div>
                        <div className="w-8 h-1 bg-black dark:bg-white rounded-full"></div>
                    </div>
                </div>
                <nav className={`${styles.navbar} hidden md:block h-full`}>
                    <ul className="flex gap-10 h-full">
                        <li>Home</li>
                        <li>
                            <a href="/portfolio/about">About Us</a>
                        </li>
                        <li>Contact Us</li>
                        <li>Settings</li>
                        <button onClick={() => logoutUser()}>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </ul>
                </nav>
                <div className="flex gap-10">
                    <DarkModeToggle />
                    {!isAuthenticated ? (
                        <div className="flex items-center">
                            <button className="rounded-lg outline outline-teal-600 px-2 py-1 hover:bg-teal-600 hover:text-red-100 cursor-pointer">
                                <a href="/signup">Sign Up</a>
                            </button>
                            <button className="ml-4 rounded-lg outline outline-teal-600 px-2 py-1 hover:bg-teal-600 hover:text-red-100 cursor-pointer">
                                <a href="/login">Log In</a>
                            </button>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
