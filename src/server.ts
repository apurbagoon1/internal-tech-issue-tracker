import app from "./app";
import { initDB, pool } from "./db";

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    await initDB();

    console.log("Database Connected Successfully");
  } 
  catch (error) {
    console.log("Database connection failed", error);
  }
};

connectDB();

export default app;