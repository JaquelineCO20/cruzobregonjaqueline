import express from "express";
import morgan from "morgan";
import cors from "cors";

//routes
import pacienteRoutes from "./routes/paciente.routes";
const app=express();

//settings
app.set("port",3000);

//middlewares---intermedios
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:'*'}));

//routes
app.use("/api/Pacientes",pacienteRoutes);

export default app;