// Importing necessary libraries
import axios from "axios"; // For making HTTP requests
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens
import dayjs from "dayjs"; // For working with dates
import { useContext } from "react"; // For using React context
import AuthContext from "../context/AuthContext"; // Importing AuthContext to manage authentication state


// Base URL for API requests
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Custom hook to create and manage Axios instance with automatic token handling
const useAxios = () => {
    // Accessing auth tokens and functions from AuthContext
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    // Creating an Axios instance with the base URL and authorization header using access token
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    // Axios request interceptor to check token expiration and refresh if needed
    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access); // Decode the access token to get user info
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // Check if token has expired

        if (!isExpired) return req; // If the token is not expired, proceed with the request

        // If the token is expired, request a new access token using the refresh token
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        });
        
        // Store the new tokens in localStorage and update context state
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data); // Update the auth tokens in context
        setUser(jwtDecode(response.data.access)); // Decode and update user data in context

        // Add the new access token to the request header
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req; // Return the modified request
    });

    // Return the configured Axios instance
    return axiosInstance;
};

export default useAxios;
