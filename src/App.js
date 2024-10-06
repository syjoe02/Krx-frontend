import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/authTokenLogin';
import SignUp from './components/signUp';
import StockQuery from './components/stockQuery';
import StockDataSearch from './components/stockDataSearch';
import LoggoutButton from './components/logoutButton';
import { navbar, navContent, logo, navLink, pageContent } from './utils/styles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken")); // check login status
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedPrice, setSeletedPrice] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Runs only once when the component mounts

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
        <nav style={navbar}>
          <div style={navContent}>
            <h1 style={logo}>Stock Query App</h1>
            <div>
              {isAuthenticated ? (
                <LoggoutButton onLogout={handleLogout} />
              ) : (
                <Link to="/signup" style={navLink}>Sign Up</Link>
              )}
            </div>
          </div>
        </nav>

        <div style={pageContent}>
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUp />} />

            {/* auth */}
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

export default App;