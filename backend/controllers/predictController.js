import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const calcularFeatures = (data) => {
  // Calcular todas las features que espera el modelo (17 en total)
  const X1 = Number(data.utilidad_neta) / Number(data.total_activos); // net profit / total assets
  const X2 = Number(data.total_pasivos) / Number(data.total_activos); // total liabilities / total assets
  const X3 = (Number(data.activo_corriente) - Number(data.pasivo_corriente)) / Number(data.total_activos); // working capital / total assets
  const X4 = Number(data.activo_corriente) / Number(data.pasivo_corriente); // current assets / short-term liabilities
  const X6 = Number(data.utilidad_neta) / Number(data.total_activos); // retained earnings / total assets
  const X8 = Number(data.patrimonio) / Number(data.total_pasivos); // book value of equity / total liabilities
  const X9 = Number(data.ventas_totales) / Number(data.total_activos); // sales / total assets
  const X10 = Number(data.patrimonio) / Number(data.total_activos); // equity / total assets
  const X17 = Number(data.total_activos) / Number(data.total_pasivos); // total assets / total liabilities
  const X18 = (Number(data.ventas_totales) - Number(data.costo_ventas)) / Number(data.total_activos); // gross profit / total assets
  const X19 = (Number(data.ventas_totales) - Number(data.costo_ventas)) / Number(data.ventas_totales); // gross profit / sales
  const X23 = Number(data.utilidad_neta) / Number(data.ventas_totales); // net profit / sales
  const X44 = (Number(data.cuentas_por_cobrar) * 365) / Number(data.ventas_totales); // (receivables * 365) / sales
  const X50 = Number(data.activo_corriente) / Number(data.total_pasivos); // current assets / total liabilities
  const X51 = Number(data.pasivo_corriente) / Number(data.total_activos); // short-term liabilities / total assets
  const X60 = Number(data.ventas_totales) / Number(data.inventario_final); // sales / inventory
  const X61 = Number(data.ventas_totales) / Number(data.cuentas_por_cobrar); // sales / receivables

  return [
    X1, X2, X3, X4, X6, X8, X9, X10, X17, X18, 
    X19, X23, X44, X50, X51, X60, X61
  ];
};


export const getPrediction = (req, res) => {
  try {

    const features = calcularFeatures(req.body);

    const scriptPath = path.resolve(__dirname, "../../model/model.py");
    const py = spawn("python", [scriptPath]);

    let result = "";
    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error(`Error en Python: ${data}`);
    });

    py.on("close", (code) => {
      try {
        if (result.trim()) {
          res.json(JSON.parse(result));
        } else {
          res.status(500).json({ error: "Python no devolvió datos" });
        }
      } catch (err) {
        res.status(500).json({ error: "Error al parsear respuesta de Python", raw: result });
      }
    });
    //console.log(features);
    
    
    const inputData = JSON.stringify({features});
    py.stdin.write(inputData);
    py.stdin.end();
    

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor Node" });
  }
};