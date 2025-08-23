import axios from 'axios'

const API_URL = 'http://localhost:5000/api/diagnostic'  // Ajusta según tu backend

export const calculateDiagnostic = async (formData) => {
  console.log(formData)
  try {
    const response = await axios.post(API_URL, {
      formData
    })
    return response
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error en el servidor')
  }
}

// Opcional: Configuración global de axios
axios.defaults.headers.post['Content-Type'] = 'application/json'