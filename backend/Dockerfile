# Imagen nativa de producción para Google Cloud Run.
FROM quay.io/quarkus/ubi9-quarkus-mandrel-builder-image:jdk-21 AS build

USER quarkus
WORKDIR /code
COPY --chown=quarkus:quarkus pom.xml /code/pom.xml
COPY --chown=quarkus:quarkus mvnw /code/mvnw
COPY --chown=quarkus:quarkus .mvn /code/.mvn
RUN ./mvnw --batch-mode org.apache.maven.plugins:maven-dependency-plugin:3.1.2:go-offline

COPY --chown=quarkus:quarkus src /code/src
RUN ./mvnw --batch-mode package -Pnative -DskipTests

FROM quay.io/quarkus/ubi9-quarkus-micro-image:2.0
WORKDIR /work/
RUN chown 1001:root /work && chmod "g+rwX" /work
COPY --chown=1001:root --from=build /code/target/*-runner /work/application

EXPOSE 8080
USER 1001
ENTRYPOINT ["./application", "-Dquarkus.http.host=0.0.0.0"]
