import React, { useState } from 'react';
import './Payment.css'; // Import file CSS
import axios from 'axios';  // Import axios


const PaymentForm = () => {
   
    const [amount, setAmount] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [language, setLanguage] = useState('vn');
    const [paymentUrl, setPaymentUrl] = useState('');
    const [error, setError] = useState(null); // State to store error messages

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
    
        setError(null);
    
        try {
            const response = await axios.post(
                "http://localhost:5433/vnpay/create_payment_url",
                {
                    amount: amount,
                    bankCode: bankCode,
                    language: language,
                },
                {
                    withCredentials: false, // Nếu backend cần session/cookie, đổi thành `true`
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Kiểm tra nếu response chứa paymentUrl
            if (response.data && response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl; // Chuyển hướng đến trang thanh toán VNPAY
            } else {
                console.log("Payment initiated successfully, but no URL received.");
                setError("Failed to get payment URL. Please try again.");
            }
        } catch (error) {
            console.error("Error creating payment URL:", error);
            let errorMessage = "An error occurred during payment processing.";
    
            if (error.response) {
                console.error("Server responded with error:", error.response.data);
                errorMessage = error.response.data.message || "Payment request failed.";
            } else if (error.request) {
                console.error("No response received:", error.request);
                errorMessage = "No response from server. Please try again later.";
            } else {
                console.error("Request setup error:", error.message);
                errorMessage = "An error occurred while setting up the payment request.";
            }
    
            setError(errorMessage);
        }
    };
    
    
    return (
        <div>
            <h3>Thanh toán</h3>
            <div className="table-responsive">
                <form id="createOrder" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Số tiền</label>
                        <input
                            type="text"
                            className="form-control"
                            id="amount"
                            name="amount"
                            placeholder="Số tiền"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Chọn Phương thức thanh toán:</label>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="bankCode"
                                    id="defaultPaymentMethod"
                                    value=""
                                    checked={bankCode === ''}
                                    onChange={() => setBankCode('')}
                                /> Cổng thanh toán VNPAYQR
                            </label>
                        </div>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="bankCode"
                                    id="vnpayqrPaymentMethod"
                                    value="VNPAYQR"
                                    checked={bankCode === 'VNPAYQR'}
                                    onChange={() => setBankCode('VNPAYQR')}
                                /> Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                            </label>
                        </div>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="bankCode"
                                    id="vnbankPaymentMethod"
                                    value="VNBANK"
                                    checked={bankCode === 'VNBANK'}
                                    onChange={() => setBankCode('VNBANK')}
                                /> Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                            </label>
                        </div>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="bankCode"
                                    id="intcardPaymentMethod"
                                    value="INTCARD"
                                    checked={bankCode === 'INTCARD'}
                                    onChange={() => setBankCode('INTCARD')}
                                /> Thanh toán qua thẻ quốc tế
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ngôn ngữ</label>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="language"
                                    id="vnLanguage"
                                    value="vn"
                                    checked={language === 'vn'}
                                    onChange={() => setLanguage('vn')}
                                /> Tiếng việt
                            </label>
                        </div>
                        <div className="controls">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    name="language"
                                    id="enLanguage"
                                    value="en"
                                    checked={language === 'en'}
                                    onChange={() => setLanguage('en')}
                                /> Tiếng anh
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-default" id="btnPopup">
                        Thanh toán
                    </button>
                </form>
            </div>
            <p>&nbsp;</p>
        </div>
    );
};

export default PaymentForm;