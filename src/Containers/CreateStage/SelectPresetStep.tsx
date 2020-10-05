import React, { useEffect } from 'react';
import { GroupLayout } from '../../Components/StageCreate/GroupLayout';
import Choir from '../../Components/StageCreate/Choir';
import Theatre from '../../Components/StageCreate/Theatre';
import { GroupLayoutEmpty } from '../../Components/StageCreate/GroupLayoutEmpty';
import CreateEditGroup from './CreateEditGroupModal';

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

const presets: string[] = ["choir", "theatre"];

export type Stages = {
    choir: Group[],
    theatre: Group[]
}

export const SelectPresetStep = () => {
    const [stageGroups, setStageGroups] = React.useState<any>({ choir, theatre })
    const [deletedGroup, setDeletedGroup] = React.useState<number>();
    const [selectedPreset, setSelectedPreset] = React.useState<string>(Preset.CHOIR);
    const [open, setOpen] = React.useState(false);
    const [groupId, setGroupId] = React.useState<number | null>();
    const [group, setGroup] = React.useState<Group | null>();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGroupId(null)
    };

    const saveGroup = (color: string, icon: string, name: string) => {
        if (groupId) {
            const updateGroup = { id: groupId, name, color, icon }
            let elementsIndex: number;
            elementsIndex = stageGroups[selectedPreset].findIndex((el: Group) => el.id === groupId)
            const newArray = [...stageGroups[selectedPreset]]
            newArray[elementsIndex] = updateGroup
            setStageGroups({ ...stageGroups, [selectedPreset]: [...newArray] })
            setOpen(false);
        }
        else {
            const newGroup = { id: stageGroups.choir.length + stageGroups.theatre.length + 1, name, color, icon }
            stageGroups[selectedPreset].push({ ...newGroup })
            setOpen(false);
        }
    }

    const deleteGroup = (id: number) => {
        setDeletedGroup(id);
    }

    const selectPreset = (preset: string, context: string) => {
        let selected;
        switch (preset) {
            case (Preset.CHOIR):
                selected = <Choir groups={stageGroups.choir} context={context} />
                break;
            case (Preset.THEATRE):
                selected = <Theatre groups={stageGroups.theatre} context={context} />
                break;
        }
        return selected;
    }

    const handleSaveGroup = (color: string, icon: string, name: string) => saveGroup(color, icon, name)

    const handleSetPreset = (preset: string) => {
        return () => setSelectedPreset(preset)
    }

    const handleGroupDelete = (id: number) => {
        return () => deleteGroup(id)
    }

    const handleEdiCreateGroupModalOpen = (id: number) => {
        return () => {
            handleClickOpen();
            setGroupId(id)
        }
    }

    useEffect(() => {
        if (deletedGroup) {
            const groups = stageGroups[selectedPreset].filter((el: Group) => el.id !== deletedGroup);
            setStageGroups({ ...stageGroups, [selectedPreset]: [...groups] })
        }
        if (groupId) {
            const selectedGroup = stageGroups[selectedPreset].filter((el: Group) => el.id === groupId);
            setGroup(selectedGroup[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedGroup, selectedPreset, groupId, group])

    return (
        <div className="my-1 mx-3 text-left">
            <CreateEditGroup
                handleClose={handleClose}
                open={open}
                group={groupId !== null ? group : null}
                saveGroup={handleSaveGroup}
            />
            <h6>What type of stage do you need?</h6>
            <p>Select a preset:</p>
            <div className="text-center d-flex">
                {presets.map((preset, i) => {
                    return (
                        <div
                            key={i}
                            className="mr-2 p-1"
                            onClick={handleSetPreset(preset)}
                            style={{
                                backgroundColor: selectedPreset === preset ? "#A8214B" : "transparent",
                                borderRadius: "8px",
                                maxWidth: "max-content",
                                cursor: "pointer"
                            }}>
                            {selectPreset(preset, "preset")}
                            <h6>{preset.charAt(0).toUpperCase() + preset.slice(1)}</h6>
                        </div>
                    )
                })
                }
            </div>
            <div className="d-flex mt-4">
                <div className="w-50 mr-5">
                    <h6>{selectedPreset.charAt(0).toUpperCase() + selectedPreset.slice(1)}</h6>
                    <p className="white">This is a preset description Text. Lets explain the scenario this preset was created for...  Forage hashtag taiyaki coloring book. Gastropub sustainable kickstarter roof party. </p>
                </div>
                <div className="w-50 ml-5">
                    <p className="mb-1">Layout preview</p>
                    {selectPreset(selectedPreset, "preview")}
                </div>
            </div>
            <h6>Groups</h6>
            <div className="d-flex">
                {stageGroups[selectedPreset].map((el: Group) => <GroupLayout
                    group={el}
                    key={el.id}
                    handleGroupDelete={handleGroupDelete(el.id)}
                    onClick={handleEdiCreateGroupModalOpen(el.id)}
                />
                )}
                {stageGroups[selectedPreset].length < 5 && <GroupLayoutEmpty
                    onClick={handleClickOpen}
                />
                }
            </div>
        </div>
    )
}