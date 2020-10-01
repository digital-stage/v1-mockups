import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import ButtonStyled from '../../Components/Form/Button';
import Icons from '../../Components/Icons/Icons';
import { CreateStageSuccessStep } from './CreateStageSuccessStep';
import { CreateStagePresetStep } from './CreateStagePresetStep';
import { AddInformatinStep } from './AddInformationStep';
import { InviteUsersStep } from './InviteUsersStep';


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(to right, #472B51, #81254E, #B61E4A)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(to right, #472B51, #81254E, #B61E4A)',
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
        '&.icon1': {
            backgroundColor: "#5D2950 !important"
        },
        '&.icon2': {
            backgroundColor: "#472B51"
        },
        '&.icon3': {
            backgroundColor: "#81254E"
        },
        '&.icon4': {
            backgroundColor: "#B61E4A"
        },
        '&.icon5': {
            backgroundColor: "#DD1947"
        },
    },
    completed: {
        '&.icon1': {
            backgroundColor: "#5D2950 !important"
        },
        '&.icon2': {
            backgroundColor: "#472B51"
        },
        '&.icon3': {
            backgroundColor: "#81254E"
        },
        '&.icon4': {
            backgroundColor: "#B61E4A"
        },
        '&.icon5': {
            backgroundColor: "#DD1947"
        },
    },
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
                backgroundColor: "transparent",
            },
            '& .MuiStepLabel-label': {
                color: "#777777"
            },
            '& .MuiStepLabel-label.MuiStepLabel-active, .MuiStepLabel-label.MuiStepLabel-completed': {
                color: "#fff"
            },
            '& .MuiStepper-root': {
                padding: "0px"
            }
        },
        button: {
            marginRight: theme.spacing(2),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            color: "#fff",
            textAlign: "center",
            maxHeight: "53vh",
            overflowY: "auto"
        },
    }),
);

function getSteps() {
    return ['Add information', 'Select preset', 'Invite users', 'Assing roles', 'Create stage'];
}


export default function CustomizedSteppers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = React.useState<boolean>(false);
    const [emptyField, setEmptyField] = React.useState<string>("");
    const steps = getSteps();


    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddInformatinStep
                    emptyField={(emptyField: string) => setEmptyField(emptyField)}
                    error={error} />;
            case 1:
                return <CreateStagePresetStep />;
            case 2:
                return <InviteUsersStep />;
            case 3:
                return 'Assign roles';
            case 4:
                return 'Create stage';
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const checkStep = () => {
        if (emptyField.length > 0) {
            handleNext()
            setError(false)
        }
        else {
            setError(true)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector style={{ backgroundColor: "red" }} />}>
                {steps.map((label, i) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div className="text-center">
                        <CreateStageSuccessStep />
                        <ButtonStyled
                            className="button-white"
                            text="Close"
                            type="submit"
                            onClick={handleReset}
                        />
                        <ButtonStyled
                            className="button-red ml-3"
                            text="Start stage"
                            type="submit"
                        />
                    </div>
                ) : (
                        <div>
                            <div className={[classes.instructions, 'step-content'].join(' ')}>{getStepContent(activeStep)}</div>
                            <div className="text-center">
                                {activeStep > 0 && <ButtonStyled
                                    className="button-white"
                                    text="Back"
                                    type="submit"
                                    // disabled={activeStep === 0}
                                    onClick={handleBack}
                                />}
                                <ButtonStyled
                                    className="button-red ml-2"
                                    text={activeStep === steps.length - 1 ? 'Send invitation' : 'Next'}
                                    type="submit"
                                    onClick={checkStep}
                                />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
