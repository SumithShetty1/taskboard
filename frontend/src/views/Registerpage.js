import { useState, useContext } from 'react' // Importing React hooks for state and context
import { Link } from 'react-router-dom' // Importing Link for navigation between pages
import AuthContext from '../context/AuthContext' // Importing the authentication context


function Registerpage() {

    // Local state for form fields (email, username, password, and password confirmation)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Extracting the registerUser function from the AuthContext
    const { registerUser } = useContext(AuthContext)

    // Handling form submission
    const handleSubmit = async e => {
        e.preventDefault()
        // Calling registerUser function passed from AuthContext
        setIsLoading(true) // Set loading to true when registration starts
        try {
            await registerUser(email, username, password, password2)
        } catch (error) {
            console.error("Registration failed:", error)
            // Display error notification
            Swal.fire({
                title: "Registration failed",
                icon: "error",
                toast: true,
                timer: 600,
                position: "top-right",
                timerProgressBar: true,
            })
        } finally {
            setIsLoading(false) // Set loading to false when done
        }
    }

    return (
        <div>
            <>
                {/* Registration page layout */}
                <section style={{ backgroundColor: "#9A616D" }}>
                    <div className="container h-100" style={{ paddingTop: "70px", paddingBottom: "50px" }}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: "1rem" }}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                {/* Form for registering a new user */}
                                                <form onSubmit={handleSubmit}>
                                                    {/* Welcome section */}
                                                    <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                                                        <i
                                                            className="fas fa-cubes fa-2x me-3"
                                                            style={{ color: "#ff6219" }}
                                                        />&nbsp;&nbsp;&nbsp;
                                                        <span className="h3 fw-bold mb-0">
                                                            Welcome to <b>TaskBoard 👋</b>
                                                        </span>
                                                    </div>

                                                    {/* Sign Up Title */}
                                                    <h4
                                                        className="fw-normal mb-3 pb-3 d-flex justify-content-center"
                                                        style={{ letterSpacing: 1 }}
                                                    >
                                                        Sign Up
                                                    </h4>

                                                    {/* Email input field */}
                                                    <div className="form-outline mb-4">
                                                        <input
                                                            type="email"
                                                            id="form2Example17"
                                                            className="form-control form-control-lg"
                                                            placeholder="Email Address"
                                                            onChange={e => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Username input field */}
                                                    <div className="form-outline mb-4">
                                                        <input
                                                            type="text"
                                                            id="form2Example17"
                                                            className="form-control form-control-lg"
                                                            placeholder="Username"
                                                            onChange={e => setUsername(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Password input field */}
                                                    <div className="form-outline mb-4">
                                                        <input
                                                            type="password"
                                                            id="form2Example17"
                                                            className="form-control form-control-lg"
                                                            placeholder="Password"
                                                            onChange={e => setPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Confirm Password input field */}
                                                    <div className="form-outline mb-4">
                                                        <input
                                                            type="password"
                                                            id="form2Example27"
                                                            className="form-control form-control-lg"
                                                            placeholder="Confirm Password"
                                                            onChange={e => setPassword2(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Register button */}
                                                    <div className="pt-1 mb-4">
                                                        <button
                                                            className="btn btn-dark btn-lg btn-block"
                                                            type="submit"
                                                            disabled={isLoading} // Disable button when loading
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                    {' Processing...'}
                                                                </>
                                                            ) : (
                                                                'Register'
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Link to Login page if the user already has an account */}
                                                    <p className="mb-5 pb-lg-2 text-center" style={{ color: "#393f81" }}>
                                                        Already have an account?{" "}
                                                        <Link to="/login">
                                                            Login Now
                                                        </Link>
                                                    </p>

                                                    {/* Terms and Privacy policy links */}
                                                    <div className=' d-flex justify-content-center'>
                                                        <a href="#!" className="small text-muted">
                                                            Terms of use.
                                                        </a>&nbsp;
                                                        <a href="#!" className="small text-muted">
                                                            Privacy policy
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer section */}
                <footer className="bg-light text-center text-lg-start">
                    <div
                        className="text-center p-3"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                    >
                        © 2025 TaskBoard. All rights reserved.
                    </div>
                </footer>
            </>

        </div>
    )
}


export default Registerpage
