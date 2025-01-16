import { useContext } from 'react' // Importing useContext to use the authentication context
import AuthContext from '../context/AuthContext' // Importing AuthContext to access auth-related functions
import { Link } from 'react-router-dom' // Importing Link for navigation between pages
import taskboardLogo from '../images/taskboard-logo.png'; // Importing the taskboard logo


function Navbar() {

    // Extracting the logoutUser function from the AuthContext
    const { logoutUser } = useContext(AuthContext)
    
    // Retrieving authTokens from localStorage to determine if the user is logged in
    const token = localStorage.getItem("authTokens")

    return (
        <div>
            {/* Navbar component */}
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                <div class="container-fluid">
                    {/* Logo and Home link */}
                    <Link class="navbar-brand" to="/" style={{ paddingRight: "30px" }}>
                        <img style={{ width: "40px" }} src={taskboardLogo} alt="Logo" />
                    </Link>

                    {/* Hamburger menu button for mobile devices */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation links */}
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav" style={{ display: 'flex', marginLeft: 'auto' }}>

                            {/* If the user is not logged in (token is null), show Login and Register options */}
                            {token === null &&
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link text-light" to="/login"><i className='fas fa-sign-in-alt'></i> Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link text-light" to="/register"><i className='fas fa-user-plus'></i> Register</Link>
                                    </li>
                                </>
                            }

                            {/* If the user is logged in (token exists), show Logout option */}
                            {token !== null &&
                                <li class="nav-item">
                                    <a class="nav-link text-light" onClick={logoutUser} style={{ cursor: "pointer" }}> <i className='fas fa-sign-out-alt'></i>Logout</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Navbar
