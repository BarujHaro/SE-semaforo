import React, { useState } from 'react'
import { calculateDiagnostic } from '../services/api'
import axios from 'axios'
// calculateDiagnostic
export default function DiagnosticForm({ setResult }) {
  const [score, setScore] = useState('');
  const [explain, setExplain] = useState('');
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
//pasivo_total financiado, activo_total financiado
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
        const res = await axios.post('http://localhost:5000/api/diagnostic', 
      formData
    );
        console.log("score",res.data);
        setScore(res.data.overall.score);
const explanations = Object.values(res.data.details).map(item => item.explanation);
setExplain(res.data.details);
        return res;
    } catch (error) {
      console.error('Error al calcular:', error)
    }
  }

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
        <div>{score}</div>
      )}

   {explain && (
  <div>
    {Object.values(explain).map((item, index) => (
      <div key={index} style={{marginBottom: '10px'}}>
        <strong>{item.metric}:</strong> {item.explanation}
      </div>
    ))}
  </div>
)}


    </div>
  )
}