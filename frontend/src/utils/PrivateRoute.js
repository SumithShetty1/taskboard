// Importing necessary modules
import { Outlet, Navigate } from "react-router-dom"; // For routing and navigation
import { useContext } from "react"; // For using context
import AuthContext from "../context/AuthContext"; // Importing the AuthContext


// PrivateRoute component that ensures the user is authenticated
const PrivateRoute = () => {
    // Accessing the user data from the AuthContext
    let { user } = useContext(AuthContext);

    // If the user is logged in, render the child routes; otherwise, redirect to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
