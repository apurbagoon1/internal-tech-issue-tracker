import express, { type Application, type Request, type Response } from 'express'
import cors from "cors";

import { AuthRoutes } from "./modules/auth/auth.route";

const app : Application = express()

app.use(cors());
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  // res.send('Hello World!')
  res.status(200).json({ 
    success: true,
    message: 'Internal Tech Issue Tracker API Running Successfully',
 }) 
})

app.use("/api/auth", AuthRoutes);

export default app;