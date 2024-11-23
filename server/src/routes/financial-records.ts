import express, {Request,Response} from "express";
import FinanceRecordModel from "../schema/financial-record";
const router=express.Router();
router.get("/getAllByUserID/:userId", async (req:Request,res: Response)=>{
    try{
        const userId=req.params.userId;
        const records=await FinanceRecordModel.find({userId: userId});
        if(records.length==0)
        {
            return res.status(404).send("No records found for the user.");
        }
         res.status(200).send(records);
     } catch(err){
        res.status(500).send(err);
     }
});


router.post("/", async (req:Request,res: Response)=>{
    try{
        const newRecordBody= req.body;
        const newRecord= new FinanceRecordModel(newRecordBody);
        const savedRecord=await newRecord.save();
        
         res.status(200).send(savedRecord

         );
     } catch(err){
        res.status(500).send(err);
     }
});

router.put("/id", async (req:Request,res: Response)=>{
    try{
        const id= req.params.id;
        const newRecordBody= req.body;
        const record=await FinanceRecordModel.findByIdAndUpdate(
            id,
            newRecordBody,
            {new: true}
        );
        
        if(!record) return res.status(404).send();
        res.status(200).send(record);
    }
    catch(err){
        res.status(500).send(err);
    }
});



router.delete("/id", async (req:Request,res: Response)=>{
    try{
        const id= req.params.id;
        const newRecordBody= req.body;
        const record=await FinanceRecordModel.findByIdAndDelete(id);
        
        if(!record) return res.status(404).send();
        res.status(200).send(record);
    }
    catch(err){
        res.status(500).send(err);
    }
});

export default router;



