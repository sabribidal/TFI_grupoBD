import express from "express";
import { upload } from "../middlewares/multer.js";
import passport from "../middlewares/passport.js";
import { validarLogin } from "../validations/auth.validations.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { login, actualizarFoto } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", validarLogin, validarCampos, login);

export default router;

router.get(
    "/perfil",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        res.json({
            mensaje: "Acceso autorizado",
            usuario: req.user
        });

    }
);

router.post(
    "/foto",
    passport.authenticate("jwt", { session: false }),
    upload.single("foto"),
    actualizarFoto
);