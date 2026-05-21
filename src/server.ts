import app from "./app";
import config from "./config";
import { initDB, pool } from "./db";

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");

    console.log("Database Connected Successfully");

    await initDB();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to connect database", error);
  }
};

startServer();