import { makeStyles, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import Stage from '../../assets/images/stage.png';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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

export interface IStageInfo {
    name: string;
    info?: string;
    news?: string;
}

export const AddInformatinStep = (props: {
    emptyField: (name: string) => void,
    error: boolean
}) => {
    const [inputLength, setInputLength] = React.useState<{ name: number, info: number, news: number }>({ name: 0, info: 0, news: 0 })
    const [nameEmpty, setNameEmpty] = React.useState<boolean>(false);
    const [showImageUpload, setShowImageUpload] = React.useState<boolean>(false)
    const [image, setImage] = React.useState<string>(Stage)
    const [stageInfo, setStageInfo] = React.useState<IStageInfo>({ name: "Test Stage" });

    const uplodImage = React.createRef<HTMLInputElement>();
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameEmpty(false)
        setInputLength({ ...inputLength, [e.target.name]: e.target.value.length });
        setStageInfo({ ...stageInfo, [e.target.name]: e.target.value })
    }

    // const styles = {
    //     input: {
    //         borderBottom: nameEmpty ? "1px solid #F20544" : "0"
    //     }
    // }

    const onClick = () => {
        const node = uplodImage.current;
        if (node) {
            node.click()
        }
    };

    const handleChangeImage = (e: any) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setImage(file)
    }

    useEffect(() => {
        props.emptyField(stageInfo.name)
        setNameEmpty(props.error)
    }, [stageInfo, props])

    return (
        <div className={classes.root}>
            <div className="my-1 mx-3 text-left">
                <h5 className="white">Tell us about your stage</h5>
                <div className="d-flex">
                    <div className="w-100 mt-4">
                        <div
                            onMouseLeave={() => setShowImageUpload(false)}
                            style={{
                                position: "relative",
                                maxWidth: "fit-content"
                            }}
                        >
                            {showImageUpload &&
                                <>
                                    <PhotoCameraIcon style={{
                                        position: "absolute",
                                        zIndex: 999,
                                        top: "18%",
                                        left: "23%",
                                        width: "100px",
                                        height: "100px"
                                    }}
                                        onClick={onClick}
                                    />
                                    <input
                                        type="file"
                                        ref={uplodImage}
                                        onChange={handleChangeImage}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                </>
                            }
                            <img
                                className="ml-3"
                                src={image}
                                width={140}
                                height={140}
                                alt="stage"
                                style={{
                                    borderRadius: "50%", objectFit: "cover",
                                    objectPosition: "50% 50%"
                                }}
                                onMouseOver={() => setShowImageUpload(true)}
                            />
                        </div>
                        <span id="validation-outlined-input">
                            <TextField
                                InputProps={{
                                    className: classes.input
                                }}
                                required
                                error={nameEmpty}
                                inputProps={{ maxLength: 16 }}
                                className="mt-5 mb-3"
                                label="Stage name"
                                name="name"
                                helperText={`${inputLength.name}/16`}
                                value={stageInfo.name}
                                style={{ width: "90%" }}
                                onChange={handleChange}
                            /></span>
                    </div>
                    <div className="w-100">
                        <h6 className="my-1">Info</h6>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            style={{ width: "100%" }}
                            multiline
                            name="info"
                            inputProps={{ maxLength: 120 }}
                            rowsMax={5}
                            id="standard-helperText"
                            label="Tell us about your stage"
                            helperText={`${inputLength.info}/120`}
                            value={stageInfo.info}
                            onChange={handleChange}
                        />
                        <h6 className="mt-2">News</h6>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            multiline
                            rowsMax={5}
                            name="news"
                            style={{ width: "100%" }}
                            inputProps={{ maxLength: 120 }}
                            id="standard-helperText"
                            label="A place for dates and updates"
                            helperText={`${inputLength.news}/120`}
                            value={stageInfo.news}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
