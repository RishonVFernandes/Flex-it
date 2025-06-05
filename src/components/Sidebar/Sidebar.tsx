// import { useSidebar } from "../../context/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeSidebar } from "../../store/sidebarSlice";
import { Link } from "react-router-dom";
const Sidebar = () => {
    // const { isOpen, toggleSidebar } = useSidebar();

    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    const dispatch = useDispatch()

    if(!isOpen) return null;
    return (
        <>
            {/* {isOpen && ( */}
                <aside className="bg-blue-300 w-80 h-full absolute top-14 left-0 shadow-xl shadow-black rounded-r-xl">
                    <div className="flex justify-between items-center bg-blue-600 p-2 text-white border-xl border-b-2 border-blue-500 rounded-tr-xl">
                        <div className="text-lg">Sidebar</div>
                        <button
                            // onClick={toggleSidebar}
                            onClick={()=>dispatch(closeSidebar())}
                            className="w-9 h-9 bg-white text-blue-600 rounded-full text-2xl hover:bg-blue-200"
                        >
                            x
                        </button>
                    </div>
                    <ul className="bg-blue-600 flex flex-col items-center pt-2">
                        <Link to={'/todo'} className="text-white w-full py-2 text-center hover:bg-blue-500">
                            My Todo
                        </Link>
                        <Link to={'/chat'} className="text-white w-full py-2 text-center hover:bg-blue-500">
                            Chat
                        </Link>
                        <li className="text-white w-full py-2 text-center hover:bg-blue-500">
                            Services
                        </li>
                        <li className="text-white w-full py-2 text-center hover:bg-blue-500">
                            Users
                        </li>
                        <li className="text-white w-full py-2 text-center hover:bg-blue-500">
                            Settings
                        </li>
                    </ul>
                </aside>
            {/* )} */}
        </>
    );
};

export default Sidebar;
