import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom' // For linking to other pages (register page)
import AuthContext from '../context/AuthContext' // Importing AuthContext to use login functionality
import Swal from 'sweetalert2' // SweetAlert for displaying notifications


function Loginpage() {
    // Destructuring the loginUser function from AuthContext
    const { loginUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault() // Prevents default form submission
        const email = e.target.email.value // Get email value from the form input
        const password = e.target.password.value // Get password value from the form input

        // If email is provided, call loginUser function with email and password
        if (email.length > 0) {
            setIsLoading(true) // Set loading to true when login starts
            try {
                await loginUser(email, password)
            } catch (error) {
                console.error("Login failed:", error)
                // Display error notification
                Swal.fire({
                    title: "Login failed",
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
    }

    return (
        <div>
            <>
                <section style={{ backgroundColor: "#9A616D" }}>
                    <div className="container h-100" style={{ paddingTop: "70px", paddingBottom: "50px" }}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: "1rem" }}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <form onSubmit={handleSubmit}>
                                                    {/* Welcome Section */}
                                                    <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                                                        <i
                                                            className="fas fa-cubes fa-2x me-3"
                                                            style={{ color: "#ff6219" }}
                                                        />
                                                        <div className="d-flex align-items-center mb-3 pb-1">
                                                            <i
                                                                className="fas fa-cubes fa-2x me-3"
                                                                style={{ color: "#ff6219" }}
                                                            />&nbsp;&nbsp;&nbsp;
                                                            <span className="h3 fw-bold mb-0">Welcome back 👋</span>
                                                        </div>
                                                    </div>

                                                    {/* Heading */}
                                                    <h4
                                                        className="fw-normal mb-3 pb-3 d-flex justify-content-center"
                                                        style={{ letterSpacing: 1 }}
                                                    >
                                                        Sign into your account
                                                    </h4>

                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2Example17">
                                                            Email address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="form2Example17"
                                                            className="form-control form-control-lg"
                                                            name='email' // Name used for form submission
                                                        />
                                                    </div>

                                                    {/* Password input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2Example27">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="form2Example27"
                                                            className="form-control form-control-lg"
                                                            name='password' // Name used for form submission
                                                        />
                                                    </div>

                                                    {/* Submit button */}
                                                    <div className="pt-1 mb-4">
                                                        <button
                                                            className="btn btn-dark btn-lg btn-block"
                                                            type="submit"
                                                            disabled={isLoading} // Disable button when loading
                                                        >
                                                            {isLoading ? "Logging in..." : "Login"} {/* Change text based on loading state */}
                                                        </button>
                                                    </div>

                                                    {/* Registration link */}
                                                    <p className="mb-5 pb-lg-2 text-center" style={{ color: "#393f81" }}>
                                                        Don't have an account?{" "}
                                                        <Link to="/register">
                                                            Register Now
                                                        </Link>
                                                    </p>

                                                    {/* Terms and privacy links */}
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
                        {/* Footer text */}
                        © 2025 TaskBoard. All rights reserved.
                    </div>
                </footer>
            </>
        </div>
    )
}


export default Loginpage
