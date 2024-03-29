const express=require("express")
const app=express();

require("dotenv").config();

PORT=process.env.PORT || 3000;

//middleware
app.use(express.json());

const blog=require("./routes/blog")

//mount
app.use("/api/v1",blog)

const connectWithDb=require("./config/database")
connectWithDb();

//start the server  
app.listen(PORT,()=>{
    console.log(`App server is started at ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is default Home Page </h1>`)
})