import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { closeSidebar } from "../../store/sidebarSlice";
const Sidebar = () => {
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    if (!isOpen) return null;
    return (
        <>
            <aside className="bg-blue-900 w-80 h-full fixed top-0 left-0 shadow-xl shadow-black rounded-r-xl dark:bg-teal-900 z-91">
                <div className="flex justify-between items-center bg-blue-600 p-2 text-white border-xl border-b-2 border-blue-500 rounded-tr-xl dark:bg-teal-600 dark:border-teal-500">
                    <div className="text-lg">Sidebar</div>
                    <button
                        onClick={() => dispatch(closeSidebar())}
                        className="w-9 h-9 bg-white text-blue-600 rounded-full text-2xl hover:bg-blue-200 dark:text-teal-600"
                    >
                        x
                    </button>
                </div>
                <ul className="bg-blue-600 flex flex-col items-center pt-2 dark:bg-teal-600">
                    <Link
                        to={"/home"}
                        onClick={() => dispatch(closeSidebar())}
                        className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800"
                    >
                        Home
                    </Link>
                    <Link
                        to={"/todo"}
                        onClick={() => dispatch(closeSidebar())}
                        className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800"
                    >
                        My Todo
                    </Link>
                    <Link
                        to={"/chat"}
                        onClick={() => dispatch(closeSidebar())}
                        className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800"
                    >
                        Chat
                    </Link>
                    <li className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800">
                        Services
                    </li>
                    <li className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800">
                        Logout
                    </li>
                    <li className="text-white w-full py-2 text-center hover:bg-blue-500 dark:hover:bg-teal-800">
                        Settings
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
