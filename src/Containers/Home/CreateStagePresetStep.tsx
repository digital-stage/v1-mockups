import React, { useEffect } from 'react';
import { GroupLayout } from './GroupLayout';
import Choir from '../../Components/Presets/Choir';
import Theatre from '../../Components/Presets/Theatre';
import { GroupLayoutEmpty } from './GroupLayoutEmpty';
import CreateEditGroup from './CreateEditGroupModal';
import { Button } from '@material-ui/core';

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

export type Group = {
    id: number;
    name: string;
    icon: string;
    color: string;
}

const choir: Group[] = [
    { id: 1, name: "Conductor", color: "#4EBFAB", icon: "conductor" },
    { id: 2, name: "Tenor", color: "#FF36CA", icon: "singer-tenor" },
    { id: 3, name: "Soprano", color: "#5780F2", icon: "singer-sopran" },
    { id: 4, name: "Bass", color: "#D9486F", icon: "singer-bass" },
    { id: 5, name: "Alto", color: "#FBD366", icon: "singer-alto" }
]

const theatre: Group[] = [
    { id: 6, name: "Director", color: "#4EBFAB", icon: "theatre-director" },
    { id: 7, name: "Ensemble", color: "#FF36CA", icon: "theatre-ensemble" },
    { id: 8, name: "Actor", color: "#5780F2", icon: "theatre-actor" },
]

const presets: string[] = ["choir", "theatre"];

export type Stages = {
    choir: Group[],
    theatre: Group[]
}

export const CreateStagePresetStep = () => {
    const [stageGroups, setStageGroups] = React.useState<any>({ choir: choir, theatre: theatre })
    const [deletedGroup, setDeletedGroup] = React.useState<number>();
    const [selectedPreset, setSelectedPreset] = React.useState<string>(Preset.CHOIR);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        if (deletedGroup) {
            let groups = stageGroups[selectedPreset].filter((group: any) => group.id !== deletedGroup);
            setStageGroups({ ...stageGroups, [selectedPreset]: [...groups] })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedGroup, selectedPreset])

    return (
        <div className="my-1 mx-3 text-left">
            <CreateEditGroup handleClose={handleClose} open={open} />
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
                    onClick={handleClickOpen}
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