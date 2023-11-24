import {getConnection} from "./../database/database"

const getLanguages=async(req,res)=>{
    try {
        const connection= await getConnection();
        const result=await connection.query("SELECT id_paciente,Nombre,ApellidoP,ApellidoM,Edad,Genero,Telefono FROM paciente");
        res.json(result);
    } catch (error) {
        res.status(500);  //error del servidor
        res.result(error.message);
    }
};

const addLanguage=async(req,res)=>{
    try {
        const {Nombre,ApellidoP,ApellidoM,Edad,Genero,Telefono}=req.body;
        const language={Nombre,ApellidoP,ApellidoM,Edad,Genero,Telefono};
        const connection= await getConnection();
        const result=await connection.query("INSERT INTO paciente SET ?",language);
        res.json({message:"Paciente agregado"});
    } catch (error) {
        res.status(500);  //error del servidor
        res.send(error.message);
    }
};
export const methods={
    getLanguages,
    addLanguage
};