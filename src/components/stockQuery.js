import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function StockQuery() {
    const [query, setQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [price, setPrice] = useState(120);  // Default price
    const [comparisonType, setComparisonType] = useState("");
    const [step, setStep] = useState(1);  // Manages step 1, 2, and 3
    const [results, setResults] = useState([]);  // Holds the search results

    // Handle query submission to fetch related companies
    const handleSubmitQuery = async () => {
        try {
            const response = await axiosInstance.post("/api/stock-query/", { query });
            setCompanies(response.data.company_options);
            setPrice(response.data.price);
            setComparisonType(response.data.comparison_type);
            setStep(2);  // Move to step 2 to show related companies
        } catch (error) {
            console.error("Error fetching stock options:", error);
        }
    };

    // Handle the final stock data search after selecting a company
    const handleSearchStockData = async () => {
        if (selectedCompany) {
            try {
                const response = await axiosInstance.post("/api/stock-data-search/", {
                    ticker: selectedCompany.ticker,
                    price: parseFloat(price),
                    comparison_type: comparisonType,
                });
                setResults(response.data.stock_data);  // Update results with stock data
                setStep(3);  // Move to step 3 to show the results
            } catch (error) {
                console.error("Error fetching stock data:", error);
                alert("Failed to retrieve stock data. Please try again.");
            }
        } else {
            alert("Please select a company first.");
        }
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h1>Stock Query Search</h1>

            {/* Step 1: Always show this section */}
            <div style={{ marginBottom: '20px', border: '1px solid black', padding: '20px' }}>
                <textarea
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                    placeholder="When did Apple stock price exceed 120?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={4}
                />
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                    onClick={handleSubmitQuery}
                >
                    Check Answer
                </button>
            </div>

            {/* Step 2: Show this section when the query is submitted */}
            {step >= 2 && (
                <div style={{ marginBottom: '20px', border: '1px solid black', padding: '20px' }}>
                    <h3>Related Companies</h3>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedCompany(company)}
                                style={{
                                    cursor: 'pointer',
                                    margin: '10px 0',
                                    padding: '10px',
                                    border: selectedCompany === company ? '2px solid red' : '1px solid #ccc',
                                    borderRadius: '5px'
                                }}
                            >
                                {index + 1}. {company.name} ({company.ticker})
                            </div>
                        ))
                    ) : (
                        <p>No companies found.</p>
                    )}

                    {/* Show details and search option after a company is selected */}
                    {selectedCompany && (
                        <>
                            <p>Comparison: {comparisonType}</p>
                            <p>Price: {price}</p>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleSearchStockData}
                            >
                                Search Stock Data
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Step 3: Show this section when stock data is returned */}
            {step === 3 && results.length > 0 && (
                <div style={{ marginBottom: '20px', border: '1px solid black', padding: '20px' }}>
                    <h3>Results</h3>
                    {results.map((result, index) => (
                        <div key={index}>
                            {index + 1}. Date: {result.Date}, Close Price: {result.Close}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StockQuery;