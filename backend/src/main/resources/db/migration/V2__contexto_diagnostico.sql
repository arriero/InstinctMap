ALTER TABLE diagnostico ALTER COLUMN rango_edad DROP NOT NULL;
ALTER TABLE diagnostico ADD COLUMN genero VARCHAR(16);
ALTER TABLE diagnostico ADD COLUMN pais_region VARCHAR(80);
ALTER TABLE diagnostico ADD COLUMN es_rediagnostico BOOLEAN;

CREATE TABLE diagnostico_momento_vida (
    diagnostico_id UUID NOT NULL REFERENCES diagnostico(id) ON DELETE CASCADE,
    momento VARCHAR(24) NOT NULL,
    PRIMARY KEY (diagnostico_id, momento)
);

CREATE INDEX idx_diagnostico_genero ON diagnostico(genero);
CREATE INDEX idx_diagnostico_region ON diagnostico(pais_region);
CREATE INDEX idx_diagnostico_momento ON diagnostico_momento_vida(momento);
