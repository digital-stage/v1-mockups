import React, { MouseEventHandler } from 'react';
import Icons from '../Icons/Icons';
import { Group } from '../../Containers/Home/CreateStageSecondStep';
import { Add } from '@material-ui/icons';
import { Fab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        '& .MuiButtonBase-root:active': {
            outline: "0 !important"
        },
        '& .MuiButtonBase-root:focus': {
            outline: "0 !important"
        }
    }
});

export const AddUsersToGroupLayout = (props: {
    group: Group,
    handleGroupDelete?: MouseEventHandler | undefined,
    onClick?: MouseEventHandler | undefined,
    users: any
}) => {
    const { group: {
        name,
        color,
        icon
    }, onClick, users } = props
    const classes = useStyles();
    return (
        <div
            className={["text-center", "p-2", classes.root].join(" ")}
            style={{
                minWidth: "calc(100% / 3)"
            }}
        >
            <div
                style={{
                    border: `1px solid ${color}`,
                    borderRadius: "10px",
                    minHeight: "140px"
                }}
            >
                <Icons
                    icon={icon}
                    width={40}
                    height={40}
                    className="d-inline-block"
                />
                <p className="mb-4 mt-1 white d-inline-block">{name}</p>
                {users && users.length > 0 && users.map((user: any) => {
                    return <p className="mb-4 mt-1 white d-inline-block" key={user.name}>{user.name}</p>
                })}
            </div>
            <Fab
                color="secondary"
                aria-label="add"
                size="small"
                style={{
                    marginTop: "-30px",
                    backgroundColor: "#F20544",
                    cursor: "pointer"
                }}>
                <Add onClick={onClick} />
            </Fab>
        </div>
    )
}