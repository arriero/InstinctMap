# Instinct Map | Coaching Tool

Aplicación web independiente para crear un diagnóstico visual y anónimo de las áreas de vida y las necesidades psicológicas que alimentan.

## Estructura

- `frontend/`: HTML, CSS y JavaScript nativos; no carga frameworks, fuentes, analítica ni scripts externos.
- `backend/`: Quarkus 3.33 LTS, Java 21, REST/Jackson, Panache, Flyway y PostgreSQL.
- `nginx/`: entrega estática, proxy del único endpoint y cabeceras de seguridad. Los access logs están desactivados y no se reenvían IPs.
- `compose.yaml`: web + API + PostgreSQL en un solo host.

## Privacidad por arquitectura

- No hay cuentas, cookies ni almacenamiento local.
- El estado completo vive en memoria y desaparece al cerrar la pestaña.
- Los nombres personalizados y las notas nunca forman parte del payload.
- El backend falla ante campos desconocidos y acepta solo tipos, instintos y rangos de edad enumerados.
- Solo se persisten las conexiones y los datos demográficos opcionales definidos por el contrato estricto de la API.
- El PDF se genera en el navegador; las notas y nombres personales nunca llegan al servidor.
- Turnstile queda obligatorio automáticamente cuando se configura `TURNSTILE_SECRET`; en desarrollo local puede quedar vacío.

## Desarrollo del frontend

Puede servirse con cualquier servidor estático:

```sh
cd frontend
python3 -m http.server 8088
```

El envío fallará sin el backend, pero todo el diagnóstico funciona localmente.

Para levantar la experiencia completa sin contenedores, usar dos terminales:

```sh
cd backend
mvn -Plocal quarkus:dev -Dquarkus.profile=local
```

```sh
python3 -m http.server 8088 --directory frontend
```

El perfil `local` usa H2 en memoria; no forma parte del artefacto de producción.

## Pruebas del backend

Requiere JDK 21 y Maven:

```sh
cd backend
mvn verify
```

## Ejecución completa

```sh
cp .env.example .env
# Cambiar DB_PASSWORD
podman compose up --build
```

Abrir `http://localhost:8088`.

## Producción

Antes de publicar:

1. Configurar HTTPS en el proxy frontal o proveedor.
2. Establecer `PUBLIC_ORIGIN` al dominio HTTPS exacto.
3. Configurar las claves de Cloudflare Turnstile e insertar el widget en el frontend.
4. Sustituir contraseñas locales y respaldar el volumen PostgreSQL.
5. Construir el backend nativo (`mvn package -Dnative`) y usar `Dockerfile.native` si el runner dispone de GraalVM/Mandrel.

La versión está fijada a Quarkus 3.33.3, LTS vigente al iniciar el proyecto en agosto de 2026.

## Google Cloud

- `backend/Dockerfile`: compilación nativa con Mandrel y ejecución sobre UBI Micro para Cloud Run.
- `frontend/firebase.json`: Firebase Hosting con proxy `/api/**` hacia `instinct-map-api` en `us-central1`.
- Secret Manager debe exponer `DATABASE_URL` como una URL JDBC completa de Neon.
- Si el servicio o la región de Cloud Run cambian, actualizar `frontend/firebase.json` antes del despliegue.
