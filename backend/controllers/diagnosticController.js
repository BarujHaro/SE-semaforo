import {evaluateFinancials } from "../rules/expertSystemRules.js";

export const evaluateDiagnostic = (req, res) => {
  try {
    const data = req.body;   
    console.log(data);
    const result = evaluateFinancials(data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error en el diagnóstico", details: err.message });
  }
};