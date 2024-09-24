import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function StockQuery() {
    const [query, setQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [price, setPrice] = useState("");
    const [step, setStep] = useState(1); // step 1 for asking query

    // Handle query submission to extract company and price
    const handleSubmitQuery = async () => {
        try {
            const response = await axiosInstance.post("/api/stock-query/", { query });
            setCompanies(response.data.company_options);
            setPrice(response.data.price);
            setStep(2);
        } catch (error) {
            console.error("Error in fetching stock options:", error);
        }
    };

    // final asnwer submission
    const handleFinalAnswer = () => {
        if (selectedCompany) {
            alert('Selected Company: ${selectedCompany.name} (${selectedCompany.ticker}) \nPrice: ${price}');
        } else {
            alert("Please select a company first.");
        }
    };

    const styles = {
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
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
            <h1>Stock Query Search</h1>

            {/* Step 1: Ask the user for a stock query (chat-like UI) */}
            {step === 1 && (
                <>
                    <textarea
                        style={styles.inputBox}
                        placeholder="'When did Apple stock price exceed 120?'"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={4}
                    />
                    <br />
                    <button style={styles.button} onClick={handleSubmitQuery}>
                        Check Answer
                    </button>
                </>
            )}

            {/* Step 2: Let the user choose the company and ticker */}
            {step === 2 && (
                <>
                    <div style={styles.companyListContainer}>
                        <h2>Select Company</h2>
                        {companies.length > 0 ? (
                            companies.map((company, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.companyItem,
                                        ...(selectedCompany === company ? styles.selectedItem : {}),
                                    }}
                                    onClick={() => setSelectedCompany(company)}
                                >
                                    <span>{company.name}</span>
                                    <span>({company.ticker})</span>
                                </div>
                            ))
                        ) : (
                            <p>No companies found.</p>
                        )}
                    </div>

                    {/* Show selected company details */}
                    {selectedCompany && (
                        <div>
                            <h2>
                                Selected Company: {selectedCompany.name} ({selectedCompany.ticker})
                            </h2>
                            <p>Price: {price}</p>
                        </div>
                    )}

                    {/* Final answer button */}
                    <button style={styles.button} onClick={handleFinalAnswer}>
                        Submit Answer
                    </button>
                </>
            )}
        </div>
    );
}

export default StockQuery;