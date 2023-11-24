const express=require('express');
const app=express('cors');
const cors = require('cors');
app.use(cors({origin:"*"}));

app.get('/',(req,res)=>{
    res.json({mensaje:"Server express respondiendo a get"});
});

app.post('/',(req,res)=>{
    res.json({mensaje:"Server express respondiendo a post"})
})
app.delete('/',(req,res)=>{
    res.json({mensaje:"Server express respondiendo a delete"})
})
app.listen(8082,()=>{
    console.log("Servidor express en puerto 8082")
});