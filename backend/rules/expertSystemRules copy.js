

const financialKnowledgeBase = {
  metrics: {
    //Metricas de liquidez
    RazonDeLiquidez: {
      name: "Razon de Liquidez (Current Ratio)",
      description: "Mide la capacidad de pagar obligaciones a corto plazo",
      formula: "Activo Corriente / Pasivo Corriente",
      interpretation: {
        ranges: [
          { condition: (value) => value < 1 || value > 5, rating: "Malo", score: 20, explanation: "No puede cubrir deudas a corto plazo" },
          { condition: (value) => value >= 1 && value < 2, rating: "Regular", score: 60, explanation: "Capacidad mínima adecuada" },
          { condition: (value) => value >= 2 && value <= 5, rating: "Bueno", score: 100, explanation: "Posición líquida saludable" }
        ]
      },
      weight: 0.5 // 50% del score total
    },
   
    CapitalDeTrabajo:{
      name: "Capital de trabajo",
      description: "Colchon operativo de corto plazo.",
      formula: "Total de Activos - Total de Pasivos",
      interpretation: {
        ranges: [
         
           { condition: (value) => value < 0, rating: "Malo", score: 20, explanation: "Muy bajo"},
            { condition: (value) => value === 0, rating: "Regular", score: 60, explanation: "sin margen de seguridad"},
          { condition: (value) => value > 0, rating: "Bueno", score: 100, explanation: "Perfecto"}
        ]
      },
      weight: 0.5
    }
/*
    endeudamiento: {
      name: "Ratio de Endeudamiento",
      description: "Mide el grado de apalancamiento financiero",
      formula: "Pasivo Total / Activo Total",
      interpretation: {
        ranges: [
          { min: 0, max: 0.3, rating: "Excelente", score: 100, explanation: "Muy bajo endeudamiento" },
          { min: 0.3, max: 0.5, rating: "Bueno", score: 80, explanation: "Nivel óptimo de deuda" },
          { min: 0.5, max: 0.7, rating: "Regular", score: 50, explanation: "Endeudamiento alto" },
          { min: 0.7, max: Infinity, rating: "Malo", score: 20, explanation: "Deuda excesiva" }
        ]
      },
      weight: 0.4 // 40% del score total
    }  */
  },

  scoringSystem: {
    overallRating: [
      { min: 0, max: 40, rating: "Crítico" },
      { min: 40, max: 70, rating: "Regular" },
      { min: 70, max: Infinity, rating: "Saludable" }
    ]
  }
};


function evaluateMetric(metricName, value) {
  const metric = financialKnowledgeBase.metrics[metricName];
  
  if (!metric) {
    throw new Error(`Métrica ${metricName} no encontrada en la base de conocimiento`);
  }

  const range = metric.interpretation.ranges.find(r => 
  r.condition(value)
);

  if (!range) {
    throw new Error(`Valor ${value} fuera de rangos definidos para ${metricName}`);
  }

  return {
    metric: metricName,
    value: value,
    rating: range.rating,
    score: range.score,
    explanation: range.explanation,
    weight: metric.weight
  };
}


function calculateOverallScore(metricsResults) {
  try{
let weightedSum = 0;
  let totalWeight = 0;
  
  for (const metric in metricsResults) {
    weightedSum += metricsResults[metric].score * metricsResults[metric].weight;
    totalWeight += metricsResults[metric].weight;
  }

  const overallScore = Math.round(weightedSum / totalWeight);
  
  const overallRating = financialKnowledgeBase.scoringSystem.overallRating.find(
    r => overallScore >= r.min && overallScore < r.max
  );

      if (!overallRating) {
      return {
        score: overallScore,
        rating: "No definido",
        explanation: `Score ${overallScore} fuera de los rangos definidos`
      };
    }

  return {
    score: overallScore,
    rating: overallRating.rating
  };



  }catch(error){
    console.log(error);
    return error;
  }
  
}



export function evaluateFinancials(data) {
  try{
 const results = {
    details: {},
    overall: {}
  };

  // Evaluar cada métrica
    //Liquidez
    const rzl = parseFloat(Number(data.activo_corriente) / Number(data.pasivo_corriente));
    const cdt = parseFloat(Number(data.total_activos) - Number(data.total_pasivos));
  results.details.RazonDeLiquidez = evaluateMetric('RazonDeLiquidez', rzl);
  results.details.CapitalDeTrabajo = evaluateMetric('CapitalDeTrabajo', cdt);
    //Endeudamiento
  //results.details.endeudamiento = evaluateMetric('endeudamiento', data.pasivo_total / data.activo_total);

  // Calcular score global
  results.overall = calculateOverallScore(results.details);

  return results;
  }catch(error){
    console.log(error);
    return error;
  }
 
}