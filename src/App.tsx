import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import UsersPage from "./pages/Users/UsersPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="home" element={<Home/>} />
                    <Route path="user" element={<UsersPage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
