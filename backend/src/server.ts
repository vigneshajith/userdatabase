import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './configs/database.config';
import userRouter from './routers/userrouter'

// connected to mongodb
dbConnect()

const app = express();
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use("/api/users",userRouter)


app.listen(PORT, () => {
    console.log("Website served on http://localhost:" + PORT);
})
