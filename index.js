import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import userRouter from "./routes/user.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import storageRouter from "./routes/storage.js";
import institutionRouter from "./routes/institution.js";
import institutionsRouter from "./routes/institutions.js";
import jobsRouter from "./routes/jobs.js";
import companyRouter from "./routes/company.js";
import companiesRouter from "./routes/companies.js";
import whatsappGroupRouter from "./routes/whatsappGroup.js";
// import loadData from "./utils/testDataLoad.js"; // load test data

dotenv.config();

// APP CONFIG
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: process.env.DATA_LIMIT, extended: true }));
app.use(express.urlencoded({ limit: process.env.DATA_LIMIT, extended: true }));
app.use(cors());

// ROUTES SETUP
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/users", usersRouter);
app.use("/storage", storageRouter);
app.use("/institution", institutionRouter);
app.use("/institutions", institutionsRouter);
app.use("/jobs", jobsRouter);
app.use("/company", companyRouter);
app.use("/companies", companiesRouter);
app.use("/whatsapp", whatsappGroupRouter);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`${error} did not connect`);
  }
};

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  // loadData(); // load test data
};

startServer().catch((error) => console.error(error));
