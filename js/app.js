/**
 * LEXBOT BOLIVIA - Aplicación Principal y Orquestador de Interfaz de Usuario
 * Conexión de eventos, navegación responsiva, renderizado de mensajes y exportación
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de submódulos
  const buscador = new BuscadorJurisprudencia(JURISPRUDENCIA_BOLIVIA);
  const verificador = new VerificadorJurisprudencia(JURISPRUDENCIA_BOLIVIA, RESOLUCIONES_CON_DATOS_INCONSISTENTES);
  const redactor = new AsistenteRedaccionJuridica(buscador, verificador);
  const analizador = new AnalizadorExpedientes();
  const capacitador = new CapacitadorLegalTech(CAPACITACION_LEGALTECH);

  // Inicialización del motor conversacional
  const chatEngine = new LexBotChatEngine(buscador, verificador, redactor, analizador, capacitador);

  // Referencias al DOM
  const elementos = {
    // Vistas principales
    vistaChat: document.getElementById("vista-chat"),
    vistaBuscador: document.getElementById("vista-buscador"),
    vistaVerificador: document.getElementById("vista-verificador"),
    vistaRedactor: document.getElementById("vista-redactor"),
    vistaAnalizador: document.getElementById("vista-analizador"),
    vistaCapacitacion: document.getElementById("vista-capacitacion"),

    // Chat
    chatMensajes: document.getElementById("chat-mensajes"),
    inputChat: document.getElementById("input-chat"),
    btnEnviarChat: document.getElementById("btn-enviar-chat"),
    btnNuevoChat: document.getElementById("btn-nuevo-chat"),
    quickChips: document.getElementById("quick-chips"),

    // Botones de módulos en header y bienvenida
    navLinks: document.querySelectorAll(".nav-tab-btn"),
    homeActionBtns: document.querySelectorAll(".home-action-btn"),

    // Módulo 1: Buscador
    buscadorInput: document.getElementById("buscador-termino"),
    buscadorOrgano: document.getElementById("buscador-organo"),
    buscadorMateria: document.getElementById("buscador-materia"),
    buscadorAnio: document.getElementById("buscador-anio"),
    btnEjecutarBusqueda: document.getElementById("btn-ejecutar-busqueda"),
    buscadorResultados: document.getElementById("buscador-resultados"),
    contadorResultados: document.getElementById("contador-resultados"),

    // Módulo 2: Verificador
    verificadorInput: document.getElementById("verificador-input"),
    verificadorArgumento: document.getElementById("verificador-argumento"),
    btnEjecutarVerificacion: document.getElementById("btn-ejecutar-verificacion"),
    verificadorResultadoBox: document.getElementById("verificador-resultado-box"),
    verificadorEjemplos: document.querySelectorAll(".btn-ejemplo-verif"),

    // Módulo 3: Redactor
    selectPlantilla: document.getElementById("redactor-tipo-plantilla"),
    redactorAutoridad: document.getElementById("redactor-autoridad"),
    redactorSuma: document.getElementById("redactor-suma"),
    redactorDemandante: document.getElementById("redactor-demandante"),
    redactorDemandado: document.getElementById("redactor-demandado"),
    redactorHechos: document.getElementById("redactor-hechos"),
    redactorDerecho: document.getElementById("redactor-derecho"),
    redactorPetitorio: document.getElementById("redactor-petitorio"),
    btnGenerarMemorial: document.getElementById("btn-generar-memorial"),
    redactorPreview: document.getElementById("redactor-preview-text"),
    btnCopiarMemorial: document.getElementById("btn-copiar-memorial"),
    btnDescargarWord: document.getElementById("btn-descargar-word"),
    btnImprimirMemorial: document.getElementById("btn-imprimir-memorial"),
    btnMejorarTexto: document.getElementById("btn-mejorar-texto"),

    // Módulo 4: Analizador
    fileInputExpediente: document.getElementById("file-expediente-pdf"),
    areaDropExpediente: document.getElementById("dropzone-expediente"),
    btnAnalizarMuestraConst: document.getElementById("btn-muestra-const"),
    btnAnalizarMuestraCivil: document.getElementById("btn-muestra-civil"),
    textoPegarExpediente: document.getElementById("texto-pegar-expediente"),
    btnProcesarTextoExpediente: document.getElementById("btn-procesar-texto-expediente"),
    analizadorResultadosBox: document.getElementById("analizador-resultados-box"),

    // Módulo 5: Capacitación
    capacitacionTemasGrid: document.getElementById("capacitacion-temas-grid"),
    capacitacionDetalleBox: document.getElementById("capacitacion-detalle-box"),
    inputSimuladorPrompt: document.getElementById("simulador-prompt-input"),
    btnEvaluarPrompt: document.getElementById("btn-evaluar-prompt"),
    resultadoSimuladorBox: document.getElementById("simulador-resultado-box"),
    quizContainer: document.getElementById("quiz-container")
  };

  // ==========================================
  // GESTIÓN DE VISTAS Y NAVEGACIÓN
  // ==========================================
  function cambiarVista(nombreVista) {
    const vistas = [
      elementos.vistaChat,
      elementos.vistaBuscador,
      elementos.vistaVerificador,
      elementos.vistaRedactor,
      elementos.vistaAnalizador,
      elementos.vistaCapacitacion
    ];

    vistas.forEach(v => {
      if (v) v.classList.add("oculto");
    });

    elementos.navLinks.forEach(b => b.classList.remove("activo"));

    const vistaDestino = document.getElementById(`vista-${nombreVista}`);
    if (vistaDestino) {
      vistaDestino.classList.remove("oculto");
    }

    const btnNav = document.querySelector(`.nav-tab-btn[data-vista="${nombreVista}"]`);
    if (btnNav) {
      btnNav.classList.add("activo");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Eventos de barra de navegación
  elementos.navLinks.forEach(btn => {
    btn.addEventListener("click", () => {
      const vista = btn.getAttribute("data-vista");
      cambiarVista(vista);
    });
  });

  // Eventos de botones de acción rápida en bienvenida
  elementos.homeActionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const vista = btn.getAttribute("data-vista");
      cambiarVista(vista);
    });
  });

  // ==========================================
  // LÓGICA DE CHAT CONVERSACIONAL
  // ==========================================
  function enviarMensajeChat(textoManual = null) {
    const texto = textoManual || elementos.inputChat.value.trim();
    if (!texto) return;

    // Agregar mensaje del usuario en pantalla
    renderizarBurbujaMensaje("usuario", texto);
    if (!textoManual) {
      elementos.inputChat.value = "";
    }

    // Efecto de pensando
    const pensandoId = renderizarBurbujaPensando();

    setTimeout(() => {
      removerBurbujaPensando(pensandoId);

      // Procesamiento a través del motor inteligente
      const respuesta = chatEngine.procesarMensaje(texto);

      // Renderizar respuesta de LexBot
      renderizarRespuestaLexBot(respuesta);
    }, 450);
  }

  elementos.btnEnviarChat.addEventListener("click", () => enviarMensajeChat());
  elementos.inputChat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensajeChat();
    }
  });

  // Nuevo chat / reiniciar
  elementos.btnNuevoChat.addEventListener("click", () => {
    if (confirm("¿Deseas reiniciar la conversación con LEXBOT?")) {
      elementos.chatMensajes.innerHTML = "";
      renderizarMensajeBienvenida();
    }
  });

  function renderizarBurbujaMensaje(rol, contenidoHtml) {
    const div = document.createElement("div");
    div.className = `mensaje-burbuja mensaje-${rol} animar-aparicion`;

    const avatar = rol === "usuario" 
      ? `<div class="avatar avatar-user"><i class="fa-solid fa-user-tie"></i></div>`
      : `<div class="avatar avatar-lexbot"><img src="assets/logo-icon.svg" alt="LexBot" /></div>`;

    div.innerHTML = `
      ${avatar}
      <div class="mensaje-cuerpo">
        <div class="mensaje-remitente">${rol === "usuario" ? "Tú (Profesional del Derecho)" : "LEXBOT BOLIVIA"}</div>
        <div class="mensaje-texto">${contenidoHtml}</div>
      </div>
    `;

    elementos.chatMensajes.appendChild(div);
    scrollToBottomChat();
  }

  function renderizarBurbujaPensando() {
    const id = "pensando-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "mensaje-burbuja mensaje-asistente animar-aparicion";
    div.innerHTML = `
      <div class="avatar avatar-lexbot"><img src="assets/logo-icon.svg" alt="LexBot" /></div>
      <div class="mensaje-cuerpo">
        <div class="mensaje-remitente">LEXBOT BOLIVIA</div>
        <div class="pensando-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    elementos.chatMensajes.appendChild(div);
    scrollToBottomChat();
    return id;
  }

  function removerBurbujaPensando(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function renderizarRespuestaLexBot(respuesta) {
    const div = document.createElement("div");
    div.className = "mensaje-burbuja mensaje-asistente animar-aparicion";

    let htmlContenido = formatearMarkdown(respuesta.contenido);

    // Si tiene informe de verificación
    if (respuesta.resultado) {
      const res = respuesta.resultado;
      htmlContenido += `
        <div class="verificacion-card-chat ${res.colorBadge}">
          <div class="verif-header">
            <span class="badge ${res.colorBadge}"><i class="fa-solid ${res.icono}"></i> ESTADO: ${res.estado}</span>
            <span class="verif-id">${res.resolucionIdentificada}</span>
          </div>
          <div class="verif-body">
            <p><strong>Órgano:</strong> ${res.organoOficial || res.organoReferido || "En investigación"}</p>
            <p><strong>Fuente:</strong> ${res.fuenteConsultada}</p>
            ${res.enlaceOficial ? `<a href="${res.enlaceOficial}" target="_blank" class="btn-enlace-oficial"><i class="fa-solid fa-arrow-up-right-from-square"></i> Acceder a Fuente Oficial</a>` : ""}
          </div>
        </div>
      `;
    }

    // Si tiene resoluciones encontradas
    if (respuesta.resultados && respuesta.resultados.length > 0) {
      htmlContenido += `<div class="resultados-preview-chat">`;
      for (const item of respuesta.resultados) {
        htmlContenido += `
          <div class="item-juris-chat">
            <div class="item-juris-badge"><span class="badge-tag">${item.organo}</span> <span class="badge-verified"><i class="fa-solid fa-circle-check"></i> VERIFICADA</span></div>
            <h5>${item.numeroCompleto} (${item.fecha})</h5>
            <p class="item-juris-tema"><strong>Materia:</strong> ${item.materia} | <strong>Tema:</strong> ${item.tema}</p>
            <p class="item-juris-resumen">${item.resumen}</p>
            <div class="item-juris-actions">
              <a href="${item.fuenteOficial}" target="_blank" class="link-oficial"><i class="fa-solid fa-arrow-up-right-from-square"></i> Fuente Oficial</a>
              <button class="btn-ver-ficha" data-id="${item.id}"><i class="fa-solid fa-file-lines"></i> Ficha Completa de 9 Puntos</button>
            </div>
          </div>
        `;
      }
      htmlContenido += `</div>`;
    }

    // Acciones sugeridas
    let accionesHtml = "";
    if (respuesta.accionesSugeridas && respuesta.accionesSugeridas.length > 0) {
      accionesHtml = `<div class="acciones-sugeridas-chips">`;
      for (const acc of respuesta.accionesSugeridas) {
        let icono = "fa-wand-magic-sparkles";
        if (acc.modulo === "buscador") icono = "fa-magnifying-glass";
        else if (acc.modulo === "verificador") icono = "fa-shield-halved";
        else if (acc.modulo === "redactor") icono = "fa-pen-nib";
        else if (acc.modulo === "analizador") icono = "fa-file-contract";
        else if (acc.modulo === "capacitacion") icono = "fa-graduation-cap";

        const esModuloPrincipal = acc.label.match(/^\d\./);
        const claseExtra = esModuloPrincipal ? "chip-principal" : "";

        accionesHtml += `<button class="chip-accion ${claseExtra}" data-modulo="${acc.modulo || ''}" data-prompt="${acc.prompt || ''}" data-termino="${acc.termino || ''}" data-temaid="${acc.temaId || ''}" data-plantilla="${acc.plantilla || ''}"><i class="fa-solid ${icono}"></i> ${acc.label}</button>`;
      }
      accionesHtml += `</div>`;
    }

    div.innerHTML = `
      <div class="avatar avatar-lexbot"><img src="assets/logo-icon.svg" alt="LexBot" /></div>
      <div class="mensaje-cuerpo">
        <div class="mensaje-remitente">
          <span>LEXBOT BOLIVIA</span>
          <button class="btn-copiar-chat" title="Copiar respuesta"><i class="fa-regular fa-copy"></i> Copiar</button>
        </div>
        <div class="mensaje-texto">${htmlContenido}</div>
        ${accionesHtml}
      </div>
    `;

    elementos.chatMensajes.appendChild(div);
    scrollToBottomChat();

    // Eventos para botones dentro del mensaje
    div.querySelectorAll(".btn-ver-ficha").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        mostrarModalFichaJurisprudencia(id);
      });
    });

    div.querySelectorAll(".chip-accion").forEach(b => {
      b.addEventListener("click", () => {
        const mod = b.getAttribute("data-modulo");
        const prompt = b.getAttribute("data-prompt");
        const termino = b.getAttribute("data-termino");
        const temaId = b.getAttribute("data-temaid");
        const plantilla = b.getAttribute("data-plantilla");

        if (prompt) {
          enviarMensajeChat(prompt);
        } else if (mod === "buscador") {
          cambiarVista("buscador");
          if (termino) {
            elementos.buscadorInput.value = termino;
            ejecutarBusquedaJurisprudencia();
          }
        } else if (mod === "verificador") {
          cambiarVista("verificador");
        } else if (mod === "redactor") {
          cambiarVista("redactor");
          if (plantilla) {
            elementos.selectPlantilla.value = plantilla;
            cargarPlantillaRedactor(plantilla);
          }
        } else if (mod === "capacitacion") {
          cambiarVista("capacitacion");
          if (temaId) {
            mostrarDetalleCapacitacion(temaId);
          }
        } else if (mod === "analizador") {
          cambiarVista("analizador");
        }
      });
    });

    div.querySelector(".btn-copiar-chat").addEventListener("click", (e) => {
      navigator.clipboard.writeText(div.querySelector(".mensaje-texto").innerText).then(() => {
        e.target.innerHTML = `<i class="fa-solid fa-check"></i> Copiado`;
        setTimeout(() => e.target.innerHTML = `<i class="fa-regular fa-copy"></i> Copiar`, 2000);
      });
    });
  }

  function renderizarMensajeBienvenida() {
    const saludo = chatEngine.procesarMensaje("hola");
    renderizarRespuestaLexBot(saludo);
  }

  function scrollToBottomChat() {
    elementos.chatMensajes.scrollTop = elementos.chatMensajes.scrollHeight;
  }

  // ==========================================
  // MÓDULO 1: BUSCADOR DE JURISPRUDENCIA
  // ==========================================
  function ejecutarBusquedaJurisprudencia() {
    const termino = elementos.buscadorInput.value.trim();
    const organo = elementos.buscadorOrgano.value;
    const materia = elementos.buscadorMateria.value;
    const anio = elementos.buscadorAnio.value;

    const resultados = buscador.buscar({ termino, organo, materia, anio });

    elementos.contadorResultados.textContent = `${resultados.length} resoluciones encontradas`;
    elementos.buscadorResultados.innerHTML = "";

    if (resultados.length === 0) {
      elementos.buscadorResultados.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-book-skull"></i>
          <h4>No se encontraron resoluciones con los criterios ingresados</h4>
          <p>LEXBOT BOLIVIA cumple con la <strong>Regla de Seguridad Nº 1</strong>: Jamás inventamos resoluciones ni mostramos datos sin respaldo oficial.</p>
          <p>Pruebe buscando por términos como "debido proceso", "presunción de inocencia", "notificación", "incumplimiento", o números como "0112/2012" o "450/2016".</p>
        </div>
      `;
      return;
    }

    for (const res of resultados) {
      const ficha = buscador.formatearFichaDetallada(res, termino);
      const card = document.createElement("div");
      card.className = "juris-card-completa animar-aparicion";
      card.innerHTML = `
        <div class="juris-card-header">
          <div class="juris-header-tags">
            <span class="tag-organo">${res.organo}</span>
            <span class="tag-materia">${res.materia}</span>
            <span class="tag-estado-verif"><i class="fa-solid fa-circle-check"></i> VERIFICADA</span>
          </div>
          <div class="juris-num-fecha">
            <h3>${res.numeroCompleto}</h3>
            <span class="juris-fecha"><i class="fa-regular fa-calendar"></i> ${res.fecha}</span>
          </div>
        </div>

        <div class="juris-card-body">
          <h4 class="juris-tema-titulo">${res.tema}</h4>
          
          <div class="juris-seccion">
            <h5><i class="fa-solid fa-align-left"></i> Resumen de Hechos y Contenido:</h5>
            <p>${res.resumen}</p>
          </div>

          <div class="juris-seccion seccion-fundamento">
            <h5><i class="fa-solid fa-gavel"></i> Ratio Decidendi (Fundamento Jurídico Vinculante):</h5>
            <p>${res.fundamentoJuridico}</p>
          </div>

          <div class="juris-seccion seccion-criterio">
            <h5><i class="fa-solid fa-quote-left"></i> Criterio Jurisprudencial Rector:</h5>
            <p>${res.criterioJurisprudencial}</p>
          </div>

          <div class="juris-seccion seccion-pertinencia">
            <h5><i class="fa-solid fa-circle-info"></i> Relación y Pertinencia con su Consulta:</h5>
            <p>${ficha.punto8_relacionConsulta}</p>
          </div>

          <div class="juris-articulos-invocados">
            <strong>Normas Vinculadas:</strong>
            ${res.articulosRelacionados.map(a => `<span class="badge-articulo">${a}</span>`).join(" ")}
          </div>
        </div>

        <div class="juris-card-footer">
          <a href="${res.fuenteOficial}" target="_blank" class="btn-oficial-externo">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Consultar en Fuente Oficial (${res.sigla})
          </a>
          <button class="btn-usar-redactor" data-id="${res.id}">
            <i class="fa-solid fa-pen-nib"></i> Usar esta cita en un Memorial
          </button>
        </div>
      `;

      card.querySelector(".btn-usar-redactor").addEventListener("click", () => {
        cambiarVista("redactor");
        elementos.redactorDerecho.value += `\nAl tenor del precedente vinculante sentado en la ${res.numeroCompleto} del ${res.organo}, de fecha ${res.fecha}: "${res.criterioJurisprudencial}"\n`;
        alert(`Se incorporó la jurisprudencia ${res.numeroCompleto} al borrador del memorial.`);
      });

      elementos.buscadorResultados.appendChild(card);
    }
  }

  elementos.btnEjecutarBusqueda.addEventListener("click", ejecutarBusquedaJurisprudencia);
  elementos.buscadorInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") ejecutarBusquedaJurisprudencia();
  });
  elementos.buscadorOrgano.addEventListener("change", ejecutarBusquedaJurisprudencia);
  elementos.buscadorMateria.addEventListener("change", ejecutarBusquedaJurisprudencia);
  elementos.buscadorAnio.addEventListener("change", ejecutarBusquedaJurisprudencia);

  // ==========================================
  // MÓDULO 2: VERIFICADOR DE JURISPRUDENCIA
  // ==========================================
  function ejecutarVerificacionDirecta() {
    const texto = elementos.verificadorInput.value.trim();
    const argumento = elementos.verificadorArgumento.value.trim();

    if (!texto) {
      alert("Por favor escribe o pega la resolución que deseas verificar.");
      return;
    }

    const resultado = verificador.verificar(texto, argumento);
    renderizarInformeVerificador(resultado);
  }

  function renderizarInformeVerificador(res) {
    const box = elementos.verificadorResultadoBox;
    box.classList.remove("oculto");

    let badgeClass = "badge-success";
    if (res.estado === "DATOS INCONSISTENTES") badgeClass = "badge-danger";
    else if (res.estado === "NO VERIFICADA") badgeClass = "badge-warning";

    let pasosHtml = "";
    if (res.pasosParaComprobacionManual) {
      pasosHtml = `
        <div class="verif-pasos-manual">
          <h5><i class="fa-solid fa-clipboard-list"></i> Pasos para verificación física o manual:</h5>
          <ol>
            ${res.pasosParaComprobacionManual.map(p => `<li>${p}</li>`).join("")}
          </ol>
        </div>
      `;
    }

    box.innerHTML = `
      <div class="verif-resultado-card ${badgeClass} animar-aparicion">
        <div class="verif-header-top">
          <div class="verif-status-pill ${badgeClass}">
            <i class="fa-solid ${res.icono}"></i> ESTADO: ${res.estado}
          </div>
          <div class="verif-id-pill">Referencia: <strong>${res.resolucionIdentificada}</strong></div>
        </div>

        <div class="verif-content-area">
          <h3>${res.mensajePrincipal}</h3>
          <p class="verif-descripcion-analisis">${res.analisisDetallado.replace(/\n/g, "<br>")}</p>

          ${res.evaluacionArgumental ? `
            <div class="verif-argumento-cotejo">
              <strong>Cotejo de Respaldo Argumental:</strong>
              <p>${res.evaluacionArgumental.explicacion}</p>
            </div>
          ` : ""}

          ${res.resolucionSugerida ? `
            <div class="verif-sugerencia-alerta">
              <h4><i class="fa-solid fa-lightbulb"></i> Resolución Real Existente para este Supuesto:</h4>
              <p><strong>${res.resolucionSugerida.numeroReal}</strong> (${res.resolucionSugerida.organo})</p>
              <p>${res.resolucionSugerida.motivoDiferencia}</p>
            </div>
          ` : ""}

          ${res.recomendacionForense ? `
            <div class="verif-recomendacion-caja">
              <strong><i class="fa-solid fa-user-shield"></i> Recomendación Forense para el Abogado:</strong>
              <p>${res.recomendacionForense}</p>
            </div>
          ` : ""}

          ${pasosHtml}

          <div class="verif-metadata-grid">
            <div><strong>Órgano Oficial:</strong> ${res.organoOficial || res.organoReferido || "No determinado"}</div>
            <div><strong>Fuente Consultada:</strong> ${res.fuenteConsultada}</div>
            ${res.fechaOficial ? `<div><strong>Fecha Oficial de Emisión:</strong> ${res.fechaOficial}</div>` : ""}
            ${res.materiaOficial ? `<div><strong>Materia:</strong> ${res.materiaOficial}</div>` : ""}
          </div>

          ${res.enlaceOficial ? `
            <div class="verif-acciones-footer">
              <a href="${res.enlaceOficial}" target="_blank" class="btn-link-oficial-verif">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Consultar Ficha Oficial en Buscador del Estado
              </a>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    box.scrollIntoView({ behavior: "smooth" });
  }

  elementos.btnEjecutarVerificacion.addEventListener("click", ejecutarVerificacionDirecta);
  elementos.verificadorEjemplos.forEach(b => {
    b.addEventListener("click", () => {
      const ej = b.getAttribute("data-ejemplo");
      elementos.verificadorInput.value = ej;
      ejecutarVerificacionDirecta();
    });
  });

  // ==========================================
  // MÓDULO 3: ASISTENTE DE REDACCIÓN
  // ==========================================
  function cargarPlantillaRedactor(tipo) {
    const pl = redactor.plantillas[tipo];
    if (!pl) return;
    elementos.redactorAutoridad.value = pl.autoridadSugerida;
    elementos.redactorSuma.value = pl.sumaDefecto;
    elementos.redactorDerecho.value = pl.articulosBase.map(a => `• Amparado en el ${a}`).join("\n");
  }

  elementos.selectPlantilla.addEventListener("change", (e) => {
    cargarPlantillaRedactor(e.target.value);
  });

  elementos.btnGenerarMemorial.addEventListener("click", () => {
    const tipoPlantilla = elementos.selectPlantilla.value;
    const autoridad = elementos.redactorAutoridad.value;
    const suma = elementos.redactorSuma.value;
    const demandante = elementos.redactorDemandante.value;
    const demandado = elementos.redactorDemandado.value;
    const hechos = elementos.redactorHechos.value;
    const derecho = elementos.redactorDerecho.value;
    const petitorio = elementos.redactorPetitorio.value;

    const res = redactor.generarMemorial({
      tipoPlantilla,
      autoridad,
      suma,
      demandante,
      demandado,
      hechos,
      derecho,
      petitorio
    });

    elementos.redactorPreview.value = res.documentoCompleto;
    document.getElementById("seccion-preview-memorial").classList.remove("oculto");
    document.getElementById("seccion-preview-memorial").scrollIntoView({ behavior: "smooth" });
  });

  elementos.btnMejorarTexto.addEventListener("click", () => {
    const textoActual = elementos.redactorHechos.value;
    if (!textoActual) {
      alert("Escribe primero los antecedentes de hecho para mejorarlos.");
      return;
    }
    const resultado = redactor.mejorarRedaccion(textoActual);
    elementos.redactorHechos.value = resultado.textoMejorado;
    alert(`Se optimizó la terminología jurídica forense.\nSustituciones aplicadas: ${resultado.terminosOptimizados.length}`);
  });

  elementos.btnCopiarMemorial.addEventListener("click", () => {
    navigator.clipboard.writeText(elementos.redactorPreview.value).then(() => {
      alert("¡Memorial copiado con éxito al portapapeles!");
    });
  });

  elementos.btnDescargarWord.addEventListener("click", () => {
    const texto = elementos.redactorPreview.value;
    const blob = new Blob([texto], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Memorial_LexBot_${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  });

  elementos.btnImprimirMemorial.addEventListener("click", () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`<pre style="font-family: 'Times New Roman', serif; font-size: 12pt; white-space: pre-wrap; padding: 40px; line-height: 1.5;">${elementos.redactorPreview.value}</pre>`);
    ventana.document.close();
    ventana.print();
  });

  // ==========================================
  // MÓDULO 4: ANALIZADOR DE EXPEDIENTES
  // ==========================================
  function procesarTextoExpediente(texto) {
    const resultado = analizador.analizarExpediente(texto);
    renderizarAuditoriaExpediente(resultado);
  }

  function renderizarAuditoriaExpediente(res) {
    const box = elementos.analizadorResultadosBox;
    box.classList.remove("oculto");

    if (res.error) {
      box.innerHTML = `<div class="alerta-box alerta-danger">${res.mensaje}</div>`;
      return;
    }

    box.innerHTML = `
      <div class="analisis-dashboard animar-aparicion">
        <div class="dashboard-banner">
          <h3><i class="fa-solid fa-scale-balanced"></i> Informe de Auditoría y Resumen Forense</h3>
          <p class="nota-distincion"><strong>Distinción Ética:</strong> ${res.notaDiferenciacion.hechosExpresos} ${res.notaDiferenciacion.interpretacionAsistente}</p>
        </div>

        <div class="grid-resumen-expediente">
          <div class="resumen-card">
            <h4><i class="fa-solid fa-users"></i> Sujetos Procesales Identificados</h4>
            <ul>
              <li><strong>Demandante / Accionante:</strong> ${res.partesInvolucradas.demandanteAccionante}</li>
              <li><strong>Demandado / Accionado:</strong> ${res.partesInvolucradas.demandadoAccionado}</li>
              <li><strong>Autoridad Radicadora:</strong> ${res.partesInvolucradas.autoridadJudicial}</li>
              ${res.partesInvolucradas.terceros.length > 0 ? `<li><strong>Terceros:</strong> ${res.partesInvolucradas.terceros.join(", ")}</li>` : ""}
            </ul>
          </div>

          <div class="resumen-card">
            <h4><i class="fa-solid fa-bullseye"></i> Pretensiones Principales</h4>
            <div><strong>Actor:</strong> ${res.pretensionesPartes.demandante.join("; ")}</div>
            <div style="margin-top: 8px;"><strong>Contestación / Defensa:</strong> ${res.pretensionesPartes.demandado.join("; ")}</div>
          </div>
        </div>

        <div class="dashboard-seccion">
          <h4><i class="fa-solid fa-newspaper"></i> Resumen Ejecutivo de la Causa</h4>
          <p class="texto-resumen-ejecutivo">${res.resumenEjecutivo}</p>
        </div>

        <div class="dashboard-seccion">
          <h4><i class="fa-solid fa-clock-rotate-left"></i> Cronología Procesal Organizada</h4>
          <div class="timeline-container">
            ${res.cronologiaActuaciones.map(act => `
              <div class="timeline-item">
                <span class="timeline-date">${act.referenciaTemporal}</span>
                <p class="timeline-content">${act.actuacion}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="dashboard-seccion">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> Contradicciones y Puntos Débiles Detectados</h4>
          <div class="contradicciones-grid">
            ${res.contradiccionesDetectadas.map(c => `
              <div class="contradiccion-card">
                <h5>${c.asunto}</h5>
                <p><strong>Dato en Documento:</strong> ${c.datoExpresoDocumento}</p>
                <div class="calif-tag">${c.calificacion}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="dashboard-seccion">
          <h4><i class="fa-solid fa-book-bookmark"></i> Normas y Precedentes Invocados en el Expediente</h4>
          <div class="normas-tags-list">
            ${res.normasMencionadas.map(n => `<span class="badge-tag-norma">${n}</span>`).join(" ")}
          </div>
        </div>

        <div class="dashboard-seccion">
          <h4><i class="fa-solid fa-shield-virus"></i> Aspectos que Requieren Mayor Análisis / Alertas</h4>
          <div class="alertas-grid">
            ${res.aspectosMayorAnalisis.map(a => `
              <div class="alerta-item alerta-${a.nivel.toLowerCase()}">
                <span class="alerta-pill">${a.nivel}</span>
                <strong>${a.titulo}</strong>
                <p>${a.detalle}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    box.scrollIntoView({ behavior: "smooth" });
  }

  elementos.btnProcesarTextoExpediente.addEventListener("click", () => {
    const txt = elementos.textoPegarExpediente.value;
    procesarTextoExpediente(txt);
  });

  elementos.btnAnalizarMuestraConst.addEventListener("click", () => {
    const exp = analizador.expedientesMuestra.find(e => e.id === "exp-constitucional-01");
    if (exp) {
      elementos.textoPegarExpediente.value = exp.textoCompleto;
      procesarTextoExpediente(exp.textoCompleto);
    }
  });

  elementos.btnAnalizarMuestraCivil.addEventListener("click", () => {
    const exp = analizador.expedientesMuestra.find(e => e.id === "exp-civil-02");
    if (exp) {
      elementos.textoPegarExpediente.value = exp.textoCompleto;
      procesarTextoExpediente(exp.textoCompleto);
    }
  });

  // Manejo de carga de archivos (PDF / TXT)
  elementos.fileInputExpediente.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      leerArchivoPDF(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const texto = event.target.result;
        elementos.textoPegarExpediente.value = texto;
        procesarTextoExpediente(texto);
      };
      reader.readAsText(file);
    }
  });

  function leerArchivoPDF(file) {
    if (typeof pdfjsLib !== "undefined") {
      const fileReader = new FileReader();
      fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedarray).promise.then(pdf => {
          let textoTotal = "";
          const totalPaginas = pdf.numPages;
          let promesasPaginas = [];

          for (let i = 1; i <= totalPaginas; i++) {
            promesasPaginas.push(
              pdf.getPage(i).then(page => {
                return page.getTextContent().then(textContent => {
                  return `[PÁGINA ${page.pageNumber}]\n` + textContent.items.map(item => item.str).join(" ");
                });
              })
            );
          }

          Promise.all(promesasPaginas).then(paginas => {
            textoTotal = paginas.join("\n\n");
            elementos.textoPegarExpediente.value = textoTotal;
            procesarTextoExpediente(textoTotal);
          });
        }).catch(err => {
          alert("Error al parsear el PDF: " + err.message);
        });
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      // Fallback si no hay conexión a pdf.js
      alert("Cargando archivo de texto del expediente...");
      const reader = new FileReader();
      reader.onload = (event) => {
        elementos.textoPegarExpediente.value = event.target.result;
        procesarTextoExpediente(event.target.result);
      };
      reader.readAsText(file);
    }
  }

  // ==========================================
  // MÓDULO 5: CAPACITACIÓN EN INTELIGENCIA ARTIFICIAL
  // ==========================================
  function renderizarTemasCapacitacion() {
    const temas = capacitador.obtenerTemas();
    elementos.capacitacionTemasGrid.innerHTML = "";

    temas.forEach(tema => {
      const card = document.createElement("div");
      card.className = "tema-card animar-aparicion";
      card.innerHTML = `
        <div class="tema-icon-box"><i class="fa-solid ${tema.icono}"></i></div>
        <div class="tema-cat">${tema.categoria}</div>
        <h4>${tema.titulo}</h4>
        <p>${tema.resumen}</p>
        <button class="btn-leer-tema" data-id="${tema.id}"><i class="fa-solid fa-book-open-reader"></i> Leer Módulo</button>
      `;

      card.querySelector(".btn-leer-tema").addEventListener("click", () => {
        mostrarDetalleCapacitacion(tema.id);
      });

      elementos.capacitacionTemasGrid.appendChild(card);
    });

    renderizarQuiz();
  }

  function mostrarDetalleCapacitacion(temaId) {
    const tema = capacitador.obtenerTemaPorId(temaId);
    if (!tema) return;

    elementos.capacitacionDetalleBox.classList.remove("oculto");
    elementos.capacitacionDetalleBox.innerHTML = `
      <div class="detalle-capacitacion-inner animar-aparicion">
        <button class="btn-cerrar-detalle" id="btn-cerrar-tema"><i class="fa-solid fa-xmark"></i> Cerrar Módulo</button>
        <div class="tema-header">
          <span class="cat-pill">${tema.categoria}</span>
          <h2>${tema.titulo}</h2>
        </div>
        <div class="tema-html-body">${tema.contenidoHtml}</div>
      </div>
    `;

    document.getElementById("btn-cerrar-tema").addEventListener("click", () => {
      elementos.capacitacionDetalleBox.classList.add("oculto");
    });

    elementos.capacitacionDetalleBox.scrollIntoView({ behavior: "smooth" });
  }

  // Simulador de Prompts
  elementos.btnEvaluarPrompt.addEventListener("click", () => {
    const promptTxt = elementos.inputSimuladorPrompt.value;
    const res = capacitador.evaluarPromptJuridico(promptTxt);

    elementos.resultadoSimuladorBox.classList.remove("oculto");
    elementos.resultadoSimuladorBox.innerHTML = `
      <div class="evaluacion-prompt-card animar-aparicion">
        <div class="eval-header">
          <div class="eval-score">Calificación: <strong>${res.calificacion}</strong> (${res.puntuacion}/100)</div>
        </div>
        <p class="eval-diag">${res.diagnostico || ""}</p>

        <div class="grid-eval-detalles">
          <div class="eval-col cumplidos">
            <h5><i class="fa-solid fa-circle-check"></i> Aciertos Detectados:</h5>
            <ul>${res.cumplimientos.map(c => `<li>${c}</li>`).join("")}</ul>
          </div>
          <div class="eval-col omisiones">
            <h5><i class="fa-solid fa-triangle-exclamation"></i> Oportunidades de Mejora:</h5>
            <ul>${res.omisiones.map(o => `<li>${o}</li>`).join("")}</ul>
          </div>
        </div>

        <div class="prompt-optimizado-box">
          <h5><i class="fa-solid fa-wand-magic-sparkles"></i> Prompt Reestructurado Recomendado por LEXBOT:</h5>
          <pre><code>${res.promptReestructuradoSugerido}</code></pre>
          <button class="btn-copiar-prompt-opt" id="btn-copiar-opt"><i class="fa-regular fa-copy"></i> Copiar Prompt Optimizado</button>
        </div>
      </div>
    `;

    document.getElementById("btn-copiar-opt").addEventListener("click", () => {
      navigator.clipboard.writeText(res.promptReestructuradoSugerido).then(() => {
        alert("¡Prompt optimizado copiado al portapapeles!");
      });
    });
  });

  // Quiz de Evaluación Deontológica
  function renderizarQuiz() {
    const ejercicios = capacitador.obtenerEjercicios();
    elementos.quizContainer.innerHTML = "";

    ejercicios.forEach((ej, idx) => {
      const card = document.createElement("div");
      card.className = "quiz-card animar-aparicion";
      card.innerHTML = `
        <h4>${ej.titulo}</h4>
        <p class="quiz-enunciado">${ej.enunciado}</p>
        <div class="quiz-opciones">
          ${ej.opciones.map(op => `
            <button class="btn-opcion-quiz" data-ejid="${ej.id}" data-opid="${op.id}">
              <span class="op-letra">${op.id.toUpperCase()})</span> ${op.texto}
            </button>
          `).join("")}
        </div>
        <div class="quiz-feedback oculto" id="feedback-${ej.id}"></div>
      `;

      card.querySelectorAll(".btn-opcion-quiz").forEach(btn => {
        btn.addEventListener("click", () => {
          const opId = btn.getAttribute("data-opid");
          const opcion = ej.opciones.find(o => o.id === opId);
          const feedback = card.querySelector(`#feedback-${ej.id}`);
          feedback.classList.remove("oculto");

          card.querySelectorAll(".btn-opcion-quiz").forEach(b => b.disabled = true);

          if (opcion.esCorrecta) {
            btn.classList.add("correcta");
            feedback.className = "quiz-feedback correcta";
            feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>¡Correcto!</strong> ${opcion.explicacion}`;
          } else {
            btn.classList.add("incorrecta");
            feedback.className = "quiz-feedback incorrecta";
            feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Incorrecto.</strong> ${opcion.explicacion}`;
          }
        });
      });

      elementos.quizContainer.appendChild(card);
    });
  }

  // ==========================================
  // MODAL DE FICHA JURISPRUDENCIAL COMPLETA
  // ==========================================
  function mostrarModalFichaJurisprudencia(id) {
    const item = JURISPRUDENCIA_BOLIVIA.find(j => j.id === id);
    if (!item) return;

    const modal = document.getElementById("modal-ficha-juris");
    const modalBody = document.getElementById("modal-ficha-body");

    modalBody.innerHTML = `
      <div class="ficha-modal-inner">
        <div class="ficha-header-modal">
          <span class="tag-organo">${item.organo}</span>
          <h2>${item.numeroCompleto}</h2>
          <span class="ficha-fecha"><i class="fa-regular fa-calendar"></i> Fecha de emisión oficial: ${item.fecha}</span>
        </div>

        <div class="ficha-grid-9puntos">
          <div class="ficha-row"><strong>1. Número de Resolución:</strong> ${item.numeroCompleto}</div>
          <div class="ficha-row"><strong>2. Fecha de Emisión:</strong> ${item.fecha}</div>
          <div class="ficha-row"><strong>3. Órgano Emisor:</strong> ${item.organo} (${item.sala})</div>
          <div class="ficha-row"><strong>4. Materia Jurídica:</strong> ${item.materia}</div>
          <div class="ficha-row"><strong>5. Resumen del Contenido:</strong> ${item.resumen}</div>
          <div class="ficha-row"><strong>6. Fundamento Jurídico (Ratio Decidendi):</strong> ${item.fundamentoJuridico}</div>
          <div class="ficha-row"><strong>7. Criterio Jurisprudencial Rector:</strong> ${item.criterioJurisprudencial}</div>
          <div class="ficha-row"><strong>8. Relación con la Consulta:</strong> Precedente vinculante de aplicación obligatoria para la materia y supuestos fácticos afines.</div>
          <div class="ficha-row"><strong>9. Enlace a Fuente Oficial:</strong> <a href="${item.fuenteOficial}" target="_blank">${item.fuenteOficial}</a></div>
        </div>

        <div class="ficha-modal-actions">
          <a href="${item.fuenteOficial}" target="_blank" class="btn-oficial-externo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir en Portal Oficial</a>
        </div>
      </div>
    `;

    modal.classList.remove("oculto");
  }

  document.getElementById("btn-cerrar-modal-ficha").addEventListener("click", () => {
    document.getElementById("modal-ficha-juris").classList.add("oculto");
  });

  // ==========================================
  // INICIALIZACIÓN GENERAL
  // ==========================================
  renderizarMensajeBienvenida();
  cargarPlantillaRedactor("demanda_civil");
  renderizarTemasCapacitacion();
});

// Helper de formato Markdown a HTML simple y seguro
function formatearMarkdown(texto) {
  if (!texto) return "";
  let html = texto
    .replace(/^### (.*$)/gim, "<h4>$1</h4>")
    .replace(/^## (.*$)/gim, "<h3>$1</h3>")
    .replace(/^# (.*$)/gim, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/gim, "<br><br>")
    .replace(/^\* (.*$)/gim, "• $1");
  return html;
}
