import crypto from "crypto";
import jwt from "jsonwebtoken";
import { pool } from "../database/conexion.js";

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña obligatorios"
            });
        }

        const [usuarios] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ? AND activo = 1",
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        const usuario = usuarios[0];

        const hash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (hash !== usuario.contrasenia) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                rol: usuario.rol,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        )

        delete usuario.contrasenia;

        return res.status(200).json({
            mensaje: "Login correcto",
            token,
            usuario
        });

    } catch (error) {

        return res.status(500).json({
            mensaje: error.message
        });

    }
};

export const actualizarFoto = async (req, res) => {

    try {

        const idUsuario = req.user.id;

        const rutaFoto = "/uploads/" + req.file.filename;

        await pool.query(
            "UPDATE usuarios SET foto_path = ? WHERE id_usuario = ?",
            [rutaFoto, idUsuario]
        );

        return res.status(200).json({
            mensaje: "Foto actualizada correctamente",
            foto: rutaFoto
        });

    } catch (error) {

        return res.status(500).json({
            mensaje: error.message
        });

    }

};