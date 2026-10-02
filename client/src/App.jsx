import {Route,Routes} from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/user/Home"
import Teachers from "./pages/user/Teachers"
import NoticeBoard from "./pages/user/NoticeBoard"
import Documents from "./pages/user/Documents"
import Profile from "./pages/user/Profile"
import Dashboard from "./pages/admin/Dashboard"
import TeacherData from "./pages/admin/TeacherData"
import NoticeBoardData from "./pages/admin/NoticeBoardData"
import UserData from "./pages/admin/UserData"
import {AuthProvider} from "./context/AuthContext";

const App = ()=>{
    return(
        <AuthProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/home" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/teacher" element={<TeacherData />} />
            <Route path="/admin/noticeboard" element={<NoticeBoardData />} />
            <Route path="/admin/user" element={<UserData />} />
        </Routes>
        </AuthProvider>
    )
}

export default App;