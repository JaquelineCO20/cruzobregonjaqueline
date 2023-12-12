import { getConnection } from "../database/database"
import { jsPDF } from "jspdf";
import fs from 'fs'
const getPacientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_paciente,Nombre,ApellidoP,ApellidoM,Edad,Genero,Telefono FROM paciente");
        res.json(result);
    } catch (error) {
        res.status(500);  //error del servidor
        res.result(error.message);
    }
};
const getPacientesID = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_paciente,Nombre,ApellidoP,ApellidoM,Edad,Genero,Telefono FROM paciente WHERE id_paciente=?", id_paciente);
        if(!result || result == []) throw new Error
        res.json(result);
    } catch (error) {
        res.status(404).send(error.message) //error del servidor
    }
};


const addPacientes = async (req, res) => {
    try {
        const { Nombre, ApellidoP, ApellidoM, Edad, Genero, Telefono } = req.body;
        const paciente = { Nombre, ApellidoP, ApellidoM, Edad, Genero, Telefono };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO paciente SET ?", paciente);
        res.json({ message: "Paciente agregado" });
    } catch (error) {
        res.status(500).send(error.message) //error del servidor
    }
};

const deletePacientes = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM paciente WHERE id_paciente=?", id_paciente);
        res.json({ message: "Paciente eliminado" });
    } catch (error) {
        res.status(500).send(error.message) //error del servidor
    }
};

const updatePacientes = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const paciente = req.body;

        if (id_paciente === undefined || !paciente) {
            throw new Error("No se encontro, favor de intentarlo nuevamente");
        }
        const connection = await getConnection()
        const result = await connection.query(`UPDATE paciente SET ? WHERE id_paciente = ${id_paciente}`, paciente);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);//error del servidor
    }
};

const getAllUsersPdf = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_paciente, Nombre, ApellidoP, ApellidoM, Edad, Genero, Telefono FROM paciente ORDER BY id_paciente");
        console.log(result) 
        // Crear un nuevo documento PDF
        const pdf = new jsPDF();
        pdf.text('Lista de Pacientes', 20, 10);
        
        // Iterar sobre los resultados y agregar al PDF
        result.forEach((paciente, index) => {
            const yPosition = 20 + index * 10;
            pdf.text(`${paciente.id_paciente} ${paciente.Nombre} ${paciente.ApellidoP} ${paciente.ApellidoM}`, 20, yPosition);
            // Puedes agregar más campos según tus necesidades
        });

        // Guardar el PDF en el servidor
        const pdfPath = './pacientes.pdf';
        pdf.save(pdfPath);

        // Enviar el PDF como respuesta al cliente
        res.contentType("application/pdf");
        res.download(pdfPath, 'pacientes.pdf', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
            // Eliminar el archivo después de descargar
            fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUserPdfById = async (req, res) => {
    const userId = req.params.id_paciente; 
    console.log(userId)
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_paciente, Nombre, ApellidoP, ApellidoM, Edad, Genero, Telefono FROM paciente WHERE id_paciente = ?",userId);

        if (result.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        const paciente = result[0];

        // Crear un nuevo documento PDF
        const pdf = new jsPDF();
        pdf.text(`Información del Paciente - ID: ${paciente.id_paciente}`, 20, 10);
        pdf.text(`${paciente.id_paciente} ${paciente.Nombre} ${paciente.ApellidoP} ${paciente.ApellidoM}`, 20, 20);
        // Puedes agregar más campos según tus necesidades

        // Guardar el PDF en el servidor
        const pdfPath = `./paciente_${userId}.pdf`;
        pdf.save(pdfPath);

        // Enviar el PDF como respuesta al cliente
        res.contentType("application/pdf");
        res.download(pdfPath, `paciente_${userId}.pdf`, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
            // Eliminar el archivo después de descargar
            fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// const getLastUserPdf = async (req, res) => {
//     try {
//         const connection = await getConnection();
//         const result = await connection.query("SELECT id_paciente, Nombre, ApellidoP, ApellidoM, Edad, Genero, Telefono FROM paciente ORDER BY id_paciente");
//         console.log(result)
//         // Crear un nuevo documento PDF
//         const pdf = new jsPDF();
//         pdf.text('Ultimo paciente ingresado', 20, 10);
//         const ultimoIngresado = result.pop() 
        
//             pdf.text(`${ultimoIngresado.id_paciente} ${ultimoIngresado.Nombre} ${ultimoIngresado.ApellidoP} ${ultimoIngresado.ApellidoM}`, 20, 20);
//             // Puedes agregar más campos según tus necesidades

//         // Guardar el PDF en el servidor
//         const pdfPath = './ultimoPaciente.pdf';
//         pdf.save(pdfPath);

//         // Enviar el PDF como respuesta al cliente
//         res.contentType("application/pdf");
//         res.download(pdfPath, 'ultimoPaciente.pdf', (err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send(err.message);
//             }
//             // Eliminar el archivo después de descargar
//             fs.unlinkSync(pdfPath);
//         });
//     } catch (error) {
//         res.status(500);
//         res.send(error.message);
//     }
// };
export const methods = {
    getPacientes,
    getPacientesID,
    addPacientes,
    deletePacientes,
    updatePacientes,
    getAllUsersPdf,
    getUserPdfById,
};