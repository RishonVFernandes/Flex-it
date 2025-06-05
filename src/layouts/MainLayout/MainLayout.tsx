import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
