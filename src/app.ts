import express, { type Application, type Request, type Response } from 'express'
import cors from "cors";

const app : Application = express()

app.use(cors());
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  // res.send('Hello World!')
  res.status(200).json({ 
    message: 'Internal Tech Issue Tracker API Running Successfully',
    author: 'Apurba Goon',
 }) 
})

export default app;