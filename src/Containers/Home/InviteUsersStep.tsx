import React, { useEffect } from 'react';
import {choir} from './SelectPresetStep';
import { AddUsersToGroupLayout } from './AddUsersToGroupLayout';
import InviteUserModal from './InviteUserModal';

export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

export const InviteUsersStep = () => {
    const [open, setOpen] = React.useState(false);
    const [groupId, setGroupId] = React.useState<number>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGroupId(1)
    };

    useEffect(() => {
    }, [])

    return (
            <div className="my-1 mx-3 text-left">
                <InviteUserModal open={open} handleClose={handleClose} groupId={groupId}/>
                <h5 className="white mb-2">Add or invite users to your stage</h5>
                <h5 className="white">Invite digital stage groups</h5>
                <div className="d-flex flex-wrap">
                {choir.map((group: any) => <AddUsersToGroupLayout
                    group={group}
                    key={group.id}
                    onClick={() => { handleClickOpen(); setGroupId(group.id) }}
                />
                )}
                </div>
            </div>
    )
}
