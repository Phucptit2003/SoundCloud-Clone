import { useLocation } from "react-router-dom";

const PaymentFailed = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const code = searchParams.get("code");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ color: "red" }}>Thanh toán thất bại ❌</h1>
            <p>Mã lỗi: {code}</p>
            <a href="/payment">Thử lại</a>
        </div>
    );
};

export default PaymentFailed;
