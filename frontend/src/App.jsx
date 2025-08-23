import { useState } from 'react'
import { Container, Typography, CssBaseline } from '@mui/material'
import DiagnosticForm from './components/DiagnosticForm'
import ResultsView from './components/ResultsView'

function App() {
  const [result, setResult] = useState(null)

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4, mb: 6 }}>
        Semáforo PyME
      </Typography>
      
      {!result ? (
        <DiagnosticForm setResult={setResult} />
      ) : (
        <ResultsView result={result} onBack={() => setResult(null)} />
      )}
    </Container>
  )
}

export default App