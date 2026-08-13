package com.monkey.areas.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "diagnostico_instinto_sin_area")
@IdClass(UnsupportedInstinct.Key.class)
public class UnsupportedInstinct extends PanacheEntityBase {
    @Id @Column(name = "diagnostico_id") public UUID diagnosticId;
    @Id public String instinto;
    public static class Key implements Serializable {
        public UUID diagnosticId;
        public String instinto;
        public Key() {}
        public Key(UUID diagnosticId, String instinto) { this.diagnosticId = diagnosticId; this.instinto = instinto; }
        @Override public boolean equals(Object other) { return other instanceof Key key && Objects.equals(diagnosticId, key.diagnosticId) && Objects.equals(instinto, key.instinto); }
        @Override public int hashCode() { return Objects.hash(diagnosticId, instinto); }
    }
}
