import React, { useEffect } from 'react';
import { choir } from './CreateStageSecondStep';
import { AddUsersToGroupLayout } from '../../Components/StageCreate/AddUsersToGroupLayout';
import InviteUserModal from './InviteUserModal';

export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

export const InviteUsersStep = () => {
    const [open, setOpen] = React.useState(false);
    const [groupId, setGroupId] = React.useState<number>();
    const [users, setUsers] = React.useState<any>();


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
            <InviteUserModal open={open} handleClose={handleClose} groupId={groupId} onSave={(users: any) => setUsers(users)} />
            <h5 className="white mb-2">Add or invite users to your stage</h5>
            <h5 className="white">Invite digital stage groups</h5>
            <div className="d-flex flex-wrap">
                {choir.map((group: any) => <AddUsersToGroupLayout
                    group={group}
                    key={group.id}
                    onClick={() => { handleClickOpen(); setGroupId(group.id) }}
                    users={users}
                />
                )}
            </div>
        </div>
    )
}
