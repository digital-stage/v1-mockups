import React, { useEffect } from 'react';
import { User, Group } from '../../js/CreateStageUtils';
import { AddUsersToGroupLayout } from '../../Components/StageCreate/AddUsersToGroupLayout';
import InviteUserModal from './InviteUserModal';
import { useCreateStage } from '../../hooks/useCreateStage';

export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

export const InviteUsersStep = () => {
    const { stageGroups, preset } = useCreateStage();
    const [open, setOpen] = React.useState(false);
    const [groupId, setGroupId] = React.useState<number>();
    const [users, setUsers] = React.useState<User[]>([]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGroupId(1)
    };

    const handleOnClick = (id: number) => {
        return () => {
            handleClickOpen();
            setGroupId(id)
        }
    }

    const handleSaveUsers = (selectedUsers: User[]) => setUsers(selectedUsers)

    useEffect(()=>{
        console.log(stageGroups, preset ,stageGroups[preset] )
    })

    return (
        <div className="my-1 mx-3 text-left">
            <InviteUserModal
                open={open}
                handleClose={handleClose}
                groupId={groupId}
                onSave={handleSaveUsers}
            />
            <h5 className="white mb-2">Add or invite users to your stage</h5>
            <h5 className="white">Invite digital stage groups</h5>
            <div className="d-flex flex-wrap">
                {stageGroups[preset].map((group: Group) => <AddUsersToGroupLayout
                    group={group}
                    key={group.id}
                    onClick={handleOnClick(group.id)}
                    users={users}
                />
                )}
            </div>
        </div>
    )
}
