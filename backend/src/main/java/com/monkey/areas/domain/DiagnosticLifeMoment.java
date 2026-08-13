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
@Table(name = "diagnostico_momento_vida")
@IdClass(DiagnosticLifeMoment.Key.class)
public class DiagnosticLifeMoment extends PanacheEntityBase {
    @Id @Column(name = "diagnostico_id") public UUID diagnosticId;
    @Id @Column(name = "momento", length = 24) public String moment;

    public static class Key implements Serializable {
        public UUID diagnosticId;
        public String moment;
        public Key() {}
        public Key(UUID diagnosticId, String moment) { this.diagnosticId = diagnosticId; this.moment = moment; }
        @Override public boolean equals(Object other) { return other instanceof Key key && Objects.equals(diagnosticId, key.diagnosticId) && Objects.equals(moment, key.moment); }
        @Override public int hashCode() { return Objects.hash(diagnosticId, moment); }
    }
}
