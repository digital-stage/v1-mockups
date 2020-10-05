import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Slide, Chip, makeStyles, TextField } from '@material-ui/core';
import ButtonStyled from '../../Components/Form/Button';
import Icons from '../../Components/Icons/Icons';
import ColorPicker  from '../../Components/StageCreate/ColorPicker';
import IconPicker from '../../Components/StageCreate/IconPicker';
import { Group } from './CreateStageSecondStep';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            '& .MuiInput-underline:after': {
                borderBottomColor: (nameError: boolean) => !nameError ? '#C5C5C5' : "#f44336",
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: (nameError: boolean) => !nameError ? '#fff' : "#f44336",
            },
        },
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        '& label.Mui-focused': {
            color: (nameError: boolean) => !nameError ? 'white' : "#f44336",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: (nameError: boolean) => !nameError ? '#C5C5C5' : "#f44336",
        },
        '& label.MuiFormLabel-root': {
            color: (nameError: boolean) => !nameError ? '#C5C5C5' : "#f44336",
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: (nameError: boolean) => !nameError ? '#fff' : "#f44336",
        },
        '& .MuiInput-underline': {
            borderBottomColor: (nameError: boolean) => !nameError ? '#fff' : "#f44336",
        },
        '& .MuiFormHelperText-root': {
            color: (nameError: boolean) => !nameError ? '#C5C5C5' : "#f44336",
            textAlign: "right"
        }
    },
    paper: {
        textTransform: 'initial',
        backgroundColor: "#4B4B4B"
    },
    input: {
        background: "transparent",
        color: "white",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
    }
});

const modalTransition = React.forwardRef(function Transition(
    props: { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export enum Tabs {
    COLORS = "color",
    ICONS = "icons"
}

export enum ColorChipsEnum {
    ALL = "All",
    CONTRAST = "Contrast",
    PASTEL = "Pastel",
}

export enum IconChipsEnum {
    ALL = "All",
    CHOIR = "Choir",
    ORCHESTRA = "Orchestra",
    BAND = "Band",
    THEATRE = "Theatre",
    DANCE = "Dance",
    INSTRUMENTS = "Instruments",
    MISC = "Misc"
}

const ColorChips = [ColorChipsEnum.ALL, ColorChipsEnum.CONTRAST, ColorChipsEnum.PASTEL];
const IconChips = [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.THEATRE, IconChipsEnum.DANCE, IconChipsEnum.INSTRUMENTS, IconChipsEnum.MISC]

export default function CreateEditGroup(props: {
    group?: Group | null,
    open: boolean,
    handleClose: () => void,
    saveGroup: (color: string, icon: string, name: string) => void
}) {
    const [selected, setSelected] = React.useState<string>(Tabs.COLORS)
    const [nameLength, setNameLength] = React.useState<number>(0)
    const [name, setName] = React.useState<string>("")
    const [selectedColor, setColor] = React.useState<string>("#BFBFBF")
    const [selectedIcon, setIcon] = React.useState<string>("choir-tenor")
    const [colorChipSelected, setColorChipSelected] = React.useState<string>(ColorChipsEnum.ALL)
    const [iconChipSelected, setIconChipSelected] = React.useState<string>(IconChipsEnum.ALL)
    const [nameError, setNameError] = React.useState<boolean>(false);
    const classes = useStyles(nameError);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name)
            setNameError(false)
        else
            setNameError(true)
        setNameLength(e.target.value.length);
        setName(e.target.value);
    }

    const handleTabSelection = (tab: string) => {
        return () => setSelected(tab)
    }

    const handleColorChipSelection = (chip: string) => {
        return () => setColorChipSelected(chip)
    }

    const handleIconChipSelection = (chip: string) => {
        return () => setIconChipSelected(chip)
    }

    const handleSetColor = (color:string) => {
        setColor(color)
    }

    const handleSetIcon = (icon:string) => {
        setIcon(icon)
    }

    const handleCancel = () => {
        props.handleClose()
        reset()
    }

    const handleSave = () => {
        if (name.length <= 0)
            setNameError(true)
        else props.saveGroup(selectedColor, selectedIcon, name);
    }

    const reset = () => {
        setColor("#BFBFBF");
        setIcon("choir-tenor");
        setSelected(Tabs.COLORS);
        setName("")
    }


    useEffect(() => {
        const arrangeColor = props.group ? props.group.color : selectedColor ? selectedColor : "#BFBFBF"
        setColor(arrangeColor)
        const arrangeIcon = props.group ? props.group.icon : selectedIcon ? selectedIcon : "choir-tenor"
        setIcon(arrangeIcon)
        props.group && props.group.name && setName(props.group.name)
        setNameLength(name.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.group])

    return (
        <div>
            <Dialog
                maxWidth="xs"
                open={props.open}
                TransitionComponent={modalTransition}
                keepMounted={true}
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div className="d-flex">
                        <div className="w-100">
                            <h6 className="white mt-2 mb-5">Edit Group</h6>
                            <Icons
                                className="ml-3"
                                icon={selectedIcon}
                                type="circled"
                                circleColor={selectedColor}
                                width={120}
                                height={120}
                                style={{
                                    boxShadow: "0px 5px 30px #3C3C3C",
                                    borderRadius: "50%"
                                }}
                            />
                            <TextField
                                InputProps={{
                                    className: classes.input,
                                }}
                                inputProps={{ maxLength: 16 }}
                                className="mt-5 mb-3"
                                id="standard-helperText"
                                label="Group name"
                                helperText={name ? `${nameLength}/16` : nameError ? "Enter name" : `${nameLength}/16`}
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-100">
                            {/* Colors/Icons tabs */}
                            <div className="d-flex">
                                <h6
                                    className="mr-4"
                                    style={{
                                        color: selected === Tabs.COLORS ? "white" : "#979797",
                                        borderBottom: selected === Tabs.COLORS ? "1px solid white" : "",
                                        cursor: "pointer",
                                        padding: "10px"
                                    }}
                                    onClick={handleTabSelection(Tabs.COLORS)}
                                >
                                    Colors
                                    </h6>
                                <h6
                                    style={{
                                        color: selected === Tabs.ICONS ? "white" : "#979797",
                                        borderBottom: selected === Tabs.ICONS ? "1px solid white" : "",
                                        cursor: "pointer",
                                        padding: "10px"
                                    }}
                                    onClick={handleTabSelection(Tabs.ICONS)}
                                >
                                    Icons
                                    </h6>
                            </div>
                            {/* Colors content */}
                            {selected === Tabs.COLORS && <div>
                                {ColorChips.map(chip => {
                                    return <Chip
                                        key={chip}
                                        size="small"
                                        label={chip}
                                        className="ml-1 mt-2"
                                        onClick={handleColorChipSelection(chip)}
                                        style={{
                                            backgroundColor: colorChipSelected === chip ? "white" : "#BFBFBF",
                                            padding: "2px 5px",
                                            fontSize: "12px"
                                        }}
                                    />
                                })}
                                <ColorPicker
                                    onClick={handleSetColor}
                                    selectedChip={colorChipSelected}
                                    selectedColor={selectedColor}
                                />
                            </div>}
                            {/* Icons content */}
                            {selected === Tabs.ICONS && <div>
                                {IconChips.map(chip => {
                                    return <Chip
                                        key={chip}
                                        size="small"
                                        label={chip}
                                        className="mr-1 mt-2"
                                        style={{
                                            backgroundColor: iconChipSelected === chip ? "white" : "#BFBFBF",
                                            padding: "2px 5px",
                                            fontSize: "12px"
                                        }}
                                        onClick={handleIconChipSelection(chip)}
                                    />
                                })}
                                <div className="icons-list" style={{ maxHeight: "180px", overflowY: "auto" }}>
                                    <IconPicker
                                        onClick={handleSetIcon}
                                        selectedChip={iconChipSelected}
                                        selectedIcon={selectedIcon}
                                    />
                                </div>
                            </div>}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <ButtonStyled
                        className="button-white"
                        text="Cancel"
                        onClick={handleCancel}
                    />
                    <ButtonStyled
                        className="button-red"
                        text="Save"
                        onClick={handleSave}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}