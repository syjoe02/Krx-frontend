const styles = {
    //logoutButton
    logoutButton: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#f00',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    // stockQuery
    companyListContainer: {
        maxHeight: "200px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        width: "300px",
    },
    companyItem: {
        padding: "10px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
    },
    selectedItem: {
        backgroundColor: "#d3f9d8",
    },
    inputBox: {
        width: "400px",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "10px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
    },
    // App.js
    navbar: {
        width: '100%',
        height: '60px',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
    },
    navContent: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
        padding: '0 20px',
        fontSize: '24px',
    },
    navLink: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: '#007bff',
        backgroundColor: '#f8f9fa',
        border: '1px solid #007bff',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    pageContent: {
        marginTop: '70px', // 상단 네비게이션 바 공간 확보
        padding: '20px',
    },
};
