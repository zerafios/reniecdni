const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv"); // Importa dotenv correctamente

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Ruta de consulta DNI
app.get("/reniec/search/:dni", async (req, res) => {
    try {
        const document = req.params.dni;
        const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${document}`, {
            headers: {
                Authorization: `Bearer ${process.env.APIS_TOKEN}` // Usa la variable de entorno
            }
        });
        return res.json(response.data);
    } catch (error) {
        console.error("Error en la consulta a la API:", error);
        return res.status(500).json({ error: "Error en la consulta de DNI" });
    }
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
