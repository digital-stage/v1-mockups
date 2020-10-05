import React from 'react';
// import InviteUserModal from './InviteUserModal';
import { AssignRolesLayout } from '../../Components/StageCreate/AssignRolesLayout';

export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

const roles = ["Owner", "Admin", "Tech"]

export const AssignRolesStep = () => {
    // const [open, setOpen] = React.useState(false);
    // const [groupId, setGroupId] = React.useState<number>();


    // const handleClose = () => {
    //     setOpen(false);
    //     setGroupId(1)
    // };

    // useEffect(() => {
    // }, [])

    return (
        <div className="my-1 mx-3 text-left">
            {/* <InviteUserModal 
                open={open} 
                handleClose={handleClose} 
                groupId={groupId}
                /> */}
            <h5 className="white mb-2">Assign roles</h5>
            <div className="d-flex flex-wrap">
                {roles.map((role: string, i) =>
                    <AssignRolesLayout
                        key={i}
                        role={role}
                    />
                )}
            </div>
        </div>
    )
}
