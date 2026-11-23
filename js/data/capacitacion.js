/**
 * LEXBOT BOLIVIA - Módulo 5: Capacitación sobre el Uso de Inteligencia Artificial en el Derecho
 * Guía Didáctica, Protocolos Éticos, Simulador de Prompts y Casos Prácticos
 */

const CAPACITACION_LEGALTECH = {
  modulos: [
    {
      id: "guia-chatgpt-abogacia",
      titulo: "¿Cómo utilizar correctamente ChatGPT e IA en la abogacía?",
      categoria: "Fundamentos y Buenas Prácticas",
      icono: "fa-scale-balanced",
      resumen: "Uso estratégico de la IA generativa como asistente y copiloto, preservando la dirección y responsabilidad profesional del abogado.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>1. El Rol de la IA: Herramienta de Apoyo, Nunca Sustituto</h4>
          <p>La inteligencia artificial generativa (LLMs) procesa lenguaje mediante modelos probabilísticos matemáticos, no comprende la realidad fáctica ni asume responsabilidad civil, penal o deontológica ante los tribunales de justicia.</p>
          
          <div class="alerta-box alerta-warning">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>
              <strong>Principio Deontológico Fundamental:</strong>
              El abogado es el único responsable civil y penalmente de los escritos que suscribe con su firma y sello profesional (Ley 387 del Ejercicio de la Abogacía). Nunca delegues el juicio valorativo ni la verificación de hechos a un sistema algorítmico.
            </div>
          </div>

          <h4>2. Tareas Jurídicas Recomendadas para IA</h4>
          <ul class="lista-check">
            <li><strong>Revisión sintáctica y de estilo:</strong> Mejorar la coherencia, fluidez y claridad argumentativa de un borrador ya redactado por el profesional.</li>
            <li><strong>Generación de estructuras:</strong> Crear esqueletos o esquemas iniciales de escritos complejos (hechos, fundamentos, petitorio).</li>
            <li><strong>Lluvia de ideas y contraargumentos:</strong> Identificar posibles puntos ciegos o réplicas que la contraparte procesal podría plantear.</li>
            <li><strong>Resumen de textos extensos:</strong> Sintetizar doctrina general y leyes extensas con supervisión humana.</li>
          </ul>

          <h4>3. Tareas Prohibidas o de Alto Riesgo</h4>
          <ul class="lista-cruz">
            <li><strong>Copiar citas de jurisprudencia textuales a ciegas:</strong> Las IAs comerciales frecuentemente inventan autos supremos y sentencias constitucionales inexistentes.</li>
            <li><strong>Ingresar nombres reales, cédulas de identidad o datos confidenciales:</strong> Viola el secreto profesional y las políticas de privacidad de datos personales.</li>
            <li><strong>Asumir vigencia normativa automática:</strong> Las IAs no saben con certeza si un artículo fue abrogado o modificado recientemente por la Asamblea Legislativa boliviana.</li>
          </ul>
        </div>
      `
    },
    {
      id: "prompts-juridicos-profesionales",
      titulo: "¿Cómo redactar un Prompt Jurídico Profesional?",
      categoria: "Técnicas de Prompting",
      icono: "fa-terminal",
      resumen: "Estructura avanzada R-C-D-F-R para formular instrucciones precisas y de alta calidad técnica.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>La Fórmula R-C-D-F-R para Abogados</h4>
          <p>Para obtener resultados jurídicamente útiles y evitar respuestas ambiguas o descontextualizadas de una IA, utiliza la siguiente estructura metodológica:</p>

          <div class="grid-prompt-steps">
            <div class="prompt-step">
              <span class="step-num">1</span>
              <h5>ROL (R)</h5>
              <p>Asigna un rol técnico específico: <em>"Actúa como un abogado especialista en Derecho Procesal Civil boliviano bajo la Ley Nº 439..."</em></p>
            </div>
            <div class="prompt-step">
              <span class="step-num">2</span>
              <h5>CONTEXTO (C)</h5>
              <p>Describe la situación procesal objetiva: <em>"En un proceso ordinario sobre cumplimiento de contrato de compraventa, el demandado opuso excepción previa de litispendencia..."</em></p>
            </div>
            <div class="prompt-step">
              <span class="step-num">3</span>
              <h5>DATOS (D)</h5>
              <p>Proporciona los datos fácticos indispensables anonimizados: <em>"El contrato data de 2023, la parte compradora pagó el 80% y el vendedor rehúsa escriturar..."</em></p>
            </div>
            <div class="prompt-step">
              <span class="step-num">4</span>
              <h5>FUNDAMENTO (F)</h5>
              <p>Exige normativa boliviana específica: <em>"Fundamenta exclusivamente en el Código Civil Boliviano y el Código Procesal Civil, sin inventar normas ni citar jurisprudencia foránea."</em></p>
            </div>
            <div class="prompt-step">
              <span class="step-num">5</span>
              <h5>RESTRICCIONES (R)</h5>
              <p>Fija límites taxativos: <em>"No inventes sentencias. Si no estás seguro de una cita jurisprudencial, indícalo expresamente como pendiente de comprobación."</em></p>
            </div>
          </div>

          <div class="comparativa-prompts">
            <div class="prompt-bad">
              <h5><i class="fa-solid fa-xmark"></i> Prompt Deficiente (Genérico y Peligroso)</h5>
              <code>"Dame una sentencia boliviana para ganar un juicio de alquileres que no me pagan."</code>
              <small>Riesgo: La IA inventará una sentencia con número verosímil pero inexistente y asumirá leyes de cualquier país hispanohablante.</small>
            </div>
            <div class="prompt-good">
              <h5><i class="fa-solid fa-check"></i> Prompt Profesional (Estructurado y Confiable)</h5>
              <code>"Actúa como especialista en Derecho Civil boliviano. Necesito estructurar un memorial de demanda de desalojo por falta de pago de cánones de arrendamiento conforme al Código Civil y Ley 439. Estructura los hechos, fundamentos de derecho y petitorio. Si citas normativa boliviana, usa únicamente los arts. pertinentes del Código Civil. No inventes números de sentencias constitucionales; si requieres jurisprudencia, sugiere únicamente la materia y el tema a verificar en la Gaceta Oficial."</code>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "alucinaciones-ia-jurisprudencia-falsa",
      titulo: "¿Qué son las Alucinaciones y cómo identificar Jurisprudencia Falsa?",
      categoria: "Seguridad y Verificación",
      icono: "fa-shield-halved",
      resumen: "Comprende la naturaleza de los 'hallucinations' de los modelos de lenguaje y aprende a detectar citas fabricadas.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>¿Por qué las IAs 'alucinan' sentencias judiciales?</h4>
          <p>Los modelos de lenguaje masivo (LLMs) funcionan prediciendo la siguiente palabra más probable según patrones estadísticos aprendidos. Como en los textos jurídicos los números de sentencias tienen un patrón familiar (por ejemplo: "Sentencia Constitucional Plurinacional N° 0.../..."), el modelo genera números matemáticamente coherentes pero que <strong>jamás fueron dictados en la vida real</strong>.</p>

          <div class="alerta-box alerta-danger">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>
              <strong>Casos Reales de Sanciones Disciplinarias:</strong>
              Tribunales en Estados Unidos, Colombia y otros países han multado y sancionado a abogados por presentar memoriales con precedentes jurisprudenciales inventados por ChatGPT (ejemplo: el caso <em>Mata v. Avianca</em> en Nueva York).
            </div>
          </div>

          <h4>Señales de Alerta para Identificar Jurisprudencia Falsa</h4>
          <div class="senales-grid">
            <div class="senal-item">
              <i class="fa-solid fa-magnifying-glass-chart"></i>
              <strong>1. Formato de número anómalo o extemporáneo</strong>
              <p>Ejemplo: "Sentencia Constitucional Plurinacional 1845/1999" (En 1999 no existía el Tribunal Constitucional Plurinacional, sino Tribunal Constitucional y emitían Sentencias Constitucionales SC, no SCP).</p>
            </div>
            <div class="senal-item">
              <i class="fa-solid fa-globe"></i>
              <strong>2. Trasplante conceptual extranjero</strong>
              <p>Términos ajenos al Derecho boliviano como "tutela de amparo mexicano", "recurso de casación en la forma según la LEC española", "fuero de atracción federal argentino".</p>
            </div>
            <div class="senal-item">
              <i class="fa-solid fa-link-slash"></i>
              <strong>3. Enlaces web rotos o genéricos</strong>
              <p>URLs generadas que terminan en páginas 404 o dominios inventados no pertenecientes a <code>gob.bo</code>.</p>
            </div>
            <div class="senal-item">
              <i class="fa-solid fa-quote-left"></i>
              <strong>4. Citas excesivamente 'perfectas'</strong>
              <p>Un texto donde el supuesto magistrado relator redacta exactamente con las mismas palabras coloquiales del prompt que formuló el usuario.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "protocolo-verificacion-5-pasos",
      titulo: "Protocolo de Verificación de Jurisprudencia Boliviana en 5 Pasos",
      categoria: "Metodología Forense",
      icono: "fa-list-check",
      resumen: "El método riguroso que todo abogado boliviano debe seguir antes de invocar un fallo en estrados judiciales.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>El Protocolo Forense de 5 Pasos de LEXBOT</h4>
          <ol class="pasos-verificacion">
            <li>
              <strong>Paso 1: Identificación del Órgano y Sigla Exacta</strong>
              <p>Verifica si se trata de una SCP (Tribunal Constitucional Plurinacional), un Auto Supremo AS (Tribunal Supremo de Justicia) o un Auto Agroambiental AAP (Tribunal Agroambiental). Cada órgano tiene numeración y salas diferenciadas.</p>
            </li>
            <li>
              <strong>Paso 2: Búsqueda en el Portal Oficial Correspondiente</strong>
              <p>Ingresa directamente a:</p>
              <ul>
                <li>TCP: <a href="https://jurisprudenciaconstitucional.gob.bo/" target="_blank">jurisprudenciaconstitucional.gob.bo</a></li>
                <li>TSJ: <a href="https://tsj.bo/jurisprudencia/" target="_blank">tsj.bo/jurisprudencia</a></li>
                <li>Tribunal Agroambiental: <a href="https://tribunalagroambiental.bo/jurisprudencia/" target="_blank">tribunalagroambiental.bo</a></li>
              </ul>
            </li>
            <li>
              <strong>Paso 3: Cotejo de Identidad Triple (Número, Año y Magistrado Relator)</strong>
              <p>Comprueba que la resolución corresponda efectivamente al año indicado y que la sala y relator coincidan con la publicación oficial.</p>
            </li>
            <li>
              <strong>Paso 4: Análisis de la Ratio Decidendi vs. Obiter Dicta</strong>
              <p>Asegúrate de que el argumento que pretendes citar sea la razón jurídica medular determinante del fallo (ratio decidendi) y no un mero comentario tangencial (obiter dictum).</p>
            </li>
            <li>
              <strong>Paso 5: Comprobación de Línea Jurisprudencial Vigente o Mutación</strong>
              <p>Verifica si el criterio jurisprudencial no ha sido modulado, reconducido o superado por un estándar jurisprudencial más alto posterior.</p>
            </li>
          </ol>
        </div>
      `
    },
    {
      id: "confidencialidad-secreto-profesional",
      titulo: "¿Qué información confidencial NUNCA introducir en una IA?",
      categoria: "Ética y Privacidad",
      icono: "fa-user-lock",
      resumen: "Protección de datos de clientes, secreto profesional y cumplimiento de la Ley 387 del Ejercicio de la Abogacía.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>El Secreto Profesional en la Era de los Algoritmos</h4>
          <p>El artículo 9 del Código de Ética de la Abogacía boliviana y la Ley Nº 387 establecen la obligación sagrada e inviolable de guardar secreto respecto a cualquier información revelada por el cliente con motivo de la asesoría profesional.</p>

          <div class="grid-confidencialidad">
            <div class="card-confidencialidad prohibido">
              <h5><i class="fa-solid fa-ban"></i> NUNCA Ingresar en una IA Pública</h5>
              <ul>
                <li>Nombres y apellidos completos de clientes o contrapartes.</li>
                <li>Números de Cédula de Identidad (C.I.), NIT o Pasaporte.</li>
                <li>Números de cuentas bancarias, montos patrimoniales exactos y estados de cuenta.</li>
                <li>Direcciones de domicilios reales, teléfonos o correos personales.</li>
                <li>Detalles íntimos o sensibles de menores de edad (Ley 548 prohíbe taxativamente divulgar su identidad).</li>
                <li>Secretos industriales, patentes no publicadas o fórmulas comerciales.</li>
                <li>Copias de cédulas o documentos de identidad escaneados con firmas visibles.</li>
              </ul>
            </div>
            <div class="card-confidencialidad permitido">
              <h5><i class="fa-solid fa-circle-check"></i> SÍ Puedes Ingresar (Anonimizado)</h5>
              <ul>
                <li>Hechos abstractos: <em>"La parte demandante 'A' celebró contrato de compraventa con la empresa 'B'..."</em></li>
                <li>Fechas genéricas o plazos: <em>"Se notificó la resolución el día hábil número 3..."</em></li>
                <li>Preguntas dogmáticas de derecho: <em>"¿Qué causales de interrupción de prescripción prevé el Código Civil boliviano?"</em></li>
                <li>Peticiones de mejora de redacción sobre textos libres de datos privados.</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "checklist-presentacion-memorial",
      titulo: "Checklist Forense antes de presentar un memorial con apoyo de IA",
      categoria: "Práctica Forense",
      icono: "fa-clipboard-check",
      resumen: "Lista de verificación indispensable de 7 puntos que debes validar antes de imprimir y firmar tu memorial.",
      contenidoHtml: `
        <div class="capacitacion-bloque">
          <h4>Checklist de Seguridad Procesal</h4>
          <p>Antes de estampar tu firma y presentar el escrito ante la Mesa de Entradas del Juzgado, marca mentalmente cada uno de estos ítems:</p>

          <div class="checklist-items">
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>1. Verificación de Autoridad y Competencia:</strong> ¿El juzgado y materia corresponden exactamente a la jurisdicción boliviana donde radica el expediente?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>2. Control de Partes y Generales de Ley:</strong> ¿Los datos de las partes (demandante, demandado, terceristas) son correctos y sin alucinaciones de nombres ficticios?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>3. Vigencia Normativa de Artículos:</strong> ¿Comprobaste en la Gaceta Oficial que los artículos citados no están modificados o derogados?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>4. Existencia Real de Jurisprudencia:</strong> ¿Localizaste cada número de SCP o Auto Supremo en las bases oficiales del TCP o TSJ?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>5. Congruencia entre Hechos y Petitorio:</strong> ¿El petitorio (petitum) pide exactamente lo que permite la norma procesal aplicable?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>6. Supresión de Lenguaje 'Robótico':</strong> ¿Eliminaste muletillas típicas de IA como <em>'En resumen...', 'Como modelo de lenguaje...', 'Es importante destacar que...'</em>?
            </label>
            <label class="check-container">
              <input type="checkbox" checked disabled>
              <span class="checkmark"></span>
              <strong>7. Responsabilidad Humana:</strong> ¿Asumes con plena convicción jurídica cada argumento expuesto en el documento?
            </label>
          </div>
        </div>
      `
    }
  ],

  // Casos prácticos y simulaciones para el entrenamiento interactivo
  ejerciciosInteractivas: [
    {
      id: "ejercicio-1",
      titulo: "Caso Práctico 1: Detectar la Jurisprudencia Alucinada",
      enunciado: "Un colega te comparte un borrador de recurso de apelación elaborado con ChatGPT. En el memorial se citan las siguientes tres resoluciones para fundamentar la falta de notificación personal. ¿Cuál de ellas presenta claros indicios de ser una ALUCINACIÓN o cita inconsistente?",
      opciones: [
        {
          id: "a",
          texto: "SCP 0084/2017-S2 del Tribunal Constitucional Plurinacional (sobre notificaciones procesales y derecho a la defensa).",
          esCorrecta: false,
          explicacion: "Esta sentencia es 100% auténtica y verificada en el TCP. Versa precisamente sobre actos de comunicación procesal."
        },
        {
          id: "b",
          texto: "Sentencia Constitucional Plurinacional 0123/2022 del TCP (que supuestamente anula cualquier proceso si la notificación se dejó en secretaría sin aviso previo de WhatsApp).",
          esCorrecta: true,
          explicacion: "¡Correcto! Esta resolución es una típica alucinación de IA: inventa una regla que no existe en el CPC (aviso obligatorio previo de WhatsApp bajo pena de nulidad automática) y cita una SCP 0123/2022 no existente en la gaceta con ese contenido."
        },
        {
          id: "c",
          texto: "SCP 0112/2012 del Tribunal Constitucional Plurinacional (sobre motivación y debido proceso).",
          esCorrecta: false,
          explicacion: "Esta sentencia es real y es una de las sentencias fundantes sobre motivación en Bolivia."
        }
      ]
    },
    {
      id: "ejercicio-2",
      titulo: "Caso Práctico 2: Secreto Profesional y Anonimización",
      enunciado: "Deseas que una IA te ayude a estructurar una demanda por estafa piramidal. ¿Cuál de los siguientes prompts cumple con el deber de confidencialidad y ética profesional?",
      opciones: [
        {
          id: "a",
          texto: "'Mi cliente Juan Pérez con CI 4589212 LP entregó 20,000 USD a la empresa InverBolivia de Mario Gómez en su oficina de la Av. Arce #1420 La Paz...'",
          esCorrecta: false,
          explicacion: "Incorrecto. Este prompt viola flagrantemente el deber de confidencialidad revelando nombres, carnet, montos exactos y ubicación física."
        },
        {
          id: "b",
          texto: "'Estructura los hechos de una querella por estafa en Bolivia (art. 335 CP). Caso: La víctima A entregó fondos a la entidad B bajo promesa ficticia de rendimientos inmobiliarios mensuales, verificándose que el ardid fue previo al desplazamiento patrimonial. Cita doctrina del Auto Supremo 118/2021 sobre delito de estafa vs. incumplimiento civil.'",
          esCorrecta: true,
          explicacion: "¡Excelente! Utiliza variables abstractas (víctima A, entidad B), no expone datos sensibles privados y exige doctrina jurídica real y comprobable."
        },
        {
          id: "c",
          texto: "'Sube este contrato firmado en PDF de mi cliente con su cédula escaneada y redacta la demanda completa con los datos del documento.'",
          esCorrecta: false,
          explicacion: "Peligroso e inadmisible. Subir contratos privados con firmas y cédulas a IAs comerciales abiertas vulnera la privacidad de datos y el secreto profesional."
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAPACITACION_LEGALTECH };
}
