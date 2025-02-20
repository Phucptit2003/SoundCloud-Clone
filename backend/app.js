const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");
const paymentRouter = require("./routes/api/payment");
const { Payment } = require("./db/models/payment");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(cors()); // Chỉ dùng CORS trong môi trường dev
  app.use(express.json()); // Cho phép xử lý JSON trong request body
}

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Gắn router của VNPAY trước khi các route khác
app.use("/vnpay", paymentRouter);

app.use(routes); // Kết nối toàn bộ routes khác

// Middleware xử lý lỗi 404
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});




// Middleware xử lý lỗi tổng quát
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
