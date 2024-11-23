//user name for mongoDB :varundhaundiyal1
//password for mongoDB : qesNwKxCUQJ0gPty
import express, {Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
const app :Express=express();
const port=process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
const mongoURI: string=
"mongodb+srv://varundhaundiyal1:<qesNwKxCUQJ0gPty>@finwealth1.fqfdrik.mongodb.net/"
mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB"))
.catch((err)=>console.error("Failed to connect to MONGODB:",err));
app.use("/financial-records", financialRecordRouter);
app.listen(port,()=>{
    console.log('SERVER RUNNING ON PORT ${port}');
}
);