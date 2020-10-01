import React, { useEffect } from 'react';
import { GroupLayout } from './GroupLayout';
import Choir from '../../Components/Presets/Choir';
import Theatre from '../../Components/Presets/Theatre';
import { GroupLayoutEmpty } from './GroupLayoutEmpty';
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
    id: number;
    name: string;
    email:string
}

export type Group = {
    id: number;
    name: string;
    icon: string;
    color: string;
    users: User[]
}

export const choir: Group[] = [
    { id: 1, name: "Conductor", color: "#4EBFAB", icon: "orchestra-conductor", users: [{ id: 1, name: "Brad Daniels", email:"brad.daniels@digital-stage.org" }, { id: 1, name: "Felix Daniels", email:"brad.daniels@digital-stage.org" }] },
    { id: 2, name: "Tenor", color: "#FF36CA", icon: "choir-tenor", users: [{ id: 1, name: "Brad Daniels", email:"brad.daniels@digital-stage.org" }, { id: 1, name: "Sasha Daniels", email:"brad.daniels@digital-stage.org" }] },
    { id: 3, name: "Soprano", color: "#5780F2", icon: "choir-sopran", users: [{ id: 1, name: "Brad Daniels",  email:"brad.daniels@digital-stage.org" }] },
    { id: 4, name: "Bass", color: "#D9486F", icon: "choir-bass", users: [{ id: 1, name: "Brad Daniels",  email:"brad.daniels@digital-stage.org" }] },
    { id: 5, name: "Alto", color: "#FBD366", icon: "choir-alto", users: [{ id: 1, name: "Brad Daniels",  email:"brad.daniels@digital-stage.org" }] }
]

const theatre: Group[] = [
    { id: 6, name: "Director", color: "#4EBFAB", icon: "theatre-director", users: [{ id: 1, name: "Brad Daniels", email:"brad.daniels@digital-stage.org" }] },
    { id: 7, name: "Ensemble", color: "#FF36CA", icon: "theatre-ensemble", users: [{ id: 1, name: "Brad Daniels", email:"brad.daniels@digital-stage.org" }] },
    { id: 8, name: "Actor", color: "#5780F2", icon: "theatre-actor", users: [{ id: 1, name: "Brad Daniels", email:"brad.daniels@digital-stage.org" }] },
]

const presets: string[] = ["choir", "theatre"];

export type Stages = {
    choir: Group[],
    theatre: Group[]
}

export const SelectPresetStep = () => {
    const [stageGroups, setStageGroups] = React.useState<any>({ choir: choir, theatre: theatre })
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

    const saveGroup = (color: any, icon: any, name: any) => {
        console.log(groupId);

        if (groupId) {
            console.log("group id");

            // let group = stageGroups[selectedPreset].filter((group: any) => group.id === groupId);
            // if(group){
            // let group = stageGroups[selectedPreset].filter((group: any) => group.id === groupId);
            // let index = stageGroups[selectedPreset].map((el:any) => el.findIndex((obj:any) => obj.id = groupId))
            // console.log(index)

            const updateGroup = { id: groupId, name: name, color: color, icon: icon }
            let elementsIndex: any;
            elementsIndex = stageGroups[selectedPreset].findIndex((el: any) => el.id === groupId)
            let newArray = [...stageGroups[selectedPreset]]
            newArray[elementsIndex] = updateGroup
            setStageGroups({ ...stageGroups, [selectedPreset]: [...newArray] })
            setOpen(false);
            // }

        }
        else {
            const newGroup = { id: stageGroups["choir"].length + stageGroups["theatre"].length + 1, name: name, color: color, icon: icon }
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



    useEffect(() => {
        console.log(stageGroups)
        if (deletedGroup) {
            let groups = stageGroups[selectedPreset].filter((group: any) => group.id !== deletedGroup);
            setStageGroups({ ...stageGroups, [selectedPreset]: [...groups] })
        }
        if (groupId) {
            let group = stageGroups[selectedPreset].filter((group: any) => group.id === groupId);
            setGroup(group[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedGroup, selectedPreset, groupId, group])

    return (
        <div className="my-1 mx-3 text-left">
            <CreateEditGroup
                handleClose={handleClose}
                open={open}
                group={groupId !== null ? group : null}
                saveGroup={(color: any, icon: any, name: any) => saveGroup(color, icon, name)}
            />
            <h6>What type of stage do you need?</h6>
            <p>Select a preset:</p>
            <div className="text-center d-flex">
                {presets.map((preset) => {
                    return (
                        <div
                            className="mr-2 p-1"
                            onClick={() => setSelectedPreset(preset)}
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
                {stageGroups[selectedPreset].map((group: any) => <GroupLayout
                    group={group}
                    key={group.id}
                    handleGroupDelete={() => deleteGroup(group.id)}
                    onClick={() => { handleClickOpen(); setGroupId(group.id) }}
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