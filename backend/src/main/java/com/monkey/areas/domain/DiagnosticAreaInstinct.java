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
@Table(name = "diagnostico_area_instinto")
@IdClass(DiagnosticAreaInstinct.Key.class)
public class DiagnosticAreaInstinct extends PanacheEntityBase {
    @Id @Column(name = "area_id") public UUID areaId;
    @Id public String instinto;
    public static class Key implements Serializable {
        public UUID areaId;
        public String instinto;
        public Key() {}
        public Key(UUID areaId, String instinto) { this.areaId = areaId; this.instinto = instinto; }
        @Override public boolean equals(Object other) { return other instanceof Key key && Objects.equals(areaId, key.areaId) && Objects.equals(instinto, key.instinto); }
        @Override public int hashCode() { return Objects.hash(areaId, instinto); }
    }
}
