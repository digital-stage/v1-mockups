// @ts-nocheck
import React, {useCallback, useEffect, useState} from "react";
import Server, {Group, GroupMember, Stage} from "../common/model.client";
import {CustomGroupVolumeId, CustomStageMemberVolumeId, GroupId, StageId, StageMemberId} from "../common/model.common";
import {useDevices} from "../useDevices";
import {ClientStageEvents, ServerStageEvents} from "../common/events";
import useMediasoup from "../useMediasoup";
import {useRequest} from "../useRequest";

export interface StagesProps {
    stages: Stage[];

    stage: Stage;

    stageId?: { stageId: StageId, groupId: GroupId };

    createStage(name: string, password: string | null, width?: number, length?: number, height?: number, reflection?: number, absorption?: number);

    updateStage(id: StageId, stage: Partial<Server.StagePrototype>);

    joinStage(stageId: StageId, groupId: GroupId, password: string | null): Promise<void>;

    leaveStage();

    removeStage(id: StageId);

    createGroup(stageId: StageId, name: string);

    updateGroup(id: GroupId, group: Partial<Server.GroupPrototype>);

    setGroupVolume(id: GroupId, volume: number);

    removeGroup(id: GroupId);

    updateStageMember(id: StageMemberId, stageMember: Partial<Server.StageMemberPrototype>);

    setStageMemberVolume(id: StageMemberId, volume: number);

    setCustomGroupVolume(groupId: GroupId, volume: number);

    setCustomGroupMemberVolume(id: StageMemberId, volume: number);
}

const StagesContext = React.createContext<StagesProps>(undefined);

export const useStages = (): StagesProps => React.useContext<StagesProps>(StagesContext);

export const StagesContextConsumer = StagesContext.Consumer;

export const StagesContextProvider = (props: {
    children: React.ReactNode
}) => {
    const {socket, user} = useDevices();
    const [stageId, setStageId] = useState<{ stageId: StageId, groupId: GroupId }>();
    const {setRequest} = useRequest();

    // Prototypes
    const [stagePrototypes, setStagePrototypes] = useState<Server.StagePrototype[]>([]);
    const [groupPrototypes, setGroupPrototypes] = useState<Server.GroupPrototype[]>([]);
    const [groupMemberPrototypes, setGroupMemberPrototypes] = useState<Server.GroupMemberPrototype[]>([]);
    const [customGroupVolumes, setCustomGroupVolumes] = useState<Server.CustomGroupVolumePrototype[]>([]);
    const [customStageMemberVolumes, setCustomStageMemberVolumes] = useState<Server.CustomStageMemberVolumePrototype[]>([]);
    const {videoProducers, ovProducers, audioProducers} = useMediasoup();

    // Resolved Objects
    const [stage, setStage] = useState<Stage>();
    const [stages, setStages] = useState<Stage[]>([]);

    // Resolve stage objects
    useEffect(() => {
        const stages: Stage[] = stagePrototypes.map(stagePrototype => {
            const stage: Stage = {
                ...stagePrototype,
                isAdmin: user && stagePrototype.admins.indexOf(user._id) !== -1,
                groups: groupPrototypes.filter(groupPrototype => groupPrototype.stageId === stagePrototype._id).map(groupPrototype => {
                    const customVolume = customGroupVolumes.find(customGroupVolume => customGroupVolume.groupId === groupPrototype._id);
                    const group: Group = {
                        ...groupPrototype,
                        customVolume: customVolume ? customVolume.volume : undefined,
                        members: groupMemberPrototypes.map(groupMemberPrototype => {
                            const customVolume = customStageMemberVolumes.find(customStageMemberVolume => customStageMemberVolume.stageMemberId === groupMemberPrototype._id);
                            const member: GroupMember = {
                                ...groupMemberPrototype,
                                customVolume: customVolume ? customVolume.volume : undefined,
                                audioProducers: audioProducers.filter(producer => producer.userId === groupMemberPrototype.userId),
                                videoProducers: videoProducers.filter(producer => producer.userId === groupMemberPrototype.userId),
                                ovProducers: ovProducers.filter(producer => producer.userId === groupMemberPrototype.userId)
                            }
                            return member;
                        })
                    }
                    return group;
                })
            };
            return stage;
        })
        setStages(stages);
    }, [stagePrototypes, groupPrototypes, groupMemberPrototypes, customGroupVolumes, customStageMemberVolumes, videoProducers, audioProducers, ovProducers]);

    // Assign active stage
    useEffect(() => {
        if (stageId) {
            setStage(stages.find(stage => stage._id === stageId.stageId));
        } else {
            setStage(undefined);
        }
    }, [stageId, stages]);

    const registerDeviceEvents = (socket) => {
        socket.on(ServerStageEvents.STAGE_ADDED, (stage: Server.StagePrototype) => {
            console.log("stage-added");
            console.log(stage);
            setStagePrototypes(prevState => [...prevState, stage]);
        });
        socket.on(ServerStageEvents.STAGE_CHANGED, (payload: { id: StageId, stage: Server.StagePrototype }) => {
            console.log("stage-changed");
            console.log(payload);
            setStagePrototypes(prevState => prevState.map(s => {
                if (s._id === payload.id) {
                    console.log("Found stage");
                    return {...s, ...payload.stage};
                }
                return s;
            }))
        });
        socket.on(ServerStageEvents.STAGE_REMOVED, (stageId: string) => {
            console.log("stage-removed");
            console.log(stageId);
            setStagePrototypes(prevState => prevState.filter(stage => stage._id !== stageId));
        });
        socket.on(ServerStageEvents.GROUP_ADDED, (group: Server.GroupPrototype) => {
            console.log("group-added");
            console.log(group);
            setGroupPrototypes(prevState => [...prevState, group])
        });
        socket.on(ServerStageEvents.GROUP_CHANGED, (payload: { id: GroupId, group: Server.StageMemberPrototype }) => {
            console.log("group-changed");
            console.log(payload);
            setGroupPrototypes(prevState => prevState.map(s => s._id === payload.id ? {...s, ...payload.group} : s));
        });
        socket.on(ServerStageEvents.GROUP_REMOVED, (groupId: string) => {
            console.log("group-removed");
            console.log(groupId);
            setGroupPrototypes(prevState => prevState.filter(group => group._id !== groupId));
        });
        socket.on(ServerStageEvents.GROUP_MEMBER_ADDED, (stageMember: Server.GroupMemberPrototype) => {
            console.log("stage-member-added");
            console.log(stageMember);
            setGroupMemberPrototypes(prevState => [...prevState, stageMember])
        });
        socket.on(ServerStageEvents.GROUP_MEMBER_CHANGED, (payload: { id: StageMemberId, stageMember: Server.GroupMemberPrototype }) => {
            console.log("stage-member-changed");
            console.log(payload);
            setGroupMemberPrototypes(prevState => prevState.map(s => s._id === payload.id ? {...s, ...payload.stageMember} : s));
        });
        socket.on(ServerStageEvents.GROUP_MEMBER_REMOVED, (stageMemberId: string) => {
            console.log("stage-member-removed");
            console.log(stageMemberId);
            setGroupMemberPrototypes(prevState => prevState.filter(stageMember => stageMember._id !== stageMemberId));
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_VOLUME_ADDED, (customGroupVolume: Server.CustomGroupVolumePrototype) => {
            console.log("custom-group-volume-added");
            console.log(customGroupVolume);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomGroupVolumes(prevState => [...prevState, customGroupVolume]);
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_VOLUME_CHANGED, (customGroupVolume: Server.CustomGroupVolumePrototype) => {
            console.log("custom-group-volume-changed");
            console.log(customGroupVolume);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomGroupVolumes(prevState => prevState.map(s => s._id === customGroupVolume._id ? {...s, ...customGroupVolume} : s));
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_VOLUME_REMOVED, (id: CustomGroupVolumeId) => {
            console.log("custom-group-volume-removed");
            console.log(id);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomGroupVolumes(prevState => prevState.filter(customGroupVolume => customGroupVolume._id !== id));
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_MEMBER_VOLUME_ADDED, (customStageMemberVolume: Server.CustomStageMemberVolumePrototype) => {
            console.log("custom-stage-member-volume-added");
            console.log(customStageMemberVolume);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomStageMemberVolumes(prevState => [...prevState, customStageMemberVolume]);
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_MEMBER_CHANGED, (customStageMemberVolume: Server.CustomStageMemberVolumePrototype) => {
            console.log("custom-stage-member-volume-changed");
            console.log(customStageMemberVolume);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomStageMemberVolumes(prevState => prevState.map(s => s._id === customStageMemberVolume._id ? {...s, ...customStageMemberVolume} : s));
        });
        socket.on(ServerStageEvents.CUSTOM_GROUP_MEMBER_REMOVED, (id: CustomStageMemberVolumeId) => {
            console.log("custom-stage-member-volume-removed");
            console.log(id);
            // We don't need to filter by stage, since volumes are send for active stages only
            setCustomStageMemberVolumes(prevState => prevState.filter(customStageMemberVolume => customStageMemberVolume._id !== id));
        });
        socket.on(ServerStageEvents.STAGE_JOINED, (payload: { stageId: StageId, groupId: GroupId }) => setStageId(payload));
        socket.on(ServerStageEvents.STAGE_LEFT, () => setStageId(undefined));
        socket.on("disconnect", () => {
            setStages([]);
            setStagePrototypes([]);
            setGroupPrototypes([]);
            setGroupMemberPrototypes([]);
            setCustomGroupVolumes([]);
            setCustomStageMemberVolumes([]);
        });
    };
    useEffect(() => {
        if (socket) {
            registerDeviceEvents(socket);
        }
    }, [socket]);


    const createStage = useCallback((name: string, password: string, width?: number, length?: number, height?: number, reflection?: number, absorption?: number) => {
        console.log("here")
        console.log(socket)
        if (socket) {
            socket.emit(ClientStageEvents.ADD_STAGE, {
                name: name,
                password: password,
                width: width || 25,
                length: length || 13,
                height: height || 7.5,
                reflection: reflection || 0.7,
                absorption: absorption || 0.6,
            });
            console.log("ketu")
        }
    }, [socket]);

    const updateStage = useCallback((id: StageId, stage: Partial<Server.StagePrototype>) => {
        if (socket) {
            socket.emit(ClientStageEvents.CHANGE_STAGE, {
                id: id,
                stage: stage
            });
        }
    }, [socket]);

    const joinStage = useCallback((stageId: StageId, groupId: GroupId, password: string): Promise<void> => {
        if (socket) {
            const payload = {
                stageId: stageId,
                groupId: groupId,
                password: password || undefined
            }
            console.log(payload);
            return new Promise<void>((resolve, reject) => {
                socket.emit(ClientStageEvents.JOIN_STAGE, payload, (error) => {
                    console.log(error);
                    if (!error)
                        resolve();
                    else
                        reject(error);
                });
            })
        }
    }, [socket]);

    const leaveStage = useCallback(() => {
        if (socket) {
            socket.emit(ClientStageEvents.LEAVE_STAGE);
        }
        setRequest(undefined, undefined, null);
    }, [socket]);

    const removeStage = useCallback((id: StageId) => {
        if (socket) {
            socket.emit(ClientStageEvents.REMOVE_STAGE, id);
        }
    }, [socket]);

    const createGroup = useCallback((stageId: StageId, name: string) => {
        if (socket) {
            socket.emit(ClientStageEvents.ADD_GROUP, {
                stageId: stageId,
                name: name
            });
        }
    }, [socket]);

    const updateGroup = useCallback((id: GroupId, group: Partial<Server.GroupPrototype>) => {
        if (socket) {
            socket.emit(ClientStageEvents.CHANGE_GROUP, {
                id: id,
                group: group
            });
        }
    }, [socket]);

    const removeGroup = useCallback((id: GroupId) => {
        if (socket) {
            socket.emit(ClientStageEvents.REMOVE_GROUP, id);
        }
    }, [socket]);

    const updateStageMember = useCallback((id: StageMemberId, stageMember: Partial<Server.StageMemberPrototype>) => {
        if (socket) {
            socket.emit(ClientStageEvents.CHANGE_GROUP_MEMBER, {
                id: id,
                stageMember: stageMember
            });
        }
    }, [socket]);

    const setGroupVolume = useCallback((id: GroupId, volume: number) => updateGroup(id, {
        volume: volume
    }), [updateGroup]);


    const setStageMemberVolume = useCallback((id: StageMemberId, volume: number) => updateStageMember(id, {
        volume: volume
    }), [updateStageMember]);

    const setCustomGroupVolume = useCallback((id: string, volume: number) => {
        if (socket) {
            socket.emit("set-custom-group-volume", {
                id: id,
                volume: volume
            });
        }
    }, [socket]);

    const setCustomGroupMemberVolume = useCallback((id: string, volume: number) => {
        if (socket) {
            socket.emit("set-custom-stage-member-volume", {
                id: id,
                volume: volume
            });
        }
    }, [socket]);

    return (
        <StagesContext.Provider value={{
            stage,
            stageId,
            stages,
            createStage,
            joinStage,
            leaveStage,
            updateStage,
            removeStage,
            createGroup,
            updateGroup,
            removeGroup,
            updateStageMember,
            setGroupVolume,
            setStageMemberVolume,
            setCustomGroupVolume: setCustomGroupVolume,
            setCustomGroupMemberVolume: setCustomGroupMemberVolume
        }}>
            {props.children}
        </StagesContext.Provider>
    );
}