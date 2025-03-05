const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// 📌 Middleware
app.use(cors());
app.use(bodyParser.json());

let sensorData = { temperatura: 0, humedad: 0, led: "Ninguno" };

// 📡 Ruta para recibir datos desde el ESP32
app.post("/api/data", (req, res) => {
    const { temperatura, humedad, led } = req.body;
    if (temperatura !== undefined && humedad !== undefined && led !== undefined) {
        sensorData = { temperatura, humedad, led };
        console.log("📡 Datos recibidos:", sensorData);
        res.status(200).json({ message: "Datos recibidos correctamente" });
    } else {
        res.status(400).json({ error: "Datos incorrectos" });
    }
});

// 🌍 Ruta para que la web consulte los datos
app.get("/api/data", (req, res) => {
    res.json(sensorData);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
