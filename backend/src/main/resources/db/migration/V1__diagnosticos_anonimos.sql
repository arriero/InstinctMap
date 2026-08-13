CREATE TABLE diagnostico (
    id UUID PRIMARY KEY,
    schema_version INTEGER NOT NULL,
    rango_edad VARCHAR(8) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE diagnostico_area (
    id UUID PRIMARY KEY,
    diagnostico_id UUID NOT NULL REFERENCES diagnostico(id) ON DELETE CASCADE,
    tipo VARCHAR(40) NOT NULL
);

CREATE TABLE diagnostico_area_instinto (
    area_id UUID NOT NULL REFERENCES diagnostico_area(id) ON DELETE CASCADE,
    instinto VARCHAR(24) NOT NULL,
    PRIMARY KEY (area_id, instinto)
);

CREATE TABLE diagnostico_instinto_sin_area (
    diagnostico_id UUID NOT NULL REFERENCES diagnostico(id) ON DELETE CASCADE,
    instinto VARCHAR(24) NOT NULL,
    PRIMARY KEY (diagnostico_id, instinto)
);

CREATE INDEX idx_diagnostico_rango_edad ON diagnostico(rango_edad);
CREATE INDEX idx_area_tipo ON diagnostico_area(tipo);
CREATE INDEX idx_area_instinto ON diagnostico_area_instinto(instinto);
