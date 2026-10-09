import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.100:5173',
  'http://192.168.0.101:5173',
  'http://192.168.0.103:5173',
  'https://softnetkenya.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running — auth migrated to SoftNet Account Center (https://account.softnetkenya.com)");
});

app.use("/api/auth", (req, res) => {
  res.status(410).json({
    error: "Auth endpoints have moved to https://account.softnetkenya.com",
    redirect: "https://id.softnetkenya.com/login"
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected (auth services migrated)");
    app.listen(process.env.PORT || 5005, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));
