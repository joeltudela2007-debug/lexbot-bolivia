/**
 * LEXBOT BOLIVIA - Módulo 5: Motor del Centro de Capacitación en Inteligencia Artificial y Legal Tech
 * Simulador interactivo de prompts, evaluación de riesgos y cuestionarios prácticos
 */

class CapacitadorLegalTech {
  constructor(datos = CAPACITACION_LEGALTECH) {
    this.datos = datos;
  }

  obtenerTemas() {
    return this.datos.modulos;
  }

  obtenerTemaPorId(id) {
    return this.datos.modulos.find(m => m.id === id) || null;
  }

  obtenerEjercicios() {
    return this.datos.ejerciciosInteractivas;
  }

  /**
   * Evalúa un prompt escrito por el usuario y le otorga un diagnóstico de calidad técnica
   * según la fórmula R-C-D-F-R
   */
  evaluarPromptJuridico(promptTexto) {
    if (!promptTexto || promptTexto.trim().length < 10) {
      return {
        calificacion: "INSUFICIENTE",
        puntuacion: 10,
        diagnostico: "El prompt es demasiado breve o vago. Las herramientas de IA generarán respuestas genéricas con alto riesgo de alucinación.",
        sugerencias: [
          "Indica el rol específico que debe asumir la IA (ej. abogado boliviano especialista en derecho procesal civil).",
          "Menciona las leyes o códigos bolivianos aplicables (ej. Ley 439, Código Civil).",
          "Añade restricciones expresas para evitar que invente números de sentencias o cite leyes extranjeras."
        ]
      };
    }

    const t = promptTexto.toLowerCase();
    let puntos = 20;
    const cumplimientos = [];
    const omisiones = [];

    // Evaluar Rol
    if (t.includes("actúa como") || t.includes("actua como") || t.includes("abogado") || t.includes("especialista") || t.includes("jurista")) {
      puntos += 20;
      cumplimientos.push("Rol técnico especificado claramente.");
    } else {
      omisiones.push("Falta definir el ROL (Ej: 'Actúa como abogado litigante en Bolivia especializado en...').");
    }

    // Evaluar Jurisdicción Boliviana
    if (t.includes("bolivia") || t.includes("boliviano") || t.includes("cpe") || t.includes("ley 439") || t.includes("codigo civil")) {
      puntos += 25;
      cumplimientos.push("Anclaje territorial explícito al ordenamiento jurídico de Bolivia.");
    } else {
      omisiones.push("No especificaste que debe ceñirse exclusivamente al Derecho Boliviano (Riesgo alto de jurisprudencia extranjera).");
    }

    // Evaluar Restricción Anti-Alucinación
    if (t.includes("no inventes") || t.includes("no alucines") || t.includes("verificable") || t.includes("fuente oficial") || t.includes("si no sabes")) {
      puntos += 25;
      cumplimientos.push("Cláusula de seguridad anti-alucinación incorporada.");
    } else {
      omisiones.push("No incluiste una restricción que prohíba expresamente inventar sentencias o citas legales.");
    }

    // Evaluar Confidencialidad
    if (t.match(/\d{7,8}/) || t.includes("c.i.") || t.includes("carnet")) {
      puntos -= 30;
      omisiones.push("¡ALERTA DE SEGURIDAD! El prompt parece contener números de cédula de identidad o datos reales de clientes. Debes anonimizar siempre.");
    }

    let nivel = "REGULAR";
    if (puntos >= 75) nivel = "EXCELENTE";
    else if (puntos >= 50) nivel = "BUENO";

    return {
      calificacion: nivel,
      puntuacion: Math.max(10, Math.min(100, puntos)),
      cumplimientos,
      omisiones,
      promptReestructuradoSugerido: this._generarPromptOptimizado(promptTexto)
    };
  }

  _generarPromptOptimizado(textoBase) {
    return `Actúa como un abogado especialista en el ordenamiento jurídico del Estado Plurinacional de Bolivia.
En relación a la siguiente consulta jurídica: "${textoBase.replace(/[\n\r]+/g, " ").substring(0, 150)}..."
Por favor estructura un análisis fundamentado exclusivamente en la Constitución Política del Estado y las leyes bolivianas vigentes.
Reglas estrictas de respuesta:
1. No inventes artículos ni números de resoluciones o sentencias judiciales.
2. Si no dispones de una fuente oficial verificada en la Gaceta Oficial o en el Tribunal Constitucional Plurinacional, indícalo con total honestidad.
3. No utilices leyes o jurisprudencia de otros países como si pertenecieran a Bolivia.`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CapacitadorLegalTech };
}
