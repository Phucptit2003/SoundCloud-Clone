import React from "react";
import { useHistory } from "react-router-dom";
import "./UpgradePremium.css";

const UpgradePremium = () => {
  const history = useHistory();
  const handleUpgrade = () => {
    history.push("/payment");
  };
  

  return (
    <div className="upgrade-container">
      <div className="upgrade-card">
        <h2 className="upgrade-title">Nâng cấp lên Premium</h2>
        <h3 className="upgrade-price">50.000VND/tháng</h3>
        <p className="upgrade-description">Tận hưởng những lợi ích độc quyền:</p>
        <ul className="upgrade-benefits">
          <li>✅ Truy cập không giới hạn</li>
          <li>✅ Không có quảng cáo</li>
          <li>✅ Hỗ trợ 24/7</li>
          <li>✅ Upload không giới hạn</li>
        </ul>
        <button className="upgrade-button" onClick={handleUpgrade}>Nâng cấp ngay</button>
      </div>
    </div>
  );
};

export default UpgradePremium;