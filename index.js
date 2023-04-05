const express=require("express");
const connectedToDatabase=require("./db")
const app=express();
const port=3001;
const host="localhost";
app.get("/",(req,res)=>{
    res.send("<h1>Working</h1>")
})
app.listen(port,host,()=>{
    console.log(`Website is hosting on ${host}:${port}`)
})

