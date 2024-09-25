import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutButton } from '../utils/styles';

function LogoutButton({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        alert("Log Out successfully!");
        navigate("/login");  // Redirect to login page
    };

    return (
        <button onClick={handleLogout} style={logoutButton}>
            Log out
        </button>
    );
}

export default LogoutButton;
