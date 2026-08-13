# Imagen JVM de producción para Google Cloud Run.
# El empaquetado fast-jar de Quarkus es reproducible y evita depender de la
# convención de nombre del ejecutable nativo dentro de un build multietapa.
FROM quay.io/quarkus/ubi9-quarkus-mandrel-builder-image:jdk-21 AS build

USER root
RUN mkdir -p /code && chown -R quarkus:quarkus /code
USER quarkus
WORKDIR /code

COPY --chown=quarkus:quarkus pom.xml /code/pom.xml
COPY --chown=quarkus:quarkus mvnw /code/mvnw
COPY --chown=quarkus:quarkus .mvn /code/.mvn
RUN ./mvnw --batch-mode org.apache.maven.plugins:maven-dependency-plugin:3.1.2:go-offline

COPY --chown=quarkus:quarkus src /code/src
RUN ./mvnw --batch-mode package -DskipTests

FROM registry.access.redhat.com/ubi9/openjdk-21-runtime:1.23
ENV LANGUAGE='en_US:en'

COPY --chown=185 --from=build /code/target/quarkus-app/lib/ /deployments/lib/
COPY --chown=185 --from=build /code/target/quarkus-app/*.jar /deployments/
COPY --chown=185 --from=build /code/target/quarkus-app/app/ /deployments/app/
COPY --chown=185 --from=build /code/target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"
