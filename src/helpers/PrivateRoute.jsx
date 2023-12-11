import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ element }) => {
    const { user } = useContext(UserContext);
    
    return user ? element : <Navigate to="/login" />;
  };

export default PrivateRoute;