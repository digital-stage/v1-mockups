import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import Icons from '../../Components/Icons/Icons';
import { useCreateStage } from '../../hooks/useCreateStage';
import { Group } from '../../js/CreateStageUtils';


const useStyles = makeStyles({
    root: {
        '&:hover': {
            '& .MuiInput-underline:after': {
                borderBottomColor: '#C5C5C5',
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: '#fff',
            },
        },
        '& #validation-outlined-input .MuiFormLabel-root.Mui-error': {
            color: '#f44336',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#C5C5C5',
        },
        '& label.MuiFormLabel-root': {
            color: '#C5C5C5',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff',
        },
        '& .MuiInput-underline': {
            borderBottomColor: '#fff',
        },
        '& .MuiFormHelperText-root': {
            color: '#C5C5C5',
            textAlign: "right"
        },
        '& .MuiInputLabel-root': {
            color: "white",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: 600,
        }
    },
    paper: {
        textTransform: 'initial',
        backgroundColor: "#4B4B4B"
    },
    input: {
        background: "transparent",
        color: "white",
        fontFamily: "Open sans",
        fontSize: "12px",
        fontWeight: "initial",
    }
});

export const CreateStageStep = () => {
    const { info, image, stageGroups, preset } = useCreateStage();
    const [inputLength, setInputLength] = React.useState<number>(0)
    const [invitationText, setInvitationText] = React.useState<string>("");
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLength(e.target.value.length);
        setInvitationText(e.target.value)
    }

    return (
        <div className={classes.root}>
            <div className="my-1 mx-3 text-left create-stage">
                <h5 className="white my-3">Send out invitations and start your digital stage!</h5>
                <div className="d-flex my-4">
                    <div className="w-100 text-center">
                        <img
                            className="mx-auto stage-image"
                            src={image}
                            width={80}
                            height={80}
                            alt="stage"
                        />
                        <h5 className="white my-2 mx-auto">{info.name}</h5>
                    </div>
                    <div className="w-100">
                        {info.news ? <><h5 className="white mb-2">News</h5>
                            <h6 className="white mb-2">{info.news}</h6></> : null}
                    </div>
                </div>
                <h5 className="white mx-2 my-3">Groups</h5>
                <div className="d-flex flex-wrap justify-content-around my-3">
                    {stageGroups[preset].map((group: Group) => {
                        return (
                            <div className="d-flex flex-column my-2" key={group.id}>
                                <Icons
                                    icon={group.icon}
                                    type="circled"
                                    circleColor={group.color}
                                    width={40}
                                    height={40}
                                    className="mx-auto"
                                />
                                <h6 className="white mx-auto mt-2">{group.name}</h6>
                            </div>
                        )
                    })}
                </div>
                <h5 className="white mx-2">Invitation:</h5>
                <div className="p-4 invitation-container">
                    <TextField
                        InputProps={{
                            className: classes.input
                        }}
                        multiline={true}
                        className="invitation-text-field"
                        name="invitation"
                        inputProps={{ maxLength: 120 }}
                        rowsMax={5}
                        id="standard-helperText"
                        label="Invitation text"
                        helperText={`${inputLength}/120`}
                        value={invitationText}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}
