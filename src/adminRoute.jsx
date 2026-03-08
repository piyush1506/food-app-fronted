import { Navigate} from "react-router-dom";

export default function AdminRoute({ children }){
    // const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        return <Navigate to='/login' replace/>
    }
    if(user.usertype !== 'admin'){
        return <Navigate to='/dash' replace/>
    }
    return children
}