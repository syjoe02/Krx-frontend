import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    // state variables to hold the user input and error messages
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // redirect the user to a different page
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // await (Asynchronous operation) and we wait for the response from the server
            const response = await axios.post("http://127.0.0.1:8000/auth/token/login/", {
                // request payload contains
                username_or_email: usernameOrEmail,
                password: password,
            });

            // save the token in localStorage
            if (response.status === 200 && response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                alert("Login successful!");
                navigate("/search");
            } else {
                setError("Login Failed. Please try again.")
            }
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error("Error during login:", err);
        }
    };

    return (
        // style align the form vertically and center
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                style={{ marginBottom: '15px', padding: '10px' }}
            />
            <input
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '15px', padding: '10px' }}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoginPage;