import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import UsersPage from "./pages/Users/UsersPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodosPage from "./pages/TodosPage/TodosPage";
import AnimationsPage from "./pages/Animations/AnimationsPage.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="rishon" element={<PortfolioPage/>}></Route>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="home" element={<Home/>} />
                    <Route path="user" element={<UsersPage/>} />
                    <Route path="todo" element={<TodosPage/>} />
                    <Route path="chat" element={<ChatPage/>} />
                    <Route path="animation" element={<AnimationsPage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
