const express=require("express");
const corse=require("cors")
const connectedToDatabase=require("./db")

const app=express();
app.use(corse({origin:["http://localhost:3000","https://INotebook.onrender.com"]}))
app.use(express.json())
const port=3001;
const host="localhost";
app.use("/api/auth",require("./Routes/auth"));
app.use("/api/notes",require("./Routes/notes"))
app.get("/",(req,res)=>{
    res.send("<h1>Working</h1>")
})
app.listen(port,host,()=>{
    console.log(`Website is hosting on ${host}:${port}`)
})

