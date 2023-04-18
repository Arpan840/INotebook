const mongoose=require("mongoose");
const db="mongodb+srv://arpandas020498:lKSREfJlmnnaP2IL@cluster0.hlq0cta.mongodb.net/INotebook?retryWrites=true&w=majority"
mongoose.connect(db).then(()=>{
    console.log("Connected to mongoDb");
}).catch((err)=>{
    console.log(err)
})
module.exports=mongoose;