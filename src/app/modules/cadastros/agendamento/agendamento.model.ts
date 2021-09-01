import { Entity } from "app/shared/models/entity.model";

export interface Agendamento extends Entity {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    editable: boolean;
    durationEditable: boolean;
    backgroundColor: string;
    textColor: string;
    categoriaId: string;
    aeronaveId: string;
}