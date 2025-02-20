"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0.01,
        },
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 3], // ISO 4217 currency code (e.g., USD, EUR)
        },
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW() + interval '30 days'"),
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      scopes: {
        detailed: { attributes: {} },
      },
    }
  );

  // Định nghĩa mối quan hệ
  Payment.associate = function (models) {
    Payment.belongsTo(models.User, { foreignKey: "userId" });
  };

  // Lấy payment theo ID
  Payment.getPaymentById = async function (id) {
    return await Payment.findByPk(id);
  };

  // Tạo payment mới
  Payment.createPayment = async function ({ userId, amount, currency, paymentMethod }) {
    return await Payment.create({
      userId,
      amount,
      currency,
      paymentMethod,
      status: "pending",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ngày sau
    });
  };

  // Cập nhật trạng thái thanh toán
  Payment.updatePaymentStatus = async function (id, status) {
    const payment = await Payment.findByPk(id);
    if (payment) {
      payment.status = status;
      await payment.save();
    }
    return payment;
  };

  // Kiểm tra xem user có premium hay không
  Payment.isUserPremium = async function (userId) {
    try {
      const latestPayment = await Payment.findOne({
        where: {
          userId,
          status: "completed",
          expiresAt: {
            [Op.gt]: new Date(), // Chỉ lấy giao dịch chưa hết hạn
          },
        },
        order: [["expiresAt", "DESC"]], // Lấy giao dịch mới nhất
      });

      return !!latestPayment; // Trả về true nếu có gói premium hợp lệ, ngược lại false
    } catch (error) {
      console.error("Error checking premium status:", error);
      return false;
    }
  };

  return Payment;
};
