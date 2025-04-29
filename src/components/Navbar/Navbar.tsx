import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/sidebarSlice";
// import { useSidebar } from "../../context/SidebarContext";

const Navbar = () => {
    // const { isOpen, toggleSidebar } = useSidebar();
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex justify-between items-center bg-blue-400 h-15 px-5">
                <div>LOGO</div>
                <nav className="">
                    <ul className="flex gap-20">
                        {/* <li onClick={toggleSidebar}>Home</li> */}
                        <li onClick={() => dispatch(toggleSidebar())}>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Settings</li>
                    </ul>
                </nav>
                <div className="flex gap-10">
                    <button className="rounded-full outline outline-blue-900 px-2 py-1 hover:bg-blue-900 hover:text-red-100">
                        Sign Up
                    </button>
                    <button className="bg-mint-500">Log In</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
