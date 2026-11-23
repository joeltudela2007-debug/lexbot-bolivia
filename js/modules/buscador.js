/**
 * LEXBOT BOLIVIA - Módulo 1: Buscador de Jurisprudencia Boliviana
 * Búsqueda inteligente multidimensional con contrastación documental real
 */

class BuscadorJurisprudencia {
  constructor(repositorio = JURISPRUDENCIA_BOLIVIA) {
    this.repositorio = repositorio;
  }

  /**
   * Realiza una búsqueda exhaustiva por múltiples criterios
   * @param {Object} criterios
   * @param {string} criterios.termino - Término libre, palabras clave, hechos o problema
   * @param {string} criterios.organo - Filtro por órgano (TCP, TSJ, Agroambiental, todos)
   * @param {string} criterios.materia - Filtro por materia (Constitucional, Civil, Penal, etc.)
   * @param {number|string} criterios.anio - Año específico o rango
   * @param {string} criterios.articulo - Artículo específico (ej. Art. 115 CPE)
   * @returns {Array} Resultados ordenados por relevancia con explicación de pertinencia
   */
  buscar({ termino = "", organo = "todos", materia = "todas", anio = "todos", articulo = "" } = {}) {
    const terminoNormalizado = this._normalizarTexto(termino);
    const palabrasTermino = terminoNormalizado.split(/\s+/).filter(p => p.length > 2);

    const resultados = [];

    for (const item of this.repositorio) {
      let puntuacion = 0;
      let coincidencias = [];

      // Filtro estricto por órgano si no es 'todos'
      if (organo !== "todos") {
        const organoNormalizado = this._normalizarTexto(item.organo);
        const filtroOrgano = this._normalizarTexto(organo);
        if (!organoNormalizado.includes(filtroOrgano) && !item.sigla.toLowerCase().includes(filtroOrgano)) {
          continue;
        }
      }

      // Filtro estricto por materia si no es 'todas'
      if (materia !== "todas") {
        const materiaItem = this._normalizarTexto(item.materia);
        const filtroMateria = this._normalizarTexto(materia);
        if (!materiaItem.includes(filtroMateria)) {
          continue;
        }
      }

      // Filtro por año
      if (anio !== "todos" && String(item.anio) !== String(anio)) {
        continue;
      }

      // Búsqueda por número de resolución directo (alta prioridad)
      const numeroNormalizado = this._normalizarTexto(item.numero);
      const numeroCompletoNorm = this._normalizarTexto(item.numeroCompleto);
      if (terminoNormalizado && (numeroNormalizado.includes(terminoNormalizado) || numeroCompletoNorm.includes(terminoNormalizado))) {
        puntuacion += 100;
        coincidencias.push("Coincidencia exacta con número de resolución");
      }

      // Búsqueda por artículos de ley / CPE
      if (articulo) {
        const artNorm = this._normalizarTexto(articulo);
        const tieneArt = item.articulosRelacionados.some(a => this._normalizarTexto(a).includes(artNorm));
        if (tieneArt) {
          puntuacion += 60;
          coincidencias.push(`Invoca el artículo consultado (${articulo})`);
        }
      }

      // Búsqueda por palabras clave indexadas
      if (item.palabrasClave) {
        for (const kw of item.palabrasClave) {
          const kwNorm = this._normalizarTexto(kw);
          if (terminoNormalizado.includes(kwNorm)) {
            puntuacion += 40;
            coincidencias.push(`Palabra clave indexada: "${kw}"`);
          } else {
            for (const palabra of palabrasTermino) {
              if (kwNorm.includes(palabra)) {
                puntuacion += 15;
                coincidencias.push(`Descriptor temático: "${kw}"`);
                break;
              }
            }
          }
        }
      }

      // Búsqueda en tema y resumen
      const temaNorm = this._normalizarTexto(item.tema);
      const resumenNorm = this._normalizarTexto(item.resumen);
      const fundamentoNorm = this._normalizarTexto(item.fundamentoJuridico);
      const criterioNorm = this._normalizarTexto(item.criterioJurisprudencial);

      if (terminoNormalizado) {
        if (temaNorm.includes(terminoNormalizado)) {
          puntuacion += 50;
          coincidencias.push("Coincidencia directa en el tema principal de la resolución");
        }
        if (fundamentoNorm.includes(terminoNormalizado)) {
          puntuacion += 45;
          coincidencias.push("Coincidencia en la ratio decidendi (fundamento jurídico)");
        }
        if (resumenNorm.includes(terminoNormalizado) || criterioNorm.includes(terminoNormalizado)) {
          puntuacion += 30;
          coincidencias.push("Coincidencia en el resumen de hechos o criterio jurisprudencial");
        }

        // Ponderación de palabras individuales para hechos y problemas planteados
        let palabrasCoincidentes = 0;
        for (const p of palabrasTermino) {
          if (temaNorm.includes(p) || resumenNorm.includes(p) || fundamentoNorm.includes(p)) {
            palabrasCoincidentes++;
          }
        }
        puntuacion += palabrasCoincidentes * 8;
      }

      // Si no se pasó término pero sí filtros de órgano o materia
      if (!terminoNormalizado && (organo !== "todos" || materia !== "todas" || anio !== "todos" || articulo)) {
        puntuacion += 20;
      }

      if (puntuacion > 0) {
        // Explicación jurídica de la pertinencia respecto a la consulta del usuario
        const explicacionRelacion = this._generarExplicacionRelacion(item, termino, coincidencias);

        resultados.push({
          ...item,
          puntuacionRelevancia: puntuacion,
          coincidenciasDetectadas: Array.from(new Set(coincidencias)),
          explicacionRelacion
        });
      }
    }

    // Ordenar de mayor a menor relevancia
    resultados.sort((a, b) => b.puntuacionRelevancia - a.puntuacionRelevancia);
    return resultados;
  }

  /**
   * Genera el desglose completo exigido de 9 puntos para un resultado
   */
  formatearFichaDetallada(res, consultaUsuario = "") {
    return {
      punto1_numeroResolucion: res.numeroCompleto,
      punto2_fechaEmision: res.fecha,
      punto3_organoEmisor: `${res.organo} (${res.sala})`,
      punto4_materiaJuridica: res.materia,
      punto5_resumenContenido: res.resumen,
      punto6_fundamentoJuridico: res.fundamentoJuridico,
      punto7_criterioJurisprudencial: res.criterioJurisprudencial,
      punto8_relacionConsulta: res.explicacionRelacion || `Resolución directamente aplicable para sustentar la pretensión jurídica sobre ${res.tema}.`,
      punto9_fuenteOficial: res.fuenteOficial,
      articulosInvocados: res.articulosRelacionados,
      estadoVerificacion: res.estado
    };
  }

  _generarExplicacionRelacion(item, termino, coincidencias) {
    if (!termino) {
      return `Resolución del ${item.organo} que sienta línea jurisprudencial en ${item.materia}.`;
    }
    return `Esta resolución es jurídicamente relevante para su consulta ("${termino}") porque sienta el precedente obligatorio sobre ${item.tema}, estableciendo expresamente que: ${item.criterioJurisprudencial}`;
  }

  _normalizarTexto(txt) {
    if (!txt) return "";
    return txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s\/\-ªº]/g, " ")
      .trim();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BuscadorJurisprudencia };
}
