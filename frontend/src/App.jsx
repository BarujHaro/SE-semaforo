import { useState } from 'react'
import { Container, Typography, CssBaseline } from '@mui/material'
import DiagnosticForm from './components/DiagnosticForm'

function App() {
  const [result, setResult] = useState(null)

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4, mb: 6 }}>
        Semáforo PyME
      </Typography>
      
     
      <DiagnosticForm/>
    
    </Container>
  )
}

export default App