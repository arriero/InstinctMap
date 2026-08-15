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
const protectedAreaTypes = new Set(["Personal", "Familia"]);
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

const instinctPrompt = {
  vitalidad: "Contar con energía corporal, descanso y recuperación para sostener tu vida. Es la base física desde la que todo lo demás opera: sin ella, hasta las áreas que sí están funcionando bien terminan costando más de lo que deberían.",
  autonomia: "Sentir que eliges y que tus decisiones vienen genuinamente de ti, no de una exigencia externa que solo estás cumpliendo. Se nota más en el tiempo sin agenda: lo que haces sin que nadie te lo pida ni te lo recomiende.",
  construir: "Sentirte capaz porque algo cambió o existe gracias a lo que hiciste. El progreso es acumulativo: lo que sabes o puedes hacer hoy, y no podías hace seis meses, es evidencia tangible de que algo en ti se transformó.",
  trascendencia: "Sentir que lo que haces importa más allá de ti y tiene un para qué. Se reconoce en lo que aportas sin necesitar que lleve tu nombre: lo que va a seguir sirviendo cuando tú ya no estés para verlo.",
  competir: "Medirte frente a un estándar, un marcador o un resultado externo —un cronómetro, un ranking, un objetivo con número. No se trata necesariamente de ganarle a alguien, sino de tener una forma clara de saber si lo lograste.",
  intimidad: "Poder mostrar lo no resuelto —lo que todavía te cuesta, lo que preferirías que nadie viera— y que el otro lo reciba sin intentar arreglarlo ni usarlo en tu contra. Es la vulnerabilidad compartida, no la cantidad de tiempo juntos, lo que convierte la cercanía en algo real.",
  vinculo: "Ser elegido y conocido por alguien más allá de un contexto o función —no como el compañero de trabajo o el vecino, sino como tú. Es lo que sostienen las personas que saben quién eras antes de quien eres ahora.",
  pertenencia: "Formar parte de un grupo donde tu presencia importa y tu ausencia se nota. No basta con asistir una vez: son los rituales que se repiten, la razón para seguir apareciendo, lo que sostiene el sentido de pertenecer a algo más grande que tú.",
  provision: "Tener estabilidad material y la certeza de que hay suficiente para continuar. Es la base más visible de todas, la que se nota primero cuando falta —pero por sí sola no sostiene el resto: solo te da el terreno desde donde ocuparte de lo demás."
};

const impactProfiles = {
  Personal: { typical: ["vitalidad", "autonomia", "construir"], possible: ["trascendencia", "competir", "intimidad", "vinculo", "pertenencia", "provision"] },
  Familia: { typical: ["vinculo", "pertenencia", "construir"], possible: ["intimidad", "provision", "vitalidad", "trascendencia", "autonomia", "competir"] },
  Pareja: { typical: ["vinculo", "intimidad"], possible: ["pertenencia", "construir", "provision", "vitalidad", "autonomia", "trascendencia", "competir"] },
  "Amigos Cercanos": { typical: ["vinculo", "intimidad"], possible: ["pertenencia", "vitalidad", "autonomia", "trascendencia", "construir", "competir", "provision"] },
  "Trabajo / Oficio": { typical: ["provision", "construir", "pertenencia"], possible: ["competir", "autonomia", "trascendencia", "vinculo", "vitalidad", "intimidad"] },
  Estudio: { typical: ["construir", "autonomia"], possible: ["competir", "pertenencia", "trascendencia", "provision", "vinculo", "vitalidad", "intimidad"] },
  Hobby: { typical: ["autonomia", "construir", "vitalidad"], possible: ["competir", "pertenencia", "vinculo", "trascendencia", "intimidad", "provision"] },
  Comunidad: { typical: ["pertenencia", "vinculo"], possible: ["competir", "construir", "trascendencia", "intimidad", "autonomia", "vitalidad", "provision"] },
  Voluntariado: { typical: ["trascendencia", "pertenencia"], possible: ["autonomia", "vinculo", "construir", "intimidad", "vitalidad", "competir", "provision"] },
  "Apoyo Profesional": { typical: ["intimidad", "autonomia"], possible: ["vinculo", "vitalidad", "construir", "trascendencia", "pertenencia", "provision", "competir"] },
  Otra: { typical: [], possible: instincts.map(item => item.id) }
};

const state = {
  areas: initialAreaTypes.map(type => ({ id: crypto.randomUUID(), type, name: type, fixed: protectedAreaTypes.has(type), active: true, instincts: [], note: "" })),
  selection: null,
  expandedInstinct: null,
  changedAreaType: null,
  changedAreaName: "",
  impactedInstincts: [],
  reflection: ""
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
const changedAreaOptions = qs("#changed-area-options");
const otherAreaField = qs("#other-area-field");
const changedAreaName = qs("#changed-area-name");
const impactPicker = qs("#impact-picker");
const exampleSection = qs(".example-section");
qs('[data-accordion-section="2"] .accordion-content').append(exampleSection);
const accordionSections = [...document.querySelectorAll("[data-accordion-section]")];

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function isInstinctSupported(instinctId, areas = state.areas.filter(area => area.active)) {
  if (instinctId === "construir" || instinctId === "competir") {
    return areas.some(area => area.instincts.includes("construir") || area.instincts.includes("competir"));
  }
  return areas.some(area => area.instincts.includes(instinctId));
}

function render() {
  renderChangeStep();
  renderColumns();
  renderInspector();
  renderAccordionSummaries();
  requestAnimationFrame(drawRibbons);
}

function openAccordionSection(sectionNumber, { focus = false } = {}) {
  const active = accordionSections.find(section => section.dataset.accordionSection === String(sectionNumber));
  if (!active) return;
  active.classList.add("is-open");
  const header = active.querySelector(".accordion-header");
  const content = active.querySelector(":scope > .accordion-content");
  header.setAttribute("aria-expanded", "true");
  header.querySelector(".accordion-indicator").textContent = "✓";
  content.hidden = false;
  if (focus) active?.querySelector(".accordion-header")?.focus({ preventScroll: true });
  if (String(sectionNumber) === "3") requestAnimationFrame(drawRibbons);
}

accordionSections.forEach(section => {
  section.querySelector(".accordion-header").addEventListener("click", () => {
    openAccordionSection(section.dataset.accordionSection);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function renderAccordionSummaries() {
  const changedSummary = qs('[data-summary="1"]');
  const impactSummary = qs('[data-summary="2"]');
  const mapSummary = qs('[data-summary="3"]');
  const noteSummary = qs('[data-summary="4"]');
  if (changedSummary) changedSummary.textContent = state.changedAreaType
    ? (state.changedAreaType === "Otra" ? state.changedAreaName.trim() || "Otra área" : state.changedAreaType)
    : "Sin responder";
  if (impactSummary) {
    const names = state.impactedInstincts.map(id => instincts.find(item => item.id === id)?.name).filter(Boolean);
    impactSummary.textContent = names.length ? names.join(", ") : "Sin responder";
  }
  if (mapSummary) {
    const activeAreas = state.areas.filter(area => area.active);
    const connections = activeAreas.reduce((total, area) => total + area.instincts.length, 0);
    mapSummary.textContent = `${activeAreas.length} áreas activas · ${connections} conexiones`;
  }
  if (noteSummary) noteSummary.textContent = state.reflection.trim() ? "Reflexión registrada" : "Tu reflexión";
}

function renderChangeStep() {
  const choices = [...initialAreaTypes.filter(type => !protectedAreaTypes.has(type)), "Otra"];
  changedAreaOptions.innerHTML = choices.map(type => `<button class="changed-area-card ${state.changedAreaType === type ? "selected" : ""}" type="button" role="radio" aria-checked="${state.changedAreaType === type}" data-changed-area="${escapeHtml(type)}">${escapeHtml(type)}</button>`).join("");
  changedAreaOptions.querySelectorAll("[data-changed-area]").forEach(button => button.addEventListener("click", () => selectChangedArea(button.dataset.changedArea)));
  otherAreaField.hidden = state.changedAreaType !== "Otra";
  impactPicker.hidden = !state.changedAreaType;
  if (!state.changedAreaType) return;
  const profile = impactProfiles[state.changedAreaType] ?? impactProfiles.Otra;
  renderImpactGroup(qs("#typical-instincts"), "Conexiones típicas de esta área", "Lo que esta área suele alimentar en la mayoría de las personas.", profile.typical);
  renderImpactGroup(qs("#possible-instincts"), "Menos frecuentes, pero posibles", "Menos comunes, pero reales para mucha gente. Vale la pena leerlas antes de descartarlas.", profile.possible);
}

function renderImpactGroup(container, title, subtitle, ids) {
  container.hidden = ids.length === 0;
  container.innerHTML = ids.length ? `<div class="impact-group-heading"><h4>${title}</h4><p>${subtitle}</p></div>${ids.map(id => impactOption(instincts.find(item => item.id === id))).join("")}` : "";
  container.querySelectorAll("[data-impact-instinct]").forEach(button => button.addEventListener("click", () => toggleImpactedInstinct(button.dataset.impactInstinct)));
}

function impactOption(instinct) {
  const checked = state.impactedInstincts.includes(instinct.id);
  return `<button class="impact-option ${checked ? "checked" : ""}" style="--instinct:${instinct.color}" type="button" role="checkbox" aria-checked="${checked}" data-impact-instinct="${instinct.id}"><span class="impact-check" aria-hidden="true">${checked ? "✓" : ""}</span><span><strong>${instinct.name}</strong><small>${escapeHtml(instinctPrompt[instinct.id])}</small></span></button>`;
}

function selectChangedArea(type) {
  state.changedAreaType = type;
  state.impactedInstincts = [];
  state.changedAreaName = type === "Otra" ? "" : type;
  changedAreaName.value = state.changedAreaName;
  syncImpactedArea();
  render();
  requestAnimationFrame(() => {
    openAccordionSection(2);
    document.querySelector('[data-accordion-section="2"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function toggleImpactedInstinct(id) {
  state.impactedInstincts = state.impactedInstincts.includes(id) ? state.impactedInstincts.filter(item => item !== id) : [...state.impactedInstincts, id];
  syncImpactedArea();
  render();
  if (state.impactedInstincts.length) openAccordionSection(3);
}

function syncImpactedArea() {
  state.areas.forEach(area => {
    if (area.impacted && !area.isChangedCustom) area.active = true;
    area.impacted = false;
    area.lostInstincts = [];
  });
  if (!state.changedAreaType) return;
  let area;
  if (state.changedAreaType === "Otra") {
    area = state.areas.find(item => item.isChangedCustom);
    if (!area) {
      area = { id: crypto.randomUUID(), type: "Otra", name: state.changedAreaName || "Otra área", fixed: true, active: false, instincts: [], note: "", isChangedCustom: true };
      state.areas.unshift(area);
    }
    area.name = state.changedAreaName.trim() || "Otra área";
  } else {
    state.areas = state.areas.filter(item => !item.isChangedCustom);
    area = state.areas.find(item => item.type === state.changedAreaType);
    if (!area) {
      area = { id: crypto.randomUUID(), type: state.changedAreaType, name: state.changedAreaType, fixed: false, active: false, instincts: [], note: "" };
      state.areas.unshift(area);
    }
  }
  if (!area) return;
  area.impacted = true;
  area.active = false;
  area.lostInstincts = [...state.impactedInstincts];
  if (state.selection?.kind === "area" && state.selection.id === area.id) {
    const next = state.areas.find(item => item.active);
    state.selection = next ? { kind: "area", id: next.id } : null;
  }
}

function renderColumns() {
  areasColumn.innerHTML = state.areas.map(area => `
    <div class="area-node ${area.impacted ? "impacted" : ""}">
      ${area.impacted || area.fixed ? '<span class="area-control-placeholder"></span>' : `<button class="area-remove" type="button" data-delete-area="${area.id}" aria-label="Eliminar ${escapeHtml(area.name)}"><span>−</span></button>`}
      <button class="flow-chip area-chip ${area.impacted ? "changed" : ""} ${area.active ? "" : "paused"} ${state.selection?.kind === "area" && state.selection.id === area.id ? "selected" : ""}"
        type="button" ${area.impacted ? "disabled" : `data-area-id="${area.id}"`} title="${area.impacted ? "Área que cambió" : escapeHtml(area.type)}">${escapeHtml(area.name)}</button>
    </div>`).join("") +
    `<button class="flow-chip add-area-chip" type="button" data-add-area aria-label="Crear otra área" title="Crear otra área">+</button>`;
  const byId = id => instincts.find(instinct => instinct.id === id);
  instinctsColumn.innerHTML = ["trascendencia", "construir", "competir", "autonomia", "pertenencia", "vinculo", "intimidad", "provision", "vitalidad"]
    .map(id => instinctNode(byId(id))).join("");
  areasColumn.querySelectorAll("[data-area-id]").forEach(button => button.addEventListener("click", () => selectArea(button.dataset.areaId)));
  areasColumn.querySelectorAll("[data-delete-area]").forEach(button => button.addEventListener("click", () => removeArea(button.dataset.deleteArea)));
  areasColumn.querySelector("[data-add-area]").addEventListener("click", () => { qs("#area-name").value = ""; dialog.showModal(); });
  instinctsColumn.querySelectorAll("[data-select-instinct]").forEach(button => button.addEventListener("click", () => selectInstinct(button.dataset.selectInstinct)));
  instinctsColumn.querySelectorAll("[data-connect-instinct]").forEach(button => button.addEventListener("click", () => toggleConnection(button.dataset.connectInstinct)));
}

function instinctNode(instinct) {
  const selectedArea = state.selection?.kind === "area" ? state.areas.find(area => area.id === state.selection.id) : null;
  const connected = selectedArea?.instincts.includes(instinct.id);
  const supported = isInstinctSupported(instinct.id);
  const lostOnly = state.impactedInstincts.includes(instinct.id) && !supported;
  return `<div class="instinct-node ${supported ? "supported" : "unsupported"} ${lostOnly ? "open-gap" : ""}" data-instinct-id="${instinct.id}" style="--instinct:${instinct.color}">
    ${selectedArea ? `<button class="map-connection ${connected ? "connected" : ""}" type="button" data-connect-instinct="${instinct.id}" aria-label="${connected ? "Quitar" : "Crear"} conexión con ${instinct.name}"><span>${connected ? "−" : "+"}</span></button>` : '<span class="connection-placeholder"></span>'}
    <button class="flow-chip instinct-chip ${state.selection?.kind === "instinct" && state.selection.id === instinct.id ? "selected" : ""}" type="button" data-select-instinct="${instinct.id}">
      <span>${instinct.name}</span>
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
  if (!area || area.fixed || state.areas.filter(item => item.active).length <= 1) return;
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
}

function parseGuidance(orientation) {
  return [...orientation.matchAll(/\(([^)]+)\)\s*([\s\S]*?)(?=\s*\([^)]+\)|$)/g)]
    .map(([, instinct, text]) => ({ instinct, text: text.trim() }));
}

function renderInstinctInspector(instinct) {
  if (!instinct) return closeInspector();
  inspector.style.setProperty("--accent", instinct.color);
  const competenceAlternative = instinct.id === "construir" || instinct.id === "competir"
    ? `<p class="competence-alternative">Construir y Competir son dos rutas de la misma necesidad de sentirte competente. Puedes satisfacerla por cualquiera de las dos; no necesitas tener ambas activas.</p>`
    : "";
  inspectorContent.innerHTML = `
    <h2 class="inspector-title">${instinct.name}</h2>
    <p class="inspector-family">${instinct.family}</p>
    ${competenceAlternative}
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
  const impactedArea = state.areas.find(area => area.impacted);
  if (impactedArea && state.impactedInstincts.length) {
    const origin = areasColumn.querySelector(`.area-node.impacted .area-chip`)?.getBoundingClientRect();
    if (!origin) return;
    const related = instincts.filter(instinct => state.impactedInstincts.includes(instinct.id));
    const sourceTotal = origin.height * .58;
    const sourceBand = sourceTotal / Math.max(related.length, 1);
    related.forEach((instinct, index) => {
      const destination = instinctsColumn.querySelector(`[data-instinct-id="${instinct.id}"] .instinct-chip`).getBoundingClientRect();
      const x1 = origin.right - mapRect.left + 1;
      const x2 = destination.left - mapRect.left - 1;
      const y1 = origin.top - mapRect.top + (origin.height - sourceTotal) / 2 + index * sourceBand + sourceBand / 2;
      const y2 = destination.top - mapRect.top + destination.height / 2;
      const c1 = x1 + (x2 - x1) * .42;
      const c2 = x1 + (x2 - x1) * .58;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} C ${c1} ${y1}, ${c2} ${y2}, ${x2} ${y2}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#9b9a96");
      path.setAttribute("stroke-width", Math.max(2.5, sourceBand * .42));
      path.setAttribute("stroke-dasharray", "5 7");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("opacity", ".52");
      path.setAttribute("class", "ribbon lost-ribbon");
      ribbons.prepend(path);
    });
  }
}

noteInput.addEventListener("input", () => {
  state.reflection = noteInput.value;
  renderAccordionSummaries();
});
changedAreaName.addEventListener("input", () => {
  state.changedAreaName = changedAreaName.value;
  syncImpactedArea();
  renderColumns();
  requestAnimationFrame(drawRibbons);
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
  const activeAreas = state.areas.filter(area => area.active);
  const changedArea = state.areas.find(area => area.impacted);
  const lines = ["Instinct Map · Diagnóstico del cambio", `Generado el ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date())}`, ""];
  if (changedArea) {
    const impactedNames = state.impactedInstincts.map(id => instincts.find(item => item.id === id)?.name).filter(Boolean);
    lines.push("LO QUE CAMBIÓ", ...wrapPdfText(changedArea.name), ...wrapPdfText(`Necesidades que alimentaba: ${impactedNames.length ? impactedNames.join(", ") : "No se marcaron conexiones"}`), "");
  }
  lines.push("LO QUE SIGUE EN PIE", "");
  state.areas.filter(area => !area.impacted).forEach(area => {
    const status = area.active ? "Activa" : "Fuera del mapa actual";
    lines.push(...wrapPdfText(`${area.name} · ${area.type} · ${status}`));
    const names = area.instincts.map(id => instincts.find(item => item.id === id)?.name).filter(Boolean);
    lines.push(...wrapPdfText(`Instintos: ${names.length ? names.join(", ") : "Sin conexiones"}`));
    lines.push("");
  });
  const gaps = instincts.filter(item => !isInstinctSupported(item.id, activeAreas)).map(item => item.name);
  lines.push("HUECOS DESPUÉS DEL CAMBIO", ...wrapPdfText(gaps.length ? gaps.join(", ") : "Todos los instintos conservan al menos una fuente activa."), "");
  if (state.reflection.trim()) lines.push("TU REFLEXIÓN", ...wrapPdfText(state.reflection.trim()), "");
  lines.push("LECTURA", ...wrapPdfText("Las líneas grises conservan la forma de lo que cambió; las conexiones activas muestran qué sigue sosteniendo cada necesidad hoy. Los huecos son un punto de partida para la reflexión, no una calificación personal."));
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
    unsupportedInstinctIds: instincts.filter(instinct => !isInstinctSupported(instinct.id, activeAreas)).map(instinct => instinct.id),
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
