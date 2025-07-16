import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const PortfolioPageLayout = () => {
    return (
        <>
            <Navbar />
            <div className="">
                <Sidebar />
                <main className="">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default PortfolioPageLayout;
