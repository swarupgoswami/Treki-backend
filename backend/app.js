const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const requestRoutes = require("./routes/requestRoutes");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/requests", requestRoutes);




app.use("/api/auth", authRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
