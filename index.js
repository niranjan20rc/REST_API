const express = require("express");
const app =express();


app.use(express.json());


app.get("/",(res,res)=>{
    res.json("Hell from API server !!!");
})

app.listen(5000,()=>console.log("server is running !!!"))