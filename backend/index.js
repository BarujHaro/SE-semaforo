import express from "express";
import cors from "cors";
import DiagnosticRoute from "./routes/diagnostic.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use(DiagnosticRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));