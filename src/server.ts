import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import pool from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } 
  catch (error) {
    console.log("Failed to connect database", error);
  }
};

startServer();