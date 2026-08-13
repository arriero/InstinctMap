package com.monkey.areas.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "diagnostico")
public class Diagnostic extends PanacheEntityBase {
    @Id public UUID id;
    @Column(name = "schema_version", nullable = false) public int schemaVersion;
    @Column(name = "rango_edad", length = 8) public String ageRange;
    @Column(name = "genero", length = 16) public String gender;
    @Column(name = "pais_region", length = 80) public String countryOrRegion;
    @Column(name = "es_rediagnostico") public Boolean rediagnosis;
    @Column(name = "creado_en", nullable = false) public OffsetDateTime createdAt;
}
