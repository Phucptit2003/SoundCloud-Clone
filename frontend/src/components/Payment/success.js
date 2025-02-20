import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const code = searchParams.get("code");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ color: "green" }}>Thanh toán thành công 🎉</h1>
            <p>Mã giao dịch: {code}</p>
            <a href="/dashboard">Quay lại trang chủ</a>
        </div>
    );
};

export default PaymentSuccess;
