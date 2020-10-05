import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import Stage from '../../assets/images/stage.png';
import Icons from '../../Components/Icons/Icons';
import { choir } from './CreateStageSecondStep';


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
    const [inputLength, setInputLength] = React.useState<number>(0)
    const [invitation, setInvitation] = React.useState<string>("");
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLength(e.target.value.length);
        setInvitation(e.target.value)
    }

    return (
        <div className={classes.root}>
            <div className="my-1 mx-3 text-left">
                <h5 className="white my-3">Send out invitations and start your digital stage!</h5>
                <div className="d-flex my-4">
                    <div className="w-100 text-center">
                        <img
                            className="mx-auto"
                            src={Stage}
                            width={80}
                            height={80}
                            alt="stage"
                            style={{
                                borderRadius: "50%", objectFit: "cover",
                                objectPosition: "50% 50%"
                            }}
                        />
                        <h5 className="white my-2 mx-auto">Test stage</h5>
                    </div>
                    <div className="w-100">
                        <h5 className="white mb-2">News</h5>
                        <h6 className="white mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque possimus sequi perspiciatis nostrum autem! Consectetur!</h6>
                    </div>
                </div>
                <h5 className="white mx-2 my-3">Groups</h5>
                <div className="d-flex flex-wrap justify-content-around my-3">
                    {choir.map(group => {
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
                <div className="p-4" style={{ backgroundColor: "#333232", borderRadius: "11px", width:"90%" }}>
                    <TextField
                        InputProps={{
                            className: classes.input
                        }}
                        style={{ width: "90%" }}
                        multiline={true}
                        name="invitation"
                        inputProps={{ maxLength: 120 }}
                        rowsMax={5}
                        id="standard-helperText"
                        label="Invitation text"
                        helperText={`${inputLength}/120`}
                        value={invitation}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}
