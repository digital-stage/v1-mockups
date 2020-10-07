import React, { useEffect } from 'react';
import { GroupLayout } from '../../Components/StageCreate/GroupLayout';
import Choir from '../../Components/StageCreate/Choir';
import Theatre from '../../Components/StageCreate/Theatre';
import { GroupLayoutEmpty } from '../../Components/StageCreate/GroupLayoutEmpty';
import CreateEditGroup from './CreateEditGroupModal';
import { Group, Preset, presets } from '../../js/CreateStageUtils';
import { useCreateStage } from '../../hooks/useCreateStage';


export const SelectPresetStep = () => {
    const { handleSetPreset, preset, stageGroups,  setStageGroups} = useCreateStage()
    // const [stageGroups, setStageGroups] = React.useState<any>({ choir, theatre })
    const [deletedGroup, setDeletedGroup] = React.useState<number>();
    const [selectedPreset, setSelectedPreset] = React.useState<string>(preset);
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

    const handlePreset = (preset: string) => {
        return () => setSelectedPreset(preset);
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
        handleSetPreset(selectedPreset)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedGroup, selectedPreset, groupId, group])

    return (
        <div className="my-1 mx-3 text-left select-preset">
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
                            className="mr-2 p-1 preset"
                            onClick={handlePreset(preset)}
                            style={{
                                backgroundColor: selectedPreset === preset ? "#A8214B" : "transparent"
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