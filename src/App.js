import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/authTokenLogin';
import SignUp from './components/signUp';
import StockQuery from './components/stockQuery';
import StockDataSearch from './components/stockDataSearch';
import LoggoutButton from './components/logoutButton';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken")); // check login status
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedPrice, setSeletedPrice] = useState("");

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const handleCompanySelection = (ticker, price) => {
    setSelectedTicker(ticker);
    setSeletedPrice(price);
  };

  return (
    <Router>
      <div>
        {/* NavBar */}
        <nav style={styles.navbar}>
          <div style={styles.navContent}>
            <h1 style={styles.logo}>Stock Query App</h1>
            <div>
              {isAuthenticated ? (
                <LoggoutButton onLogout={handleLogout} />
              ) : (
                <Link to="/signup" style={styles.navLink}>Sign Up</Link>
              )}
            </div>
          </div>
        </nav>

        {/* 페이지 콘텐츠 */}
        <div style={styles.pageContent}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 보호된 경로 */}
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <StockQuery onCompanySelected={handleCompanySelection} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  selectedTicker && selectedPrice ? (
                    <StockDataSearch ticker={selectedTicker} price={selectedPrice} />
                  ) : (
                    <div>Please make a selection from the query page.</div>
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
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


export default App;