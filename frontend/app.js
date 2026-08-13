const SECTION = "var(--accent)";
const API_BASE = location.hostname === "localhost" && location.port === "8088" ? "http://localhost:8080" : "";

const instincts = [
  {
    id: "trascendencia", name: "Trascendencia", icon: "✦", color: "var(--instinct-trascendencia)", family: "Emergente",
    definition: "Sentir que lo que haces importa más allá de ti mismo. No es religión necesariamente — es la sensación de que hay algo más grande que tu vida cotidiana que le da dirección y sentido.",
    ingredients: ["Contribución visible en otros — poder ver el efecto de lo que haces", "Valores que se viven sin audiencia, no solo cuando alguien mira", "Un ‘para qué’ claro que no cambia cuando cambian las circunstancias", "Coherencia entre lo que dices que importa y cómo usas tu tiempo real"],
    works: "Sabes para qué estás haciendo todo esto. Los momentos difíciles tienen un lugar en un mapa más grande. No necesitas que cada día sea inspirador para sentir que la dirección es correcta.",
    fails: "Logras metas importantes y sientes vacío inmediatamente después. Estás muy ocupado pero no sabes bien para qué. La productividad sustituye al propósito — hacer mucho evita preguntarse hacia dónde."
  },
  {
    id: "construir", name: "Construir", icon: "◇", color: "var(--instinct-construir-competir)", family: "Competente",
    definition: "Sentirte capaz porque algo que no existía ahora existe gracias a lo que hiciste. Ese algo puede ser tangible — un objeto, un proyecto, una habilidad — o relacional: una familia sostenida, un hijo que crece, una red de vínculos que tú mantienes viva. En ambos casos el ciclo cierra igual: hay un antes y un después visible que vino de ti.",
    ingredients: ["Un resultado que puedes señalar — físico o en personas", "Inicio y fin reconocibles, aunque el fin sea un hito dentro de algo más largo", "Una habilidad o capacidad que progresa con el tiempo", "Un criterio propio de ‘esto está bien hecho’ que no depende de que alguien más lo confirme"],
    works: "Puedes reconocer — aunque sea solo tú — que algo cambió porque tú estuviste. Un proyecto terminado, un hijo que aprendió algo, una relación que sobrevivió una crisis porque tú la sostuviste.",
    fails: "El esfuerzo existe pero el ciclo no cierra: proyectos eternos sin entrega, cuidado constante sin ningún momento de ‘esto funcionó’, aprendizaje acumulado que nunca se convierte en algo concreto."
  },
  {
    id: "competir", name: "Competir", icon: "★", color: "var(--instinct-construir-competir)", family: "Competente",
    definition: "Sentirte capaz mediante un estándar externo: un oponente, un cronómetro o un ranking cuyo resultado era incierto.",
    ingredients: ["Un estándar externo activo", "Incertidumbre del resultado", "Ciclos frecuentes", "Una comunidad de pares"],
    works: "Existe un momento claro en que el resultado confirma lo que fuiste capaz de hacer.",
    fails: "El marcador nunca basta y la satisfacción dura cada vez menos después de cada logro."
  },
  {
    id: "autonomia", name: "Autonomía", icon: "⌁", color: "var(--instinct-autonomia)", family: "Yo",
    definition: "Sentir que lo que haces viene de ti — no de presión externa, expectativa ajena, o miedo a las consecuencias. Es la diferencia entre elegir y obedecer, aunque la acción sea la misma.",
    ingredients: ["Al menos un espacio donde el criterio es completamente tuyo", "Capacidad real de decir que no sin que todo se derrumbe", "Tiempo que no tiene que producir nada ni justificarse", "Algo importante que haces porque quieres, no porque debes"],
    works: "Puedes señalar partes de tu vida donde nadie define el qué ni el cómo excepto tú. Esa sensación de autoría está presente aunque no domines todas las decisiones.",
    fails: "Sientes que estás ejecutando la vida de alguien más — la empresa, la familia, las expectativas sociales — aunque nadie te obligue explícitamente. Los proyectos paralelos secretos son una señal.",
    ingredientsShort: "Un espacio donde el criterio es completamente tuyo · Capacidad real de decir que no · Tiempo que no tiene que producir nada",
    question: "¿Hay algo importante que hagas exactamente como crees que debe hacerse?"
  },
  {
    id: "pertenencia", name: "Pertenencia", icon: "♧", color: "var(--instinct-pertenencia)", family: "Relación",
    definition: "Sentir que formas parte de un grupo donde tu presencia importa. Una comunidad puede satisfacer esta necesidad cuando existe un propósito o interés compartido y una regularidad que la sostenga.",
    ingredients: ["Propósito o interés compartido que une al grupo alrededor de algo", "Encuentro regular — sin ritmo, el grupo se disuelve", "Un rol reconocible dentro del grupo", "Reciprocidad real — todos aportan, nadie es solo receptor"],
    works: "El equipo de triatlón, el curso de cuero los sábados, el grupo de estudio. Hay algo que los une y una razón para seguir apareciendo.",
    fails: "Tienes grupos de chat que nunca se ven, conexiones de redes sociales que nunca profundizan, o compañeros de trabajo con quienes compartes espacio pero no propósito real.",
    ingredientsShort: "Regularidad de encuentro · Propósito o interés compartido · Reciprocidad real · Rol reconocido en el grupo",
    question: "¿Hay un grupo donde tu ausencia se note y tu presencia importe?"
  },
  {
    id: "vinculo", name: "Vínculo", icon: "↗", color: "var(--instinct-vinculo)", family: "Relación",
    definition: "Ser elegido y conocido por alguien más allá de un contexto o función. Un vínculo sobrevive al cambio de trabajo, de ciudad, de etapa de vida — no depende de que sigan compartiendo algo.",
    ingredients: ["Historia compartida que da profundidad sin necesidad de explicar", "Aceptación que no depende del desempeño", "Contacto que no requiere una razón — llamar porque sí", "Reparación cuando hay conflicto, antes de que se acumule distancia"],
    works: "Hay personas que te buscan a ti, no solo responden cuando apareces. Y tú sabes que estarían si los necesitaras.",
    fails: "Tienes muchos conocidos y pocos que te conozcan. El contacto es principalmente reactivo o de ocasiones especiales.",
    ingredientsShort: "Presencia sostenida · Confianza construida en el tiempo · Cuidado y reciprocidad entre dos personas",
    question: "¿Qué vínculo estás cuidando de manera consciente y sostenida?"
  },
  {
    id: "intimidad", name: "Intimidad", icon: "♡", color: "var(--instinct-intimidad)", family: "Relación",
    definition: "Ser conocido completamente por al menos una persona. No aprobado — conocido. Incluye lo que no está resuelto, lo que da miedo, lo que avergüenza.",
    ingredients: ["Vulnerabilidad sin agenda — mostrar lo que no está resuelto", "Tiempo sin propósito productivo con esa persona", "Que el otro reciba sin intentar resolver", "Reciprocidad — los dos se muestran, no solo uno"],
    works: "Hay al menos una persona que sabe cómo estás realmente hoy, sin que tú se lo hayas contado en un mensaje.",
    fails: "Las conversaciones más profundas las tienes con personas fuera de tu relación principal, o con una IA, o contigo mismo. La coexistencia funciona pero la conexión real aparece esporádicamente.",
    ingredientsShort: "Vulnerabilidad sin agenda · Tiempo sin propósito productivo · El otro recibe sin intentar resolver",
    question: "¿Cuándo tuviste por última vez una conversación sin saber a dónde iba a llegar?"
  },
  {
    id: "provision", name: "Provisión", icon: "⬡", color: "var(--instinct-provision)", family: "Base material",
    definition: "La certeza de que hay suficiente para continuar. No es una cifra — es una sensación de estabilidad que permite pensar en otras cosas.",
    ingredients: ["Un umbral de ‘suficiente’ que tú mismo has definido", "Previsibilidad de ingresos, más que cantidad absoluta", "Reservas visibles — saber que existe un colchón", "Decisiones financieras que respondan a tus valores, no al miedo"],
    works: "El dinero es una herramienta que administras. No una preocupación que te administra a ti.",
    fails: "Los números pueden estar bien pero la ansiedad financiera no desaparece — o el consumo sube exactamente cuando hay incertidumbre en otro dominio de tu vida.",
    ingredientsShort: "Reservas visibles · Previsibilidad de ingresos · Un umbral de suficiente definido",
    question: "¿Tu nivel actual de reservas te da tranquilidad o genera más ansiedad?"
  },
  {
    id: "vitalidad", name: "Vitalidad", icon: "⌇", color: "var(--instinct-vitalidad)", family: "Base física",
    definition: "La energía corporal que sostiene todo lo demás. Sin ella, los otros instintos funcionan en modo de emergencia.",
    ingredients: ["Sueño consistente y suficiente", "Movimiento regular — no necesariamente intenso", "Alimentación que sostiene, no que compensa", "Recuperación después del esfuerzo"],
    works: "Tienes energía para lo que importa al final del día, no solo para lo urgente de la mañana.",
    fails: "Cumples con todo pero llegas al final del día sin nada — el cuerpo está presente pero tú no.",
    ingredientsShort: "Energía física disponible · Sueño reparador · Movimiento y nutrición que sostienen",
    question: "¿Tu cuerpo tiene hoy la energía necesaria para sostener la vida que quieres vivir?"
  }
];

const repeatableAreaTypes = ["Trabajo / Oficio", "Estudio", "Hobby", "Comunidad", "Voluntariado", "Apoyo Profesional"];
const initialAreaTypes = ["Personal", "Familia", "Pareja", "Amigos Cercanos", "Trabajo / Oficio", "Estudio", "Hobby", "Comunidad", "Voluntariado", "Apoyo Profesional"];
const guidance = {
  Personal: "Este es el único espacio donde tú eres simultáneamente la fuente y el destino. (Vitalidad) El ejercicio, el sueño y la alimentación que sostienes por tu propio criterio construyen la base física desde la que todo lo demás opera. (Autonomía) El tiempo sin agenda — leer lo que nadie te recomendó, explorar sin destino, crear sin audiencia — es donde la sensación de que tu vida viene de ti se recupera. (Competente) Aprender algo por curiosidad propia, dominar una habilidad sin que nadie te lo pida, construir algo que solo existe porque tú quisiste que existiera.",
  Pareja: "(Vínculo) Ser elegido todos los días por alguien que te conoce bien es una forma de pertenencia que ningún otro vínculo replica exactamente. (Intimidad) La vulnerabilidad compartida — mostrar lo que no está resuelto y que el otro lo reciba sin intentar resolverlo — es lo que convierte la convivencia en conexión real.",
  "Amigos Cercanos": "(Vínculo) Los amigos de toda la vida tienen historia compartida que no necesita explicación. (Intimidad) Con algunos puede existir también el espacio para mostrar lo que no está resuelto.",
  Familia: "(Vínculo) Los vínculos familiares pueden ofrecer aceptación que no depende del desempeño — estar presente es suficiente para pertenecer. (Pertenencia) Los rituales compartidos crean el ritmo que sostiene la sensación de pertenecer a algo más grande que uno mismo. (Construir) Sostener una familia, acompañar el crecimiento de un hijo, mantener vivos los vínculos en momentos difíciles — para muchas personas este es el proyecto más concreto y de mayor impacto que tienen entre manos.",
  "Trabajo / Oficio": "(Provisión) La estabilidad económica es la base más visible. (Competente) Los problemas reales y resultados visibles activan la sensación de capacidad. (Pertenencia) Un equipo con propósito compartido puede ser una fuente real de pertenencia.",
  Comunidad: "(Pertenencia) Un grupo con propósito compartido y encuentro regular ofrece el sentido de pertenecer a algo más grande. (Competente — Competir) Un estándar de práctica u objetivo medible puede alimentar ambos instintos.",
  Hobby: "(Autonomía) Tú defines cómo hacerlo y su criterio de éxito. (Competente — Construir) Puede producir algo tangible. (Competente — Competir) También puede incluir un cronómetro, ranking o torneo.",
  Estudio: "(Competente — Construir) Dominar una habilidad hace visible el progreso. (Autonomía) Cuando nace de curiosidad propia, el desarrollo viene de ti.",
  Oficio: "(Competente — Construir) Dominar una habilidad hace visible el progreso. (Autonomía) Cuando nace de curiosidad propia, el desarrollo viene de ti.",
  "Apoyo Profesional": "(Intimidad) Un psicólogo o coach ofrece vulnerabilidad sin consecuencias relacionales. (Autonomía) Un buen proceso ayuda a que la decisión venga genuinamente de ti.",
  Voluntariado: "(Trascendencia) Contribuir sin retribución hace visible el efecto en otros. (Pertenencia) Suele existir una comunidad regular. (Autonomía) Al elegirse libremente, expresa tus propios valores."
};

const state = {
  areas: initialAreaTypes.map(type => ({ id: crypto.randomUUID(), type, name: type, fixed: !repeatableAreaTypes.includes(type), active: true, instincts: [], note: "" })),
  selection: null,
  expandedInstinct: null
};
state.selection = { kind: "area", id: state.areas[0].id };

const qs = selector => document.querySelector(selector);
const diagnostic = qs(".diagnostic");
const flowMap = qs("#flow-map");
const areasColumn = qs("#areas-column");
const instinctsColumn = qs("#instincts-column");
const ribbons = qs("#ribbons");
const inspector = qs("#inspector");
const inspectorContent = qs("#inspector-content");
const noteSection = qs("#personal-note");
const noteInput = qs("#note-input");

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function render() {
  renderColumns();
  renderInspector();
  requestAnimationFrame(drawRibbons);
}

function renderColumns() {
  areasColumn.innerHTML = state.areas.map(area => `
    <div class="area-node">
      ${area.fixed ? '<span class="area-control-placeholder"></span>' : `<button class="area-remove" type="button" data-delete-area="${area.id}" aria-label="Eliminar ${escapeHtml(area.name)}"><span>−</span></button>`}
      <button class="flow-chip area-chip ${area.active ? "" : "paused"} ${state.selection?.kind === "area" && state.selection.id === area.id ? "selected" : ""}"
        type="button" data-area-id="${area.id}" title="${escapeHtml(area.type)}">${escapeHtml(area.name)}</button>
    </div>`).join("") +
    `<button class="flow-chip add-area-chip" type="button" data-add-area aria-label="Crear otra área" title="Crear otra área">+</button>`;
  const byId = id => instincts.find(instinct => instinct.id === id);
  instinctsColumn.innerHTML = `
    ${instinctNode(byId("trascendencia"))}
    <section class="instinct-group"><h3>Competente</h3>${["construir", "competir"].map(id => instinctNode(byId(id))).join("")}</section>
    ${instinctNode(byId("autonomia"))}
    <section class="instinct-group"><h3>Relación</h3>${["pertenencia", "vinculo", "intimidad"].map(id => instinctNode(byId(id))).join("")}</section>
    ${instinctNode(byId("provision"))}
    ${instinctNode(byId("vitalidad"))}`;
  areasColumn.querySelectorAll("[data-area-id]").forEach(button => button.addEventListener("click", () => selectArea(button.dataset.areaId)));
  areasColumn.querySelectorAll("[data-delete-area]").forEach(button => button.addEventListener("click", () => removeArea(button.dataset.deleteArea)));
  areasColumn.querySelector("[data-add-area]").addEventListener("click", () => { qs("#area-name").value = ""; dialog.showModal(); });
  instinctsColumn.querySelectorAll("[data-select-instinct]").forEach(button => button.addEventListener("click", () => selectInstinct(button.dataset.selectInstinct)));
  instinctsColumn.querySelectorAll("[data-connect-instinct]").forEach(button => button.addEventListener("click", () => toggleConnection(button.dataset.connectInstinct)));
}

function instinctNode(instinct) {
  const selectedArea = state.selection?.kind === "area" ? state.areas.find(area => area.id === state.selection.id) : null;
  const connected = selectedArea?.instincts.includes(instinct.id);
  return `<div class="instinct-node" data-instinct-id="${instinct.id}" style="--instinct:${instinct.color}">
    ${selectedArea ? `<button class="map-connection ${connected ? "connected" : ""}" type="button" data-connect-instinct="${instinct.id}" aria-label="${connected ? "Quitar" : "Crear"} conexión con ${instinct.name}"><span>${connected ? "−" : "+"}</span></button>` : '<span class="connection-placeholder"></span>'}
    <button class="flow-chip instinct-chip ${state.selection?.kind === "instinct" && state.selection.id === instinct.id ? "selected" : ""}" type="button" data-select-instinct="${instinct.id}">
      <span class="instinct-icon" aria-hidden="true">${instinct.icon}</span><span>${instinct.name}</span>
    </button>
  </div>`;
}

function toggleConnection(instinctId) {
  if (state.selection?.kind !== "area") return;
  const area = state.areas.find(item => item.id === state.selection.id);
  if (!area) return;
  area.instincts = area.instincts.includes(instinctId) ? area.instincts.filter(id => id !== instinctId) : [...area.instincts, instinctId];
  render();
}

function removeArea(areaId) {
  const area = state.areas.find(item => item.id === areaId);
  if (!area || area.fixed) return;
  state.areas = state.areas.filter(item => item.id !== areaId);
  if (state.selection?.kind === "area" && state.selection.id === areaId) {
    state.selection = { kind: "area", id: state.areas[0].id };
  }
  render();
}

function selectArea(id) {
  state.selection = { kind: "area", id };
  state.expandedInstinct = null;
  render();
}

function selectInstinct(id) {
  state.selection = { kind: "instinct", id };
  render();
}

function renderInspector() {
  if (!state.selection) {
    inspector.hidden = true;
    diagnostic.classList.remove("has-inspector");
    noteSection.hidden = true;
    return;
  }
  inspector.hidden = false;
  diagnostic.classList.add("has-inspector");
  if (state.selection.kind === "area") renderAreaInspector(state.areas.find(area => area.id === state.selection.id));
  else renderInstinctInspector(instincts.find(instinct => instinct.id === state.selection.id));
}

function renderAreaInspector(area) {
  if (!area) return closeInspector();
  inspector.style.setProperty("--accent", SECTION);
  const orientation = guidance[area.type] ?? "Describe qué lugar ocupa esta área en tu vida y revisa qué instintos satisface realmente hoy.";
  const suggestions = parseGuidance(orientation);
  inspectorContent.innerHTML = `
    <p class="connection-heading">Orientación y ejemplos</p>
    <p class="orientation-disclaimer">Estas conexiones muestran lo que esta área satisface típicamente, pero tu experiencia puede ser completamente diferente.</p>
    <div class="orientation-examples">${suggestions.length
      ? suggestions.map(({ instinct, text }) => `<section class="orientation-example"><h3>${escapeHtml(instinct)}</h3><p>${escapeHtml(text)}</p></section>`).join("")
      : `<p class="empty-connections">${escapeHtml(orientation)}</p>`}</div>
    `;
  noteSection.hidden = false;
  qs("#note-title").textContent = area.name;
  noteInput.value = area.note;
  qs("#area-guidance").innerHTML = area.instincts.length
    ? area.instincts.map(id => {
      const instinct = instincts.find(item => item.id === id);
      return `<li style="--instinct:${instinct.color}"><strong><span aria-hidden="true">${instinct.icon}</span> ${instinct.name}</strong><span>${escapeHtml(instinct.definition)}</span></li>`;
    }).join("")
    : '<li><span>Aún no has conectado esta área con ningún instinto. Usa los botones + del mapa para definir sus conexiones.</span></li>';
}

function parseGuidance(orientation) {
  return [...orientation.matchAll(/\(([^)]+)\)\s*([\s\S]*?)(?=\s*\([^)]+\)|$)/g)]
    .map(([, instinct, text]) => ({ instinct, text: text.trim() }));
}

function renderInstinctInspector(instinct) {
  if (!instinct) return closeInspector();
  noteSection.hidden = true;
  inspector.style.setProperty("--accent", instinct.color);
  inspectorContent.innerHTML = `
    <h2 class="inspector-title"><span aria-hidden="true">${instinct.icon}</span>${instinct.name}</h2>
    <p class="inspector-family">${instinct.family}</p>
    ${section("Qué es", instinct.definition)}
    ${instinct.ingredients?.length ? listSection("Ingredientes", instinct.ingredients) : ""}
    ${instinct.works ? section("Cuando funciona bien", instinct.works) : ""}
    ${instinct.fails ? section("Cuando falla", instinct.fails) : ""}
    ${(instinct.routes ?? []).map(route => `<div class="route"><h3>Ruta ${route.name}</h3>${section("Qué activa este instinto", route.activation)}${listSection("Ingredientes", route.ingredients)}${section("Cuando funciona bien", route.works)}${section("Cuando falla", route.fails)}</div>`).join("")}`;
}

function section(title, text) { return `<section class="inspector-section"><h3>${title}</h3><p>${escapeHtml(text)}</p></section>`; }
function listSection(title, items) { return `<section class="inspector-section"><h3>${title}</h3><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`; }

function closeInspector() {
  state.selection = null;
  state.expandedInstinct = null;
  render();
}

function drawRibbons() {
  const mapRect = flowMap.getBoundingClientRect();
  if (!mapRect.width || !mapRect.height) return;
  ribbons.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);
  ribbons.innerHTML = "";
  const activeAreas = state.areas.filter(area => area.active);
  const arrivals = Object.fromEntries(instincts.map(instinct => [instinct.id, activeAreas.filter(area => area.instincts.includes(instinct.id))]));
  state.areas.filter(area => area.active).forEach(area => {
    const origin = areasColumn.querySelector(`[data-area-id="${area.id}"]`).getBoundingClientRect();
    const related = instincts.filter(instinct => area.instincts.includes(instinct.id));
    const sourceTotal = origin.height * .68;
    const sourceBand = sourceTotal / Math.max(related.length, 1);
    related.forEach((instinct, index) => {
      const destination = instinctsColumn.querySelector(`[data-instinct-id="${instinct.id}"] .instinct-chip`).getBoundingClientRect();
      const connected = arrivals[instinct.id];
      const arrivalIndex = connected.findIndex(item => item.id === area.id);
      const destinationTotal = destination.height * .68;
      const destinationBand = destinationTotal / Math.max(connected.length, 1);
      const x1 = origin.right - mapRect.left + 1;
      const x2 = destination.left - mapRect.left - 1;
      const y1 = origin.top - mapRect.top + (origin.height - sourceTotal) / 2 + index * sourceBand;
      const y2 = destination.top - mapRect.top + (destination.height - destinationTotal) / 2 + arrivalIndex * destinationBand;
      const c1 = x1 + (x2 - x1) * .42;
      const c2 = x1 + (x2 - x1) * .58;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} C ${c1} ${y1}, ${c2} ${y2}, ${x2} ${y2} L ${x2} ${y2 + destinationBand} C ${c2} ${y2 + destinationBand}, ${c1} ${y1 + sourceBand}, ${x1} ${y1 + sourceBand} Z`);
      const isSelectedArea = state.selection?.kind === "area" && state.selection.id === area.id;
      path.setAttribute("fill", isSelectedArea ? instinct.color : `color-mix(in srgb, ${instinct.color} 24%, var(--bg-card))`);
      path.setAttribute("opacity", "1");
      if (instinct.id === "trascendencia" && isSelectedArea) {
        path.setAttribute("stroke", "#8f6620");
        path.setAttribute("stroke-width", "1");
      }
      path.setAttribute("class", "ribbon");
      ribbons.append(path);
    });
  });
}

noteInput.addEventListener("input", () => {
  if (state.selection?.kind !== "area") return;
  const area = state.areas.find(item => item.id === state.selection.id);
  if (area) area.note = noteInput.value;
});

const dialog = qs("#area-dialog");
const typeSelect = qs("#area-type");
typeSelect.innerHTML = repeatableAreaTypes.map(type => `<option>${type}</option>`).join("");
qs("#cancel-area").addEventListener("click", () => dialog.close());
qs("#area-form").addEventListener("submit", event => {
  event.preventDefault();
  const type = typeSelect.value;
  const name = qs("#area-name").value.trim() || type;
  const area = { id: crypto.randomUUID(), type, name, fixed: false, active: true, instincts: [], note: "" };
  state.areas.push(area);
  dialog.close();
  selectArea(area.id);
});

new ResizeObserver(() => requestAnimationFrame(drawRibbons)).observe(flowMap);

qs("#diagnostic-form").querySelectorAll('input[name="life-moment"]').forEach(input => input.addEventListener("change", () => {
  const choices = [...document.querySelectorAll('input[name="life-moment"]')];
  if (input.value === "ninguno" && input.checked) choices.filter(item => item !== input).forEach(item => { item.checked = false; });
  else if (input.checked) choices.find(item => item.value === "ninguno").checked = false;
}));

function pdfSafe(value) {
  return String(value ?? "").replace(/[\\()]/g, "\\$&").replace(/[\r\n]+/g, " ");
}

function wrapPdfText(text, limit = 88) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach(word => {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= limit) line += ` ${word}`;
    else { lines.push(line); line = word; }
  });
  if (line) lines.push(line);
  return lines;
}

function encodeWinAnsi(value) {
  const special = { "€": 128, "‚": 130, "ƒ": 131, "„": 132, "…": 133, "†": 134, "‡": 135, "ˆ": 136, "‰": 137, "Š": 138, "‹": 139, "Œ": 140, "Ž": 142, "‘": 145, "’": 146, "“": 147, "”": 148, "•": 149, "–": 150, "—": 151, "˜": 152, "™": 153, "š": 154, "›": 155, "œ": 156, "ž": 158, "Ÿ": 159 };
  return Uint8Array.from([...value].map(char => special[char] ?? (char.charCodeAt(0) <= 255 ? char.charCodeAt(0) : 63)));
}

function buildPdf(lines) {
  const pages = [];
  for (let index = 0; index < lines.length; index += 46) pages.push(lines.slice(index, index + 46));
  const pageCount = Math.max(pages.length, 1);
  const objects = [];
  const add = value => { objects.push(value); return objects.length; };
  const catalogId = add("");
  const pagesId = add("");
  const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const pageIds = [];
  (pages.length ? pages : [["Diagnóstico de Áreas e Instintos"]]).forEach((pageLines, pageIndex) => {
    const commands = ["BT", "/F1 11 Tf", "14 TL", "54 790 Td"];
    pageLines.forEach((line, lineIndex) => {
      const size = lineIndex === 0 && pageIndex === 0 ? 18 : 11;
      commands.push(`/${"F1"} ${size} Tf (${pdfSafe(line)}) Tj`, "T*");
    });
    commands.push("ET");
    const stream = commands.join("\n");
    const contentId = add(`<< /Length ${encodeWinAnsi(stream).length} >>\nstream\n${stream}\nendstream`);
    pageIds.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`));
  });
  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageCount} >>`;
  const chunks = [encodeWinAnsi("%PDF-1.4\n%âãÏÓ\n")];
  const offsets = [0];
  let offset = chunks[0].length;
  objects.forEach((object, index) => {
    offsets.push(offset);
    const bytes = encodeWinAnsi(`${index + 1} 0 obj\n${object}\nendobj\n`);
    chunks.push(bytes); offset += bytes.length;
  });
  const xref = [`xref\n0 ${objects.length + 1}\n`, "0000000000 65535 f \n", ...offsets.slice(1).map(value => `${String(value).padStart(10, "0")} 00000 n \n`), `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${offset}\n%%EOF`].join("");
  chunks.push(encodeWinAnsi(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

function downloadDiagnosisPdf() {
  const connected = new Set(state.areas.filter(area => area.active).flatMap(area => area.instincts));
  const lines = ["Diagnóstico de Áreas e Instintos", `Generado el ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date())}`, "", "MAPA DE CONEXIONES", ""];
  state.areas.forEach(area => {
    const status = area.active ? "Activa" : "En pausa";
    lines.push(...wrapPdfText(`${area.name} · ${area.type} · ${status}`));
    const names = area.instincts.map(id => instincts.find(item => item.id === id)?.name).filter(Boolean);
    lines.push(...wrapPdfText(`Instintos: ${names.length ? names.join(", ") : "Sin conexiones"}`));
    if (area.note.trim()) lines.push(...wrapPdfText(`Nota personal: ${area.note.trim()}`));
    lines.push("");
  });
  const gaps = instincts.filter(item => !connected.has(item.id)).map(item => item.name);
  lines.push("HUECOS REALES", ...wrapPdfText(gaps.length ? gaps.join(", ") : "Todos los instintos tienen al menos una conexión."), "", "LECTURA", ...wrapPdfText("Este mapa es una fotografía del momento actual. Las líneas muestran qué áreas alimentan cada necesidad; los huecos ayudan a decidir dónde explorar, no son una calificación personal."));
  const url = URL.createObjectURL(buildPdf(lines));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `diagnostico-areas-instintos-${new Date().toISOString().slice(0, 10)}.pdf`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

qs("#diagnostic-form").addEventListener("submit", async event => {
  event.preventDefault();
  const status = qs("#form-status");
  const submit = event.currentTarget.querySelector("button[type=submit]");
  const activeAreas = state.areas.filter(area => area.active);
  const payload = {
    schemaVersion: 3,
    ageRange: qs("#age-range").value || null,
    gender: qs("#gender").value || null,
    lifeMoments: [...document.querySelectorAll('input[name="life-moment"]:checked')].map(input => input.value),
    countryOrRegion: qs("#region").value.trim() || null,
    rediagnosis: document.querySelector('input[name="rediagnosis"]:checked')?.value === undefined ? null : document.querySelector('input[name="rediagnosis"]:checked').value === "true",
    areas: activeAreas.map(area => ({ type: area.type, instinctIds: [...area.instincts].sort() })),
    unsupportedInstinctIds: instincts.filter(instinct => !activeAreas.some(area => area.instincts.includes(instinct.id))).map(instinct => instinct.id),
    turnstileToken: null
  };
  submit.disabled = true;
  status.textContent = "Preparando tu PDF y compartiendo las conexiones anónimas…";
  try {
    const response = await fetch(`${API_BASE}/api/v1/diagnostics`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    status.textContent = "PDF descargado. Gracias por compartir el mapa de forma anónima.";
  } catch {
    status.textContent = "PDF descargado. No fue posible compartir los datos anónimos esta vez.";
  } finally {
    downloadDiagnosisPdf();
    submit.disabled = false;
  }
});

render();
