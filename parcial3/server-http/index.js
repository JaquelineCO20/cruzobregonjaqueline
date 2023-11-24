let http=require('http');

// const servidor= 
let servidor=http.createServer(function(req,res){
// res.setHeader('Access-Control-Allow-Origin',"*");
res.write("Servidor http de Node contestando a peticion get");
res.end();
})
servidor.listen(8082,()=>{
    console.log("servidor Node http corriendo en puerto 8082")
});