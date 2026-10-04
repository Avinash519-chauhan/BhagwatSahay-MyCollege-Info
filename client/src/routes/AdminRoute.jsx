import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const AdminRoute = ()=> {
    const {user, loading} = useAuth();

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role !== "admin"){
        return <Navigate to="/home" replace/>
    }

    return <Outlet />
}

export default AdminRoute;