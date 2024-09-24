import React, { useState } from "react";
import axios from "axios";

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // handle for changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/users/", formData);

            if (response.status === 201) {
                setSuccessMessage("Sign Up successful! You can now log in.")
                setErrorMessage("");
                setFormData({ username: "", email: "", password: "", re_password: "" }) // Reset form
            }
        } catch (e) {
            if (e.response && e.response.data) {
                setErrorMessage("Signup failed. Please check your details.");
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
            setErrorMessage("");
        }
    };

    return (
        <div className="signup-container" style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
            <h2>Sign Up</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ marginBottom: '15px', padding: '10px' }}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ marginBottom: '15px', padding: '10px' }}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ marginBottom: '15px', padding: '10px' }}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="re_password"
                        value={formData.re_password}
                        onChange={handleChange}
                        style={{ marginBottom: '15px', padding: '10px' }}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;