package com.monkey.areas.api;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
class DiagnosticResourceTest {
    @Test
    void acceptsOnlyConsistentAnonymousDiagnosis() {
        given().contentType("application/json").body("""
            {"schemaVersion":3,"ageRange":"35-44","gender":"mujer","lifeMoments":["cambio-trabajo"],"countryOrRegion":"Colombia","rediagnosis":false,"areas":[{"type":"Personal","instinctIds":["vitalidad"]}],"unsupportedInstinctIds":["provision","intimidad","vinculo","pertenencia","autonomia","construir","competir","trascendencia"],"turnstileToken":null}
            """).when().post("/api/v1/diagnostics").then().statusCode(201).body("id", notNullValue());
    }

    @Test
    void rejectsUnknownFieldsAndInconsistentMissingInstincts() {
        given().contentType("application/json").body("""
            {"schemaVersion":3,"ageRange":null,"gender":null,"lifeMoments":[],"countryOrRegion":null,"rediagnosis":null,"areas":[{"type":"Personal","instinctIds":[]}],"unsupportedInstinctIds":[],"notes":"must never be accepted"}
            """).when().post("/api/v1/diagnostics").then().statusCode(400);

        given().contentType("application/json").body("""
            {"schemaVersion":3,"ageRange":null,"gender":null,"lifeMoments":[],"countryOrRegion":null,"rediagnosis":null,"areas":[{"type":"Personal","instinctIds":[]}],"unsupportedInstinctIds":[],"turnstileToken":null}
            """).when().post("/api/v1/diagnostics").then().statusCode(422);
    }

    @Test
    void acceptsEitherCompetenceRouteAsSupportForBoth() {
        given().contentType("application/json").body("""
            {"schemaVersion":3,"ageRange":null,"gender":null,"lifeMoments":[],"countryOrRegion":null,"rediagnosis":null,"areas":[{"type":"Personal","instinctIds":["construir"]}],"unsupportedInstinctIds":["vitalidad","provision","intimidad","vinculo","pertenencia","autonomia","trascendencia"],"turnstileToken":null}
            """).when().post("/api/v1/diagnostics").then().statusCode(201).body("id", notNullValue());
    }
}
