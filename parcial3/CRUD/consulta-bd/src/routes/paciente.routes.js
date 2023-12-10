import { Router} from "express";
import { methods as pacienteController } from "../controllers/paciente.controller";

const router=Router();

router.get("/",pacienteController.getPacientes);
router.get("/:id_paciente",pacienteController.getPacientesID)
router.get("/generar/pdf", pacienteController.getAllUsersPdf)
router.get("/generarUltimo/pdf", pacienteController.getLastUserPdf)
router.post("/",pacienteController.addPacientes);
router.delete("/:id_paciente",pacienteController.deletePacientes);
router.put("/:id_paciente",pacienteController.updatePacientes);
export default router;