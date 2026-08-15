package com.monkey.areas.api;

import com.monkey.areas.domain.Diagnostic;
import com.monkey.areas.domain.DiagnosticArea;
import com.monkey.areas.domain.DiagnosticAreaInstinct;
import com.monkey.areas.domain.UnsupportedInstinct;
import com.monkey.areas.domain.DiagnosticLifeMoment;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Path("/api/v1/diagnostics")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DiagnosticResource {
    @Inject TurnstileVerifier turnstile;

    @POST
    @Transactional
    public Response create(@Valid DiagnosticRequest request) {
        if (!turnstile.verify(request.turnstileToken())) throw new WebApplicationException("Reto antiabuso inválido", 403);
        validateConsistency(request);

        Diagnostic diagnostic = new Diagnostic();
        diagnostic.id = UUID.randomUUID();
        diagnostic.schemaVersion = request.schemaVersion();
        diagnostic.ageRange = request.ageRange();
        diagnostic.gender = request.gender();
        diagnostic.countryOrRegion = request.countryOrRegion();
        diagnostic.rediagnosis = request.rediagnosis();
        diagnostic.createdAt = OffsetDateTime.now(ZoneOffset.UTC);
        diagnostic.persist();

        new HashSet<>(request.lifeMoments()).forEach(value -> {
            DiagnosticLifeMoment moment = new DiagnosticLifeMoment();
            moment.diagnosticId = diagnostic.id;
            moment.moment = value;
            moment.persist();
        });

        for (DiagnosticRequest.AreaRequest input : request.areas()) {
            DiagnosticArea area = new DiagnosticArea();
            area.id = UUID.randomUUID();
            area.diagnosticId = diagnostic.id;
            area.tipo = input.type();
            area.persist();
            new HashSet<>(input.instinctIds()).forEach(id -> {
                DiagnosticAreaInstinct link = new DiagnosticAreaInstinct();
                link.areaId = area.id;
                link.instinto = id;
                link.persist();
            });
        }
        new HashSet<>(request.unsupportedInstinctIds()).forEach(id -> {
            UnsupportedInstinct missing = new UnsupportedInstinct();
            missing.diagnosticId = diagnostic.id;
            missing.instinto = id;
            missing.persist();
        });
        return Response.status(Response.Status.CREATED).entity(Map.of("id", diagnostic.id)).build();
    }

    private static void validateConsistency(DiagnosticRequest request) {
        if (request.lifeMoments().contains("ninguno") && request.lifeMoments().size() > 1) {
            throw new WebApplicationException("Ninguno no puede combinarse con otro momento de vida", 422);
        }
        Set<String> connected = new HashSet<>();
        request.areas().forEach(area -> connected.addAll(area.instinctIds()));
        Set<String> expectedMissing = new HashSet<>(InstinctIds.ALL);
        expectedMissing.removeAll(connected);
        if (connected.contains("construir") || connected.contains("competir")) {
            expectedMissing.remove("construir");
            expectedMissing.remove("competir");
        }
        if (!expectedMissing.equals(new HashSet<>(request.unsupportedInstinctIds()))) {
            throw new WebApplicationException("Los instintos sin área no coinciden con las conexiones", 422);
        }
    }
}
