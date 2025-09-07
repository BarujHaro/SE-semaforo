// routes/predictRoutes.js
import express from "express";
const router = express.Router();
import { getPrediction } from '../controllers/predictController.js';


router.post('/api/predict', getPrediction);

export default router;
