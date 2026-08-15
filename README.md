# Instinct Map

Aplicación web independiente para crear un diagnóstico visual y anónimo de lo que cambia en una transición vital. La persona identifica el área afectada, reconoce qué instintos sostenía y construye un Sankey con las fuentes que siguen activas para ver qué necesidades quedaron sin soporte.

La interfaz usa cinco etapas progresivas:

1. Área que cambió.
2. Instintos que alimentaba, junto con un ejemplo del resultado.
3. Mapa actual de áreas e instintos.
4. Reflexión general.
5. Descarga del diagnóstico en PDF.

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

## Interfaz adaptable

- En escritorio, la orientación del Sankey ocupa una columna editorial a la derecha.
- Bajo 860 px, esa orientación no ocupa espacio permanente: se abre desde el botón `Orientación` como un cajón lateral derecho y puede cerrarse con `×`.
- El cajón solo está disponible dentro del paso 3, se cierra al salir del mapa y permanece completamente fuera del renderizado mientras está cerrado.
- El Sankey conserva desplazamiento horizontal en pantallas estrechas.

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

- `backend/Dockerfile`: compilación multietapa y ejecución JVM sobre UBI OpenJDK 21 para Cloud Run.
- `frontend/firebase.json`: Firebase Hosting con proxy `/api/**` hacia `instinctmap` en `us-east1`.
- Secret Manager debe exponer `DATABASE_URL` como una URL JDBC completa de Neon.
- Si el servicio o la región de Cloud Run cambian, actualizar `frontend/firebase.json` antes del despliegue.
- `frontend/index.html` versiona las URLs de `styles.css` y `app.js`. Cambiar ese identificador cuando una publicación modifique comportamiento o estilos para evitar mezclar recursos antiguos en cachés móviles.
