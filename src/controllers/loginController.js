import { nuevoLogin } from "../services/loginService.js";

export const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    if (!email || !password ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Aquí deberías llamar a una función del servicio para crear un nuevo empleado
    const log = await nuevoLogin({ email, password});
    if(!log)
      return res.status(404).json({message: "Login incorrecto"})

    res.status(201).json({ message: "Login Ok", log});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}