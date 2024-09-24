// src/components/AuthTokenLogin.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/token/login/", {
                username_or_email: usernameOrEmail,
                password: password,
            });

            // save the token in localStorage
            localStorage.setItem("authToken", response.data.token);
            alert("Login successful!");
            setIsLoggedIn(true);
            navigate("/search");

        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error("Error during login:", err);
        }
    };

    return (
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