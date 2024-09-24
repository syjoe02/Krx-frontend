import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        alert("Log Out successfully!");
        navigate("/login");  // Redirect to login page
    };

    return (
        <button onClick={handleLogout} style={styles.logoutButton}>
            Log out
        </button>
    );
}

const styles = {
    logoutButton: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#f00',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default LogoutButton;
