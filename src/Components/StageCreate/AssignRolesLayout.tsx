import React from 'react';
import AddIcon from '@material-ui/icons/Add';
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

export const AssignRolesLayout = (props: {
    role: string
}) => {
    const { role } = props
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
                    border: `1px solid #F20544`,
                    borderRadius: "10px",
                    minHeight: "140px"
                }}
            >
                <p className="mb-4 mt-1 white d-inline-block">{role}</p>
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
                <AddIcon />
            </Fab>
        </div>
    )
}