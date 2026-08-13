package com.monkey.areas.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "diagnostico_area")
public class DiagnosticArea extends PanacheEntityBase {
    @Id public UUID id;
    @Column(name = "diagnostico_id", nullable = false) public UUID diagnosticId;
    @Column(nullable = false, length = 40) public String tipo;
}
