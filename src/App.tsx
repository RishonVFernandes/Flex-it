import { useState } from "react";
import "./App.css";
import CubeFace from "./components/CubeFace/CubeFace";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
    return (
        <>
            <SidebarProvider>
                <div>
                    <Navbar />
                    
                    <Home />
                </div>
            </SidebarProvider>
        </>
    );
}

export default App;
