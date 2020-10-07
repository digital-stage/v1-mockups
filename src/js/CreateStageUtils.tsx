export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

export enum Preset {
    CHOIR = "choir",
    BAND = "BAND",
    ORCHESTRA = "ORCHESTRA",
    DANCE = "DANCE",
    THEATRE = "theatre",
    BAND_REHEARSAL = "BAND REHEARSAL",
    THEATRE_REHEARSAL = "THEATRE REHEARSAL",
    PERSONAL_LESSON = "PERSONAL LESSON",
    CHOIR_PERFORMANCE = "CHOIR PERFORMANCE"
}

export enum ChoirGroups {
    CONDUCTOR = "Conductor",
    TENOR = "Tenor",
    SOPRANO = "Soprano",
    BASS = "Bass",
    ALTO = "Alto",
}

export enum TheatreGroups {
    DIRECTOR = "Director",
    ENSEMBLE = "Ensemble",
    ACTOR = "Actor",
}
export type User = {
    id?: number;
    name?: string;
    email: string
}

export type Group = {
    id: number;
    name: string;
    icon: string;
    color: string;
    users: User[]
}

export const choir: Group[] = [
    { id: 1, name: "Conductor", color: "#4EBFAB", icon: "orchestra-conductor", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }, { id: 1, name: "Felix Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 2, name: "Tenor", color: "#FF36CA", icon: "choir-tenor", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }, { id: 1, name: "Sasha Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 3, name: "Soprano", color: "#5780F2", icon: "choir-sopran", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 4, name: "Bass", color: "#D9486F", icon: "choir-bass", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 5, name: "Alto", color: "#FBD366", icon: "choir-alto", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] }
]

export const theatre: Group[] = [
    { id: 6, name: "Director", color: "#4EBFAB", icon: "theatre-director", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 7, name: "Ensemble", color: "#FF36CA", icon: "theatre-ensemble", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] },
    { id: 8, name: "Actor", color: "#5780F2", icon: "theatre-actor", users: [{ id: 1, name: "Brad Daniels", email: "brad.daniels@digital-stage.org" }] },
]

export const presets: string[] = ["choir", "theatre"];

export type Stages = {
    choir: Group[],
    theatre: Group[]
}
