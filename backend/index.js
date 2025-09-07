import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import DiagnosticRoute from "./routes/diagnostic.js";
import predictRoutes from "./routes/predictRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Rutas
app.use(DiagnosticRoute);
app.use(predictRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));