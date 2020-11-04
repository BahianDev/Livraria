import dotenv from 'dotenv';
dotenv.config();

import express from 'express' 
import { useRoutes } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = process.env.PORT || 8091;

const app = express();
app.use(cors());
app.use(bodyParser.json())

useRoutes(app); 


app.listen(PORT, () => console.log("RUNNING"));