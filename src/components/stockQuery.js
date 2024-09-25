import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { companyListContainer, companyItem, selectedItem, inputBox, button } from '../utils/styles';

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
            <h1>Stock Query Search</h1>

            {/* Step 1: Ask the user for a stock query (chat-like UI) */}
            {step === 1 && (
                <>
                    <textarea
                        style={inputBox}
                        placeholder="'When did Apple stock price exceed 120?'"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={4}
                    />
                    <br />
                    <button style={button} onClick={handleSubmitQuery}>
                        Check Answer
                    </button>
                </>
            )}

            {/* Step 2: Let the user choose the company and ticker */}
            {step === 2 && (
                <>
                    <div style={companyListContainer}>
                        <h2>Select Company</h2>
                        {companies.length > 0 ? (
                            companies.map((company, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...companyItem,
                                        ...(selectedCompany === company ? selectedItem : {}),
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
                    <button style={button} onClick={handleFinalAnswer}>
                        Submit Answer
                    </button>
                </>
            )}
        </div>
    );
}

export default StockQuery;