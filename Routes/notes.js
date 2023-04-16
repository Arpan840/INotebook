const express=require("express");

const Notes=require("../Models/Notes");
const fetchUser = require("./Middleware/FetchUser");
const router=express.Router();
router.post("/addNotes",fetchUser, async(req,res)=>{
    try {
        const notes=await  Notes.create({
           user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag

        })
        res.status(200).json({
            notes
        })
    } catch (error) {
        console.log(error)
       
    }
})
router.get("/FindAllNotes",fetchUser, async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        res.status(200).json({
            success:true,
            notes
        })
    } catch (error) {
        console.log(error)
        
    }
})
router.delete("/deleteNotes/:id",fetchUser,async(req,res)=>{
    try {
       let note=await Notes.findById(req.params.id)
       if(!note)
       {
        return res.status(404).json({error:"Note not found"});
        
       }
       if(note.user.toString()!==req.user.id)
       {
        res.status(404).send("Un Authorized Action");

       }
       note= await Notes.deleteOne(note);
       res.status(200).json({
        success:true,
        message:"Note successfully Deleted"
       })
    } catch (error) {
        console.log(error)
        
    }
})
router.put("/updateNote/:id",fetchUser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        //find note and update
        let note= await Notes.findById(req.params.id);
        if(!note)
        {
            return res.status(400).json("Note not found");
        }
        if(note.user.toString()!==req.user.id)
        {
            return res.status(404).send("UnAuthorized Action")
        }
        note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
         res.status(200).json({
            success:true,
            note
         })
    } catch (error) {
        console.log(error)
    }
})
   
   
module.exports=router;