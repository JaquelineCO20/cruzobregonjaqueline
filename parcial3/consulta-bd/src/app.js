import express from "express";
import morgan from "morgan";
import cors from "cors";

//routes
import languageRoutes from "./routes/language.routes";
const app=express();

//settings
app.set("port",3000);

//middlewares---intermedios
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:'*'}));

//routes
app.use("/api/Pacientes",languageRoutes);

export default app;