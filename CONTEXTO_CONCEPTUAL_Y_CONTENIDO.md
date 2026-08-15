# Contexto conceptual y de contenido — Instinct Map

Última actualización: 15 de agosto de 2026.

## 1. Qué es la herramienta

Instinct Map es un autodiagnóstico visual para momentos de cambio. No pregunta “qué tan bien está cada área”, como una Rueda de la Vida. Pregunta qué necesidades sostenía el área que cambió, qué fuentes siguen activas y cuáles necesidades quedaron sin fuente.

La secuencia conceptual es:

1. Nombrar el área que cambió.
2. Reconocer qué instintos alimentaba.
3. Conservar esa pérdida en gris.
4. Mapear lo que sigue en pie.
5. Detectar instintos sin una fuente activa.
6. Registrar una reflexión y descargar el diagnóstico.

No es una evaluación clínica ni un instrumento psicométrico validado. Es un punto de partida para identificar y conversar con mayor precisión.

## 2. Modelo teórico resumido

- **Self-Determination Theory:** aporta Autonomía, Competencia y Relación.
- **Adaptación propia:** Competente se abre en Construir y Competir; Relación se abre en Intimidad, Vínculo y Pertenencia.
- **Extensión propia:** Vitalidad, Provisión y Trascendencia.
- **Donald Super / Life-Career Rainbow:** inspira la vida como una constelación de roles o áreas concurrentes.

La explicación extensa y las citas están en `frontend/acerca-de.html`. No atribuir a SDT las extensiones propias.

## 3. Instintos vigentes

Hay nueve nodos conectables, conceptualmente agrupados en seis familias. Los nombres de familia ya no aparecen en la columna del Sankey porque generaban desalineación y ambigüedad visual.

### Vitalidad

Contar con energía corporal, descanso y recuperación para sostener tu vida. Es la base física desde la que todo lo demás opera: sin ella, hasta las áreas que sí están funcionando bien terminan costando más de lo que deberían.

### Provisión

Tener estabilidad material y la certeza de que hay suficiente para continuar. Es la base más visible de todas, la que se nota primero cuando falta —pero por sí sola no sostiene el resto: solo te da el terreno desde donde ocuparte de lo demás.

### Autonomía

Sentir que eliges y que tus decisiones vienen genuinamente de ti, no de una exigencia externa que solo estás cumpliendo. Se nota más en el tiempo sin agenda: lo que haces sin que nadie te lo pida ni te lo recomiende.

### Construir

Sentirte capaz porque algo cambió o existe gracias a lo que hiciste. El progreso es acumulativo: lo que sabes o puedes hacer hoy, y no podías hace seis meses, es evidencia tangible de que algo en ti se transformó.

### Competir

Medirte frente a un estándar, un marcador o un resultado externo —un cronómetro, un ranking, un objetivo con número. No se trata necesariamente de ganarle a alguien, sino de tener una forma clara de saber si lo lograste.

### Regla Construir / Competir

Son dos rutas de la necesidad Competente. Cualquiera de las dos puede satisfacerla; no se exige tener ambas. Si una recibe una fuente activa, ambos nombres se colorean y Competente no se reporta como hueco. Las conexiones siguen siendo específicas para conservar cuál ruta existe realmente.

### Intimidad

Poder mostrar lo no resuelto —lo que todavía te cuesta, lo que preferirías que nadie viera— y que el otro lo reciba sin intentar arreglarlo ni usarlo en tu contra. Es la vulnerabilidad compartida, no la cantidad de tiempo juntos, lo que convierte la cercanía en algo real.

### Vínculo

Ser elegido y conocido por alguien más allá de un contexto o función —no como el compañero de trabajo o el vecino, sino como tú. Es lo que sostienen las personas que saben quién eras antes de quien eres ahora.

### Pertenencia

Formar parte de un grupo donde tu presencia importa y tu ausencia se nota. No basta con asistir una vez: son los rituales que se repiten, la razón para seguir apareciendo, lo que sostiene el sentido de pertenecer a algo más grande que tú.

### Trascendencia

Sentir que lo que haces importa más allá de ti y tiene un para qué. Se reconoce en lo que aportas sin necesitar que lleve tu nombre: lo que va a seguir sirviendo cuando tú ya no estés para verlo.

## 4. Áreas vigentes

Áreas iniciales:

- Personal
- Familia
- Pareja
- Amigos Cercanos
- Trabajo / Oficio
- Estudio
- Hobby
- Comunidad
- Voluntariado
- Apoyo Profesional

### Áreas estructurales

Personal y Familia son bases profundas y permanentes:

- No se pueden elegir como “área que cambió”.
- No muestran botón de eliminación en el Sankey.
- Sí pueden conectarse normalmente con instintos.

### Áreas que pueden cambiar

Pareja, Amigos Cercanos, Trabajo / Oficio, Estudio, Hobby, Comunidad, Voluntariado y Apoyo Profesional pueden elegirse en el paso 01. Existe además “Otra”, con nombre libre local.

### Áreas repetibles

Trabajo / Oficio, Estudio, Hobby, Comunidad, Voluntariado y Apoyo Profesional pueden tener múltiples instancias mediante el botón `+` del mapa. El tipo se envía al backend; el nombre personalizado solo aparece localmente y en el PDF.

## 5. Flujo vigente de la página

La introducción y “¿Qué son los instintos?” siempre están visibles. Después hay cinco etapas progresivas:

### 01 — ¿Qué área cambió?

- Está abierta desde el inicio.
- Selección única.
- Elegir un área abre el paso 02 sin cerrar el 01.
- Personal y Familia no aparecen.

### 02 — ¿Qué alimentaba esta área?

- Checklist de nueve instintos, sin respuestas premarcadas.
- Se divide en conexiones típicas y menos frecuentes según el área.
- Las descripciones siempre están visibles.
- Contiene también el ejemplo “Así se ve un mapa después de un cambio”; el ejemplo no es una etapa independiente.
- Marcar una conexión abre el paso 03 sin cerrar lo anterior.

### 03 — Lo que sigue en pie

- Muestra el Sankey editable.
- El área que cambió permanece en gris y sus conexiones perdidas son punteadas.
- El usuario elimina áreas inactivas, crea las que falten y conecta las activas.
- “Cómo funciona” se divide en dos columnas: 1–3 y 4–6.
- El punto 3 aclara que debe crearse la nueva área si la anterior fue reemplazada en lugar de desaparecer.
- En móvil, la orientación sigue siendo parte conceptual de este paso, pero no una columna permanente: se consulta bajo demanda desde el botón “Orientación”. No debe aparecer durante el paso 02 porque interrumpe la tarea de reconocer la pérdida.

### 04 — ¿Qué ves en tu mapa?

- Una sola reflexión general.
- Se incluye en el PDF.
- Nunca se envía al servidor.

### 05 — Descargar tu diagnóstico

- Genera PDF local.
- Envía anónimamente solo conexiones y contexto opcional.
- Campos: edad, género, momento de vida, país o región y si es rediagnóstico.

Las secciones abiertas permanecen abiertas. Los títulos sirven para abrir etapas pendientes, no para cerrar las ya realizadas.

La adaptación móvil no cambia el orden conceptual ni convierte la orientación en una etapa adicional: continúa perteneciendo al mapa del paso 03.

## 6. Interpretación de estados

- Gris en el área y línea punteada: lo que cambió.
- Color en una cinta: fuente activa actual.
- Instinto gris: no recibe una fuente activa.
- Instinto con su color: recibe al menos una fuente activa.
- Construir y Competir se colorean juntos si cualquiera recibe una fuente.
- Un hueco es un instinto sin fuente activa; no es una calificación ni un defecto personal.

## 7. Fuentes canónicas de copy

- Descripciones cortas del paso 02: `instinctPrompt` en `frontend/app.js`.
- Textos amplios del inspector: arreglo `instincts` en `frontend/app.js`.
- Orientaciones por área: `guidance` en `frontend/app.js`.
- Conexiones típicas y posibles: `impactProfiles` en `frontend/app.js`.
- Introducción y pasos: `frontend/index.html`.
- Marco teórico y límites: `frontend/acerca-de.html`.

Al cambiar un texto, decidir explícitamente si debe actualizarse también en el inspector, el paso 02, el PDF o el marco teórico.
