import express, { type Application, type Request, type Response } from 'express'
import cors from "cors";

import { AuthRoutes } from "./modules/auth/auth.route";
import { IssueRoutes } from './modules/issues/issue.route';

import globalErrorHandler from "./middleware/globalErrorHandler";

import notFound from "./middleware/notFound";

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
app.use("/api/issues", IssueRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;