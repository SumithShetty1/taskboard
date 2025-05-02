// Importing necessary libraries
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // To decode JWT tokens
import { useNavigate } from "react-router-dom"; // For navigating to different routes


// SweetAlert for notifications
const swal = require('sweetalert2')

// Create AuthContext for global state management
const AuthContext = createContext();

export default AuthContext

// AuthProvider component wraps the app and provides authentication context
export const AuthProvider = ({ children }) => {
    // State to store auth tokens, or load them from localStorage if they exist
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    // State to store the decoded user data, or load it from localStorage
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    // State to manage loading state for the app
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // For navigation after login or logout

    // Function to log in a user, sends a POST request with credentials to API
    const loginUser = async (email, password) => {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json();
        console.log(data);

        if (response.status === 200) { // If login is successful
            setAuthTokens(data) // Store tokens
            setUser(jwtDecode(data.access)) // Store decoded user info
            localStorage.setItem("authTokens", JSON.stringify(data)) // Store tokens in localStorage
            navigate("/"); // Redirect to home page
            swal.fire({ // Show success alert
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 1500,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            })
        } else { // If login fails
            swal.fire({ // Show error alert
                title: "Username or password does not exists",
                icon: "error",
                toast: true,
                timer: 1500,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            })
        }
    }

    // Function to register a new user and then log them in
    const registerUser = async (email, username, password, password2) => {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })

        if (response.status === 201) { // If registration is successful
            loginUser(email, password) // Log the user in
            navigate("/"); // Redirect to home page
            swal.fire({ // Show success alert
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 1500,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            })
        } else { // If registration fails
            swal.fire({ // Show error alert
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 1500,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            })
        }
    }

    // Function to log out the user
    const logoutUser = () => {
        setAuthTokens(null) // Clear auth tokens
        setUser(null) // Clear user data
        localStorage.removeItem("authTokens") // Remove tokens from localStorage
        navigate("/login"); // Redirect to login page
        swal.fire({ // Show logout success alert
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 1500,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
        })
    }

    // Context data includes user, authTokens, and functions for login/logout/register
    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    // useEffect hook to update user state based on authTokens and avoid unnecessary re-renders
    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access)) // Decode token to get user info
        }

        setLoading(false) // Set loading to false once the token check is done
    }, [authTokens, loading])

    // Return context provider with loading condition to prevent rendering before auth data is set
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children} {/* Only render children after loading is complete */}
        </AuthContext.Provider>
    )
}
