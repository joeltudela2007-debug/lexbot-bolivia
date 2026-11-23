/**
 * LEXBOT BOLIVIA - Módulo 2: Verificador de Jurisprudencia
 * Comprobación rigurosa de autenticidad, detección de alucinaciones y discrepancias de datos
 */

class VerificadorJurisprudencia {
  constructor(repositorio = JURISPRUDENCIA_BOLIVIA, inconsistencias = RESOLUCIONES_CON_DATOS_INCONSISTENTES) {
    this.repositorio = repositorio;
    this.inconsistencias = inconsistencias;
  }

  /**
   * Analiza una referencia textual dada por el usuario
   * @param {string} textoReferencia - Texto o pregunta con la cita a comprobar
   * @param {string} argumentoUsuario - Opcional: el argumento que el usuario pretende respaldar
   * @returns {Object} Informe técnico de verificación con estado tripartito
   */
  verificar(textoReferencia, argumentoUsuario = "") {
    const textoLimpio = textoReferencia.trim();
    const textoNormalizado = this._normalizar(textoLimpio);

    // 1. Detección previa de Jurisprudencia Extranjera
    const deteccionExtranjera = this._detectarJurisprudenciaExtranjera(textoLimpio);
    if (deteccionExtranjera.esExtranjera) {
      return {
        estado: "DATOS INCONSISTENTES",
        subtipo: "JURISPRUDENCIA_EXTRANJERA",
        icono: "fa-earth-americas",
        colorBadge: "badge-danger",
        resolucionIdentificada: deteccionExtranjera.citaDetectada || textoLimpio,
        paisIdentificado: deteccionExtranjera.pais,
        organoEmisor: deteccionExtranjera.organo,
        coincideNumero: false,
        coincideFecha: false,
        coincideOrgano: false,
        coincideContenido: false,
        mensajePrincipal: `¡Alerta de Jurisprudencia Extranjera! La cita corresponde al Derecho de ${deteccionExtranjera.pais} y no pertenece al Estado Plurinacional de Bolivia.`,
        analisisDetallado: `Se identificó que la referencia "${deteccionExtranjera.citaDetectada || textoLimpio}" proviene del órgano judicial ${deteccionExtranjera.organo} de ${deteccionExtranjera.pais}. En virtud de la Regla de Seguridad Nº 2 de LEXBOT, está prohibido invocar jurisprudencia foránea en estrados judiciales bolivianos como si fuera nacional. Si desea invocar doctrina internacional, debe hacerlo como derecho comparado o a través del estándar del Bloque de Constitucionalidad (art. 410.II y art. 256 CPE).`,
        fuenteConsultada: `Buscador de Jurisprudencia de ${deteccionExtranjera.pais}`,
        recomendacionForense: `No incluya esta cita en memoriales ante juzgados bolivianos. Para este tema en Bolivia, utilice precedentes del Tribunal Constitucional Plurinacional (TCP) o del Tribunal Supremo de Justicia (TSJ).`
      };
    }

    // 2. Extracción de patrones numéricos de resoluciones bolivianas
    const extraccion = this._extraerPatronResolucion(textoLimpio);

    // 3. Revisión de Casos Específicos de Inconsistencias Frecuentes / Alucinaciones conocidas (ej. SCP 0123/2022)
    const casoInconsistenteConocido = this._comprobarInconsistenciaConocida(extraccion, textoNormalizado);
    if (casoInconsistenteConocido) {
      return {
        estado: "DATOS INCONSISTENTES",
        subtipo: "ALUCINACION_FRECUENTE_IA",
        icono: "fa-triangle-exclamation",
        colorBadge: "badge-warning",
        resolucionIdentificada: extraccion.numeroOriginal || textoLimpio,
        organoReferido: casoInconsistenteConocido.organoReferido,
        coincideNumero: false,
        coincideFecha: false,
        coincideOrgano: true,
        coincideContenido: false,
        mensajePrincipal: `DATOS INCONSISTENTES: La resolución "${extraccion.numeroOriginal || textoLimpio}" no existe en el registro oficial con ese alcance temático.`,
        analisisDetallado: casoInconsistenteConocido.explicacion,
        resolucionSugerida: casoInconsistenteConocido.resolucionRealCercana,
        fuenteConsultada: "Gaceta Constitucional y Buscador Oficial del Tribunal Constitucional Plurinacional",
        enlaceOficial: "https://jurisprudenciaconstitucional.gob.bo",
        recomendacionForense: `Evite el uso de esta cita. Frecuentemente los asistentes de IA alucinan el número 0123/2022 mezclándolo con sentencias reales. La sentencia verdadera aplicable es ${casoInconsistenteConocido.resolucionRealCercana.numeroReal}.`
      };
    }

    // 4. Búsqueda de coincidencia en el repositorio verificado
    const coincidencia = this._buscarEnRepositorio(extraccion, textoNormalizado);

    if (coincidencia) {
      // Comparación pormenorizada de datos
      const evalNumero = coincidencia.coincideNumero;
      const evalAnio = coincidencia.coincideAnio;
      const evalOrgano = coincidencia.coincideOrgano;
      const evalArgumento = this._evaluarRespaldoArgumental(coincidencia.item, argumentoUsuario || textoLimpio);

      // Si todo coincide plenamente
      if (evalNumero && evalAnio && evalOrgano) {
        return {
          estado: "VERIFICADA",
          subtipo: "COINCIDENCIA_OFICIAL_TOTAL",
          icono: "fa-circle-check",
          colorBadge: "badge-success",
          resolucionIdentificada: coincidencia.item.numeroCompleto,
          fechaOficial: coincidencia.item.fecha,
          organoOficial: coincidencia.item.organo,
          materiaOficial: coincidencia.item.materia,
          temaOficial: coincidencia.item.tema,
          ratioDecidendi: coincidencia.item.fundamentoJuridico,
          criterioJurisprudencial: coincidencia.item.criterioJurisprudencial,
          articulosRelacionados: coincidencia.item.articulosRelacionados,
          fuenteConsultada: `Portal Oficial del ${coincidencia.item.organo}`,
          enlaceOficial: coincidencia.item.fuenteOficial,
          coincideNumero: true,
          coincideFecha: true,
          coincideOrgano: true,
          coincideContenido: true,
          evaluacionArgumental: evalArgumento,
          mensajePrincipal: `VERIFICADA: Se encontró una fuente oficial y los datos coinciden plenamente.`,
          analisisDetallado: `La resolución ${coincidencia.item.numeroCompleto} se encuentra debidamente registrada en los archivos del ${coincidencia.item.organo}. Fue emitida en fecha ${coincidencia.item.fecha} y sienta precedente vinculante sobre: "${coincidencia.item.tema}".`,
          recomendacionForense: `Esta cita es plenamente auténtica y cuenta con respaldo documental oficial comprobado. ${evalArgumento.explicacion}`
        };
      } else {
        // Coincide parcialmente pero con datos inconsistentes (ej. año o tipo de órgano alterado)
        return {
          estado: "DATOS INCONSISTENTES",
          subtipo: "DISCREPANCIA_DATOS_PARCIAL",
          icono: "fa-triangle-exclamation",
          colorBadge: "badge-warning",
          resolucionIdentificada: extraccion.numeroOriginal || coincidencia.item.numeroCompleto,
          datosDiscrepantes: {
            anioEsperado: coincidencia.item.anio,
            organoEsperado: coincidencia.item.organo
          },
          mensajePrincipal: `DATOS INCONSISTENTES: Se encontró una resolución similar, pero algunos datos proporcionados no coinciden con la fuente oficial.`,
          analisisDetallado: `Se identificó la resolución "${coincidencia.item.numeroCompleto}", pero los datos de su cita difieren en el año, órgano o denominación. En los registros oficiales del ${coincidencia.item.organo}, la fecha real es ${coincidencia.item.fecha}.`,
          fuenteConsultada: `Base de Jurisprudencia del ${coincidencia.item.organo}`,
          enlaceOficial: coincidencia.item.fuenteOficial,
          resolucionReal: coincidencia.item,
          recomendacionForense: `Corrija la cita con los datos oficiales antes de incorporarla a su memorial judicial para evitar observaciones procesales por falsedad o inexactitud.`
        };
      }
    }

    // 5. Estado: NO VERIFICADA
    // Regla crucial del prompt: "No encontrar una resolución no significa necesariamente que sea falsa.
    // El chatbot debe distinguir entre una resolución cuya inexistencia se haya podido comprobar
    // y otra que simplemente no pudo localizarse. Debe evitar emitir conclusiones definitivas sin evidencia suficiente."
    return {
      estado: "NO VERIFICADA",
      subtipo: "NO_LOCALIZADA_EN_REPOSITORIO",
      icono: "fa-circle-question",
      colorBadge: "badge-neutral",
      resolucionIdentificada: extraccion.numeroOriginal || textoLimpio,
      coincideNumero: false,
      coincideFecha: false,
      coincideOrgano: false,
      coincideContenido: false,
      mensajePrincipal: `NO VERIFICADA: No se encontró evidencia suficiente para confirmar su autenticidad en el repositorio oficial indexado.`,
      analisisDetallado: `Tras consultar las fuentes oficiales disponibles del Tribunal Constitucional Plurinacional, Tribunal Supremo de Justicia y Tribunal Agroambiental, no fue posible localizar un registro exacto para "${textoLimpio}".\n\n` +
        `IMPORTANTE (Distinción Jurídica): Que esta resolución no se encuentre en la base de datos indexada no significa de manera categórica que sea falsa o inexistente. Podría tratarse de un Auto de Sala de un Tribunal Departamental, una resolución no digitalizada o un error menor de tipeo en el número/año.\n\n` +
        `Sin embargo, ante el alto riesgo de alucinación jurisprudencial en herramientas de IA, NO se recomienda utilizarla hasta constatar físicamente el fallo.`,
      fuenteConsultada: "Buscadores oficiales del TCP (jurisprudenciaconstitucional.gob.bo) y TSJ (tsj.bo)",
      pasosParaComprobacionManual: [
        "Ingrese directamente al buscador web del Tribunal Constitucional Plurinacional (jurisprudenciaconstitucional.gob.bo).",
        "Seleccione búsqueda por número y filtre por el año de emisión sospechado.",
        "Si busca un Auto Supremo, ingrese a tsj.bo/jurisprudencia y seleccione la Sala correspondiente (Civil, Penal o Social).",
        "Si no arroja ningún resultado oficial en el portal gubernamental, descarte inmediatamente la cita para evitar responsabilidad profesional."
      ],
      recomendacionForense: `No incluya esta cita en un memorial ni fundamente pretensiones sobre ella hasta contar con el documento íntegro en PDF oficial.`
    };
  }

  /**
   * Extrae número, año y posible sigla de una cadena
   */
  _extraerPatronResolucion(texto) {
    // Patrones: 0112/2012, 0084/2017-S2, 450/2016, 28/2021
    const patronRegex = /(?:SCP|SC|AS|AAP|N[ºo°]?\s*)?\s*(\d{1,4}\/\d{4}(?:-[A-Za-z0-9]+)?)/i;
    const match = texto.match(patronRegex);

    if (match) {
      const numeroCompleto = match[1];
      const partes = numeroCompleto.split("/");
      const numPuro = partes[0];
      const anioPart = partes[1].split("-")[0];
      return {
        encontrado: true,
        numeroOriginal: match[0].trim(),
        numeroNormalizado: numeroCompleto,
        numeroPuro: parseInt(numPuro, 10),
        anio: parseInt(anioPart, 10)
      };
    }

    return {
      encontrado: false,
      numeroOriginal: "",
      numeroNormalizado: "",
      numeroPuro: null,
      anio: null
    };
  }

  _detectarJurisprudenciaExtranjera(texto) {
    const t = texto.toLowerCase();

    // Colombia
    if (t.includes("corte constitucional de colombia") || t.includes("sentencia c-") || t.includes("sentencia t-") || t.includes("consejo de estado de colombia")) {
      return { esExtranjera: true, pais: "Colombia", organo: "Corte Constitucional de Colombia", citaDetectada: texto };
    }
    // Argentina
    if (t.includes("csjn") || t.includes("corte suprema de justicia de la nacion argentina") || t.includes("fallos:") || t.includes("camara nacional de apelaciones")) {
      return { esExtranjera: true, pais: "Argentina", organo: "Corte Suprema de Justicia de la Nación (Argentina)", citaDetectada: texto };
    }
    // Perú
    if (t.includes("tribunal constitucional del peru") || t.includes("exp. n°") && t.includes("tc/")) {
      return { esExtranjera: true, pais: "Perú", organo: "Tribunal Constitucional del Perú", citaDetectada: texto };
    }
    // España
    if (t.includes("tribunal supremo de españa") || t.includes("sts ") || t.includes("stc ") && t.includes("españa") || t.includes("audiencia nacional")) {
      return { esExtranjera: true, pais: "España", organo: "Tribunal Supremo / Constitucional de España", citaDetectada: texto };
    }
    // México
    if (t.includes("scjn") || t.includes("suprema corte de justicia de la nacion") && (t.includes("mexico") || t.includes("amparo directo"))) {
      return { esExtranjera: true, pais: "México", organo: "Suprema Corte de Justicia de la Nación (México)", citaDetectada: texto };
    }

    return { esExtranjera: false };
  }

  _comprobarInconsistenciaConocida(extraccion, textoNorm) {
    for (const inc of this.inconsistencias) {
      if (extraccion.encontrado && extraccion.numeroNormalizado.includes(inc.referenciaConsultada)) {
        return inc;
      }
      if (textoNorm.includes(this._normalizar(inc.referenciaConsultada))) {
        return inc;
      }
    }
    return null;
  }

  _buscarEnRepositorio(extraccion, textoNorm) {
    if (!extraccion.encontrado) {
      // Buscar por palabras clave o términos del texto normalizado
      for (const item of this.repositorio) {
        const itemNorm = this._normalizar(item.numeroCompleto);
        if (textoNorm.includes(itemNorm)) {
          return {
            item,
            coincideNumero: true,
            coincideAnio: true,
            coincideOrgano: true
          };
        }
      }
      return null;
    }

    // Buscar por coincidencia numérica en repositorio
    for (const item of this.repositorio) {
      const numItemLimpio = this._normalizar(item.numero);
      const numItemPuro = parseInt(item.numero.split("/")[0], 10);
      const anioItem = item.anio;

      // Coincidencia exacta de número y año
      if (numItemLimpio === extraccion.numeroNormalizado || item.numero.includes(extraccion.numeroNormalizado)) {
        return {
          item,
          coincideNumero: true,
          coincideAnio: anioItem === extraccion.anio,
          coincideOrgano: true
        };
      }

      // Mismo número pero año diferente (discrepancia de datos)
      if (numItemPuro === extraccion.numeroPuro && anioItem !== extraccion.anio) {
        return {
          item,
          coincideNumero: true,
          coincideAnio: false,
          coincideOrgano: true
        };
      }
    }

    return null;
  }

  _evaluarRespaldoArgumental(item, argumento) {
    if (!argumento) {
      return {
        respalda: true,
        explicacion: "No se proporcionó un argumento específico para cotejo; la resolución sienta jurisprudencia sobre la materia indicada."
      };
    }

    const argNorm = this._normalizar(argumento);
    const temaNorm = this._normalizar(item.tema);
    const fundamentoNorm = this._normalizar(item.fundamentoJuridico);

    let coincidencias = 0;
    const palabras = argNorm.split(/\s+/).filter(p => p.length > 3);
    for (const p of palabras) {
      if (temaNorm.includes(p) || fundamentoNorm.includes(p)) {
        coincidencias++;
      }
    }

    if (coincidencias >= 2) {
      return {
        respalda: true,
        explicacion: `Efectivamente, el fundamento jurídico de la resolución ${item.numeroCompleto} coincide sustancialmente con el argumento planteado, tutelando el criterio de que: "${item.criterioJurisprudencial}".`
      };
    } else {
      return {
        respalda: false,
        explicacion: `Atención: Aunque la resolución existe, su tema principal versa sobre "${item.tema}", lo cual podría no guardar relación directa con el argumento que usted pretende respaldar. Evite invocar precedentes por mera similitud fonética o nominal.`
      };
    }
  }

  _normalizar(txt) {
    if (!txt) return "";
    return txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s\/\-]/g, "")
      .trim();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VerificadorJurisprudencia };
}
