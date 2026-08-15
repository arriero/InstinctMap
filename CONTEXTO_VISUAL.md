# Contexto visual y de interacción — Instinct Map

Última actualización: 15 de agosto de 2026.

## 1. Dirección visual

La referencia principal es `https://maggieappleton.com/`: una página editorial construida con tipografía, tinta, ritmo vertical y espacio en blanco. La interfaz no debe parecer un dashboard corporativo ni un formulario compuesto por tarjetas.

Referencia secundaria para la progresión numerada: 37signals.

Principio rector: **la jerarquía vive en la tipografía, el color y el espacio; no en cajas**.

Excepciones deliberadas:

- Contenedor del ejemplo de mapa.
- Contenedor del Sankey real.
- Campo de reflexión, que necesita borde para leerse inequívocamente como área de escritura.
- Botón final de descarga.

## 2. Tipografía

No se cargan fuentes externas para preservar privacidad.

- Serif: `Baskerville`, `Iowan Old Style`, `Palatino Linotype`, `Palatino`, `Georgia`, `serif`.
- Sans: `Avenir Next`, `Avenir`, `ui-sans-serif`, sistema Apple/Windows.

Roles:

- Serif: H1, títulos de sección, nombres de áreas e instintos.
- Sans: introducciones, instrucciones, descripciones, metadatos, formularios y footer.
- H1: serif regular, grande, oscuro, sin eyebrow.
- Títulos de etapa: serif regular, acompañados por número grande y pálido.
- No usar mayúsculas sostenidas como eyebrow en la página principal.

## 3. Paleta general

Variables canónicas en `frontend/styles.css`:

```css
--bg-page: #fcfbf7;
--bg-card: #ffffff;
--border-card: #e6e3e1;
--rule: #e6e3e1;
--text-title: #353534;
--text-body: #4a4a46;
--text-meta: #73706d;
--text-number: #d3d3d1;
--accent: #5f023e;
--accent-hover: #960462;
```

El fondo es crema casi blanco. No volver a fondos café, barras oscuras ni tarjetas latte. El carmesí se reserva para selección y acciones.

## 4. Colores de instinto

```css
--instinct-trascendencia: #b8862c;
--instinct-construir-competir: #c46a3f;
--instinct-autonomia: #4f5f97;
--instinct-pertenencia: #6b6089;
--instinct-vinculo: #8a4a48;
--instinct-intimidad: #b5636b;
--instinct-provision: #3f7d6d;
--instinct-vitalidad: #5c8a54;
```

Los colores viven en texto, checkboxes y cintas, no en fondos tintados.

## 5. Progresión de etapas

- Cinco etapas numeradas 01–05.
- 01 está abierta al cargar.
- Las demás empiezan cerradas.
- Al avanzar, la siguiente se abre y las anteriores permanecen abiertas.
- Una etapa abierta muestra `✓` en carmesí; una pendiente muestra `+` gris.
- Los encabezados son botones semánticos pero visualmente son texto libre: sin borde, fondo, sombra o rectángulo.
- Las etapas no tienen contornos. Se separan con aire vertical.
- El resumen pequeño bajo cada título conserva la elección o el estado.

## 6. Paso 01 — áreas que cambiaron

- Palabras sueltas en grilla, sin pills ni tarjetas.
- Serif de aproximadamente 17–19 px.
- Selección: carmesí, semibold y subrayado de 2 px separado 5 px.
- Personal y Familia no aparecen.
- “Otra” habilita un input con línea inferior.

## 7. Paso 02 — instintos impactados

- Fila completa clicable.
- Checkbox circular de 20 px.
- Vacío: borde gris.
- Marcado: fondo del color del instinto y check blanco.
- Nombre serif; descripción sans siempre visible.
- Sin símbolos junto a los nombres.
- Sin divisores o fondos entre filas; el ritmo se construye con al menos 24 px verticales.
- El ejemplo se encuentra dentro de esta etapa, separado por una regla y espacio generoso.

## 8. Sankey

### Contenedor

- Es una de las pocas superficies con fondo blanco, borde `--border-card`, radio de 4 px y padding moderado.
- Debe aprovechar todo el ancho disponible; el contenido del paso 03 no lleva sangría lateral del acordeón.
- Inspector actual: 210 px. No ampliarlo sin comprobar que las cintas y controles sigan completos.

### Áreas

- Texto serif alineado a la derecha, cerca del origen de la cinta.
- Área seleccionada: único elemento del mapa con relleno carmesí y texto blanco.
- Área que cambió: solo texto gris; no mostrar la palabra “Cambió”.
- Personal y Familia nunca muestran `−`.
- Controles `+`/`−`: círculos de 16 px, sin desplazamiento negativo que pueda recortarlos.

### Instintos

- Una lista plana de nueve filas; no mostrar encabezados “Competente” o “Relación”.
- Todos alineados al mismo eje.
- Sin símbolos o íconos.
- Empiezan grises (`#8e8f94`).
- Obtienen su color únicamente cuando tienen una fuente activa.
- Construir y Competir se colorean juntos si cualquiera está conectado.
- El `+` o `−` de conexión está a la izquierda del nombre.

### Cintas

- Cada cinta toma el color del instinto destino.
- Las conexiones del área seleccionada se muestran en color pleno.
- Las otras conexiones activas se aclaran para facilitar seguimiento.
- Las conexiones perdidas son grises, delgadas y punteadas.
- Las bandas se calculan en `drawRibbons()` a partir de la geometría DOM; no sustituir por coordenadas rígidas.

### Inspector

- Columna editorial angosta, separada por una regla vertical.
- Sin fondo tintado ni caja propia.
- Para áreas muestra orientación y ejemplos.
- Para instintos muestra definición, ingredientes, buen funcionamiento y falla.
- Construir y Competir incluyen una nota que explica que cualquiera de las dos rutas puede satisfacer Competente.

## 9. Reflexión y formulario

- La reflexión sí usa recuadro blanco con borde sutil y foco carmesí; sin él no se entiende que es editable.
- Inputs y selects del formulario final usan línea inferior, no cajas completas.
- Checkboxes sin tarjeta contenedora.
- El único CTA sólido es “Descargar PDF con diagnóstico”: carmesí y texto blanco.

## 10. Footer y marco teórico

- Sin barra oscura.
- Regla horizontal superior, mismo fondo de página.
- Mensaje de privacidad a la izquierda.
- Solo enlace “Marco teórico y metodología” en la página principal.
- No mostrar “Contacto” hasta que exista un canal definido.
- La página de marco teórico comparte fondo, fuentes, tinta, enlaces y footer.

## 11. Responsive

- Bajo 860 px, ejemplo y descarga pasan a una columna.
- El inspector del Sankey pasa debajo o a panel móvil según las reglas actuales.
- La guía “Cómo funciona” pasa de dos columnas a una.
- Bajo 580 px, grillas de selección reducen columnas y el mapa puede hacer scroll horizontal dentro de su contenedor.

## 12. No reintroducir

- Barras oscuras superior o inferior.
- Eyebrows en mayúsculas sobre cada título.
- Pills o tarjetas para áreas e instintos.
- Fondos tintados por instinto.
- Símbolos de instinto.
- Encabezados visuales “Competente” y “Relación” dentro del Sankey.
- Cierre automático de etapas anteriores.
- Sección independiente para el ejemplo.
- Link de contacto sin un canal aprobado.

