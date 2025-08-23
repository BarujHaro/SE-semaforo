

export default function ResultsView({ result, onBack }) {


  return (
    <div>
      <div>   
            Score: <strong>{result.result.score}/100</strong>

      </div>

      <button 
        onClick={onBack}
      >
        Realizar nuevo diagnóstico
      </button>
    </div>
  )
}