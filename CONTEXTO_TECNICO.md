# Contexto técnico — Instinct Map

Última actualización: 15 de agosto de 2026.

Este documento describe la arquitectura y operación vigentes. Si entra en conflicto con un plan histórico, prevalecen este archivo y el código actual.

## 1. Identidad y repositorio

- Proyecto independiente: **Instinct Map**.
- Repositorio: `https://github.com/arriero/InstinctMap`.
- Rama de trabajo vigente: `main`.
- Raíz local: `/Users/arriero/Documents/Dev/InstinctMap`.
- Sitio público: `https://instinctmap-505414.web.app`.
- Google Cloud project: `instinctmap-505414`.
- Cloud Run: servicio `instinctmap`, región `us-east1`.
- Firebase Hosting sirve el frontend y reescribe `/api/**` hacia Cloud Run.

## 2. Arquitectura

### Frontend

Ubicación: `frontend/`.

- HTML, CSS y JavaScript nativos; no usa React, Vue, bundler ni framework de componentes.
- Entrada principal: `frontend/index.html`.
- Estado, datos, render del Sankey, PDF y llamadas API: `frontend/app.js`.
- Sistema visual: `frontend/styles.css`.
- Marco teórico: `frontend/acerca-de.html` y `frontend/acerca-de.css`.
- Configuración Firebase: `frontend/firebase.json`.
- El estado del diagnóstico vive únicamente en memoria. No hay `localStorage`, cuentas ni cookies.
- El PDF se construye en el navegador sin librerías externas.
- No se cargan fuentes, scripts, analítica ni recursos de terceros. Esto preserva la afirmación de privacidad del sitio.

### Backend

Ubicación: `backend/`.

- Java 21.
- Quarkus 3.33.3 LTS.
- REST/Jackson, Bean Validation, Hibernate ORM Panache, Flyway y PostgreSQL.
- Endpoint único: `POST /api/v1/diagnostics`.
- Salud de Quarkus disponible mediante SmallRye Health.
- Contenedor de producción: `backend/Dockerfile`, empaquetado JVM `fast-jar` sobre UBI OpenJDK 21.
- Base de datos de producción: Neon PostgreSQL mediante una URL JDBC completa guardada en Secret Manager como `DATABASE_URL`.
- En local, el perfil `local` usa H2 en memoria.

### Persistencia

Flyway mantiene estas tablas:

- `diagnostico`: cabecera anónima, versión de esquema y contexto demográfico opcional.
- `diagnostico_area`: tipos de área, nunca nombres personalizados.
- `diagnostico_area_instinto`: conexiones área–instinto.
- `diagnostico_instinto_sin_area`: instintos sin fuente activa.
- `diagnostico_momento_vida`: selección múltiple de contexto vital.

Migraciones canónicas:

- `backend/src/main/resources/db/migration/V1__diagnosticos_anonimos.sql`
- `backend/src/main/resources/db/migration/V2__contexto_diagnostico.sql`

## 3. Contrato API vigente — esquema 3

El request contiene:

- `schemaVersion`: exactamente `3`.
- `ageRange`: opcional; `18-24`, `25-34`, `35-44`, `45-54`, `55-64`, `65+`.
- `gender`: opcional; `mujer`, `hombre`, `no-binario`, `otro`.
- `lifeMoments`: lista opcional de `cambio-trabajo`, `separacion`, `nuevo-hijo`, `mudanza`, `duelo`, `cambio-salud`, `jubilacion`, `ninguno`.
- `countryOrRegion`: opcional, máximo 80 caracteres.
- `rediagnosis`: booleano opcional.
- `areas`: tipos permitidos y sus IDs de instinto.
- `unsupportedInstinctIds`: lista calculada, validada contra las conexiones.
- `turnstileToken`: reservado para antiabuso.

Nunca se envían notas, nombres personales ni el nombre libre de un área. Jackson falla ante campos desconocidos deliberadamente.

### Regla especial de Competente

`construir` y `competir` son dos rutas de una misma necesidad. Si existe una conexión activa a cualquiera, ambas se consideran cubiertas al calcular huecos. Esta regla debe mantenerse sincronizada en:

- `isInstinctSupported` de `frontend/app.js`.
- PDF generado por el frontend.
- `unsupportedInstinctIds` enviado al backend.
- `DiagnosticResource.validateConsistency` en el backend.
- Prueba `acceptsEitherCompetenceRouteAsSupportForBoth`.

## 4. Privacidad por arquitectura

- Sin login, cookies, analítica ni almacenamiento persistente del navegador.
- Los nombres personales y la reflexión solo viven en la pestaña y el PDF local.
- El backend persiste conexiones y campos contextuales opcionales de lista blanca.
- No se persiste IP desde la aplicación; el proxy propio no debe reenviarla.
- Access log de Quarkus desactivado.
- Turnstile solo se vuelve obligatorio cuando existe `TURNSTILE_SECRET`.
- El footer comunica: “Anónimo, sin solicitud de login y sin cookies. Tus notas personales nunca salen de este navegador.”

## 5. Desarrollo y verificación

Frontend estático:

```sh
cd /Users/arriero/Documents/Dev/InstinctMap/frontend
python3 -m http.server 8088
```

Backend local:

```sh
cd /Users/arriero/Documents/Dev/InstinctMap/backend
./mvnw -Plocal quarkus:dev -Dquarkus.profile=local
```

Pruebas:

```sh
cd /Users/arriero/Documents/Dev/InstinctMap/backend
./mvnw --batch-mode verify
node --check ../frontend/app.js
git diff --check
```

## 6. Despliegue

Firebase Hosting:

```sh
cd /Users/arriero/Documents/Dev/InstinctMap/frontend
npx firebase-tools@latest deploy --only hosting --project instinctmap-505414
```

La reescritura productiva debe conservar:

```json
{
  "source": "/api/**",
  "run": { "serviceId": "instinctmap", "region": "us-east1" }
}
```

El backend se construye desde `backend/Dockerfile`. Cloud Run debe escuchar `PORT=8080`. `DATABASE_URL` debe comenzar con `jdbc:postgresql://` e incluir SSL para Neon.

## 7. Reglas para futuras modificaciones

1. No agregar dependencias frontend sin una necesidad real.
2. No enviar notas o nombres al backend.
3. Si cambia el conjunto de áreas o instintos, actualizar simultáneamente frontend, DTO, validaciones, migraciones si aplican y pruebas.
4. Si cambia el cálculo de huecos, mantener frontend, PDF y backend idénticos.
5. Verificar escritorio y móvil; el Sankey usa medición DOM y se redibuja con `ResizeObserver`.
6. No asumir que un deploy de Hosting actualiza Cloud Run: son despliegues independientes.
7. El inspector móvil del Sankey depende de las clases `mobile-inspector-open` y `is-open`, de los controles `mobile-inspector-toggle` / `mobile-inspector-close` y de un `IntersectionObserver`; no convertirlo de nuevo en una columna fija o una hoja inferior global.
