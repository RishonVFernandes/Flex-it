import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UsersPage from "./pages/Users/UsersPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodosPage from "./pages/TodosPage/TodosPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage.tsx";
import Sudoku from "./pages/Game/Sudoku.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import PortfolioPageLayout from "./layouts/PortfolioPageLayout/PortfolioPageLayout.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import AboutUsPage from "./pages/AbourUsPage/AboutUsPage.tsx";
import ArchivesPage from "./pages/ArchivesPage/ArchivesPage.tsx";
import ArchivesList from "./pages/ArchivesPage/ArchivesList.tsx"
import { useAuth } from "./hooks/useAuth.ts";

function App() {
    useAuth();

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route path="/" element={<PortfolioPageLayout />}>
                    <Route index element={<PortfolioPage />} />
                </Route>
                <Route path="/rishon" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="home2" element={<Home />} />
                    <Route path="about" element={<AboutUsPage />}></Route>
                    <Route path="user" element={<UsersPage />} />
                    <Route path="todo" element={<TodosPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="play" element={<Sudoku />} />
                    <Route path="archives" element={<ArchivesList/>}></Route>
                    <Route path="archives/:id" element={<ArchivesPage/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
