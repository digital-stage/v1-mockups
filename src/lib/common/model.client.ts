import {
    CustomGroupVolumeId,
    CustomStageMemberVolumeId,
    GroupId,
    GroupMemberId,
    Producer,
    StageId,
    StageMemberId,
    UserId
} from "./model.common";

namespace Server {
    export interface StagePrototype {
        _id: StageId;
        name: string;

        password: string | null;

        admins: UserId[];

        // 3D Room specific
        width: number;
        length: number;
        height: number;
        absorption: number;
        reflection: number;
    }

    export interface GroupPrototype {
        _id: GroupId;
        name: string;
        stageId: StageId;
        volume: number;
    }

    export interface StageMemberPrototype {
        _id: StageMemberId;
        stageId: StageId;
        groupId: GroupId;
        userId: UserId;
        isDirector: boolean;
        volume: number;
        x: number;
        y: number;
        z: number;
    }

    export interface CustomGroupVolumePrototype {
        _id: CustomGroupVolumeId;
        userId: UserId;
        stageId: StageId;
        groupId: GroupId;
        volume: number;
    }

    export interface CustomStageMemberVolumePrototype {
        _id: CustomStageMemberVolumeId;
        userId: UserId;
        stageMemberId: StageMemberId;
        volume: number;
    }

    export interface GroupMemberPrototype extends StageMemberPrototype {
        _id: GroupMemberId;
        name: string;
        avatarUrl?: string;
    }
}

export interface Stage extends Server.StagePrototype {
    isAdmin: boolean;
    groups: Group[];
}

export interface Group extends Server.GroupPrototype {
    customVolume?: number;
    members: GroupMember[];
}

export interface GroupMember extends Server.GroupMemberPrototype {
    customVolume?: number;
    videoProducers: Producer[];
    audioProducers: Producer[];
    ovProducers: Producer[];
}

export default Server;