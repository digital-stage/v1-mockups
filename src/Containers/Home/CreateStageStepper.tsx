import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import ButtonStyled from '../../Components/Form/Button';
import Icons from '../../Components/Icons/Icons';


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(to right, #5D2950, #472B51, #81254E, #B61E4A, #DD1947)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
            'linear-gradient(to right, #5D2950, #472B51, #81254E, #B61E4A, #DD1947)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#777777',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#777777',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {},
});

function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
    // const iconNames = ["design-services", "group-preset-1", 'add-users', 'users', 'finish']

    const icons: { [index: string]: React.ReactElement } = {
        1: <Icons icon="design-services" width={24} height={24} fillColor="#fff" viewBox="0 0 24 24" />,
        2: <Icons icon="group-preset-1" width={18} height={15} fillColor="#fff" viewBox="0 0 17 15" />,
        3: <Icons icon="add-users" width={28} height={28} fillColor="#fff" viewBox="0 0 28 28" />,
        4: <Icons icon="users" width={24} height={24} fillColor="#fff" viewBox="0 0 24 24" />,
        5: <Icons icon="finish" width={24} height={24} fillColor="#fff" viewBox="0 0 24 24" />,
    };

    return (

        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            }, `icon${props.icon}`)}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& .MuiPaper-root': {
                backgroundColor: "transparent"
            },
            '& .MuiStepLabel-label': {
                color: "#777777"
            },
            '& .MuiStepLabel-label.MuiStepLabel-active, .MuiStepLabel-label.MuiStepLabel-completed': {
                color: "#fff"
            },
            '& .makeStyles-completed-35.icon1': {
                backgroundColor: "#5D2950 !important"
            },
            '& .makeStyles-completed-35.icon2': {
                backgroundColor: "#472B51"
            },
            '& .makeStyles-completed-35.icon3': {
                backgroundColor: "#81254E"
            },
            '& .makeStyles-completed-35.icon4': {
                backgroundColor: "#B61E4A"
            },
            '& .makeStyles-completed-35.icon5': {
                backgroundColor: "#DD1947"
            },
            '& .makeStyles-active-34.icon1': {
                backgroundColor: "#5D2950 !important"
            },
            '& .makeStyles-active-34.icon2': {
                backgroundColor: "#472B51"
            },
            '& .makeStyles-active-34.icon3': {
                backgroundColor: "#81254E"
            },
            '& .makeStyles-active-34.icon4': {
                backgroundColor: "#B61E4A"
            },
            '& .makeStyles-active-34.icon5': {
                backgroundColor: "#DD1947"
            },
            '& .MuiStepper-root':{
                padding:"0px"
            }
        },
        button: {
            marginRight: theme.spacing(2),
        },
        instructions: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
            color: "#fff",
            textAlign: "center"
        },
    }),
);

function getSteps() {
    return ['Add information', 'Select preset', 'Invite users', 'Assing roles', 'Create stage'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return 'Add information';
        case 1:
            return 'Select preset';
        case 2:
            return 'Invite user';
        case 3:
            return 'Assign roles';
        case 4:
            return 'Create stage';
        default:
            return 'Unknown step';
    }
}

export default function CustomizedSteppers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector  style={{backgroundColor:"red"}}/>}>
                {steps.map((label, i) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div className="text-center">
                        <Typography className={classes.instructions}>
                            Stage has been successfully created!
                        </Typography>
                        <ButtonStyled
                            className="button-white"
                            text="Create another stage"
                            type="submit"
                            onClick={handleReset}
                        />
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div className="text-center">
                                <ButtonStyled
                                    className="button-white"
                                    text="Back"
                                    type="submit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                />
                                <ButtonStyled
                                    className="button-red ml-2"
                                    text={activeStep === steps.length - 1 ? 'Save' : 'Next'}
                                    type="submit"
                                    onClick={handleNext}
                                />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
