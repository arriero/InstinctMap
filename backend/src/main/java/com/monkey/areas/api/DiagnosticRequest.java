package com.monkey.areas.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public record DiagnosticRequest(
        @Min(3) @Max(3) int schemaVersion,
        @Pattern(regexp = "18-24|25-34|35-44|45-54|55-64|65\\+") String ageRange,
        @Pattern(regexp = "mujer|hombre|no-binario|otro") String gender,
        @NotNull @Size(max = 8) List<@Pattern(regexp = "cambio-trabajo|separacion|nuevo-hijo|mudanza|duelo|cambio-salud|jubilacion|ninguno") String> lifeMoments,
        @Size(max = 80) @Pattern(regexp = "[^<>]{1,80}") String countryOrRegion,
        Boolean rediagnosis,
        @NotEmpty @Size(max = 24) List<@Valid AreaRequest> areas,
        @NotNull @Size(max = 9) List<@Pattern(regexp = InstinctIds.REGEX) String> unsupportedInstinctIds,
        @Size(max = 4096) String turnstileToken) {

    public record AreaRequest(
            @jakarta.validation.constraints.NotBlank @Pattern(regexp = "Personal|Familia|Pareja|Amigos Cercanos|Trabajo / Oficio|Estudio|Hobby|Comunidad|Voluntariado|Apoyo Profesional") String type,
            @NotNull @Size(max = 9) List<@Pattern(regexp = InstinctIds.REGEX) String> instinctIds) {}
}
