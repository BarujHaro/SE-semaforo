import { useState } from 'react'
import axios from 'axios'
import Analysis from './Analysis';

const DiagnosticForm= () => {
  const [score, setScore] = useState('');
  const [explain, setExplain] = useState('');
  const [predictionTree, setPredictionTree] = useState('');
  const [scoreTree, setScoreTree] = useState([]);

  
  const [formData, setFormData] = useState({
    activo_corriente: "",
    pasivo_corriente: "",
    total_activos: "",
    total_pasivos: "",
    costo_ventas: "",
    inventario_inicial: "",
    inventario_final: "",
    ventas_credito: "",
    cuentas_por_cobrar: "",
    ventas_totales: "",
    utilidad_neta: "",
    patrimonio: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const SystemExpertDiagnosis = async() => {
    try {
      
        const res = await axios.post('http://localhost:5000/api/diagnostic', 
      formData
    );
    
        setScore(res.data.overall.score);
        
        setExplain(res.data.details);
        console.log(res.data);
        return res;
    } catch (error) {
      console.error('Error al calcular:', error)
    }
  }

  const TreeDiagnosis = async() => {
    try{
      const response = await axios.post(
        "http://localhost:5000/api/predict",
        formData, 
        { headers: { "Content-Type": "application/json" } }
      );

      setPredictionTree(response.data.prediction);

      setScoreTree([response.data.probability_class_0, response.data.probability_class_1]);
      console.log(predictionTree);
      //console.log("Predicción:", response.data.prediction);
      //console.log("Clase 0:", response.data.probability_class_0);
      //console.log("Clase 1:", response.data.probability_class_1);
    }catch(error) {
      console.error('Error al calcular:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await SystemExpertDiagnosis();

      await TreeDiagnosis();
       
    } catch (error) {
      console.error('Error al calcular:', error)
    }
  }


  const getDiagnostico = (score) => {
    if (score < 40) return "Riesgo de quiebra";
    if (score >= 40 && score <= 70) return "Empresa estable";
    if (score > 70) return "Empresa saludable";
    return "Sin diagnóstico";
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>

            {/**LIQUIDEZ */}

            <label>"Activos corrientes"</label>
            <input 
            type="number" 
            name="activo_corriente"
            value={formData.activo_corriente}
              onChange={handleChange}
              required />


              <label>"Pasivos corrientes"</label>
            <input 
            type="number" 
            name="pasivo_corriente"
            value={formData.pasivo_corriente}
            onChange={handleChange}
            required />
           <br></br>

            <label>"Total de activos"</label>
            <input 
            type="number" 
            name="total_activos"
            value={formData.total_activos}
              onChange={handleChange}
              required />


            <label>"Total de pasivos"</label>
            <input 
            type="number" 
            name="total_pasivos"
            value={formData.total_pasivos}
              onChange={handleChange}
              required />

            <label>"Costo de ventas"</label>
            <input 
            type="number" 
            name="costo_ventas"
            value={formData.costo_ventas}
              onChange={handleChange}
              required />

            <label>"Inventario inicial"</label>
            <input 
            type="number" 
            name="inventario_inicial"
            value={formData.inventario_inicial}
              onChange={handleChange}
              required />

            <label>"Inventario final"</label>
            <input 
            type="number" 
            name="inventario_final"
            value={formData.inventario_final}
              onChange={handleChange}
              required />


            <label>"Ventas credito"</label>
            <input 
            type="number" 
            name="ventas_credito"
            value={formData.ventas_credito}
              onChange={handleChange}
              required />


            <label>"Cuentas por cobrar"</label>
            <input 
            type="number" 
            name="cuentas_por_cobrar"
            value={formData.cuentas_por_cobrar}
              onChange={handleChange}
              required />

    
            <label>"Ventas totales"</label>
            <input 
            type="number" 
            name="ventas_totales"
            value={formData.ventas_totales}
              onChange={handleChange}
              required />

            <label>"Utilidad Neta"</label>
            <input 
            type="number" 
            name="utilidad_neta"
            value={formData.utilidad_neta}
              onChange={handleChange}
              required />

            <label>"Patrimonio"</label>
            <input 
            type="number" 
            name="patrimonio"
            value={formData.patrimonio}
              onChange={handleChange}
              required />
   

          <div>
            <button 
              type="submit" 
            >
              Calcular Diagnóstico
            </button>
          </div>
        </div>
      </form>

      {score && (
        <>
        <h2>Diagnostico financiero</h2>
        </>
      )}


      {score && (
        <>
        <h3>Sistema experto</h3>
        <p>Resultado:{getDiagnostico(score)}</p>
        <div><p>Score: <span>{score}</span></p></div>
        </>
      )}

      {scoreTree.length > 0 && predictionTree !== '' && (
        <>
        <h3>Modelo de Machine Learning</h3>
        <p>
          Predicción: {" "}
          {predictionTree===0?(
            <span>Fuera de riesgo</span>
          ):(
            <span>En riesgo</span>
          )}
        </p>
        <p>Score estimado: <span>{(Math.max(scoreTree[0],scoreTree[1]) * 100).toFixed(1)}%</span></p>
        </>
      )}

   {explain && (
    <>
    <h3>Análisis</h3>
    <Analysis explain={explain} />
    

  </>
)}


    </div>
  )
}

export default DiagnosticForm;