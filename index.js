import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/userRoutes.js";
import companyRoute from "./Routes/companyRoutes.js";
import jobRoute from "./Routes/jobsRoutes.js";
import applicationRoute from "./Routes/applicationRoutes.js";
dotenv.config({});
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET","PUT","POST","DELETE"],
  credentials: true,
  allowHeaders: ["Content-Type", "multipart/form-data"],
};
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8000;

// API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
  connectDB();
});
