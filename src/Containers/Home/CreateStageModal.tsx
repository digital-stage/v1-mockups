import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ButtonStyled from '../../Components/Form/Button';
import CreateStageStepper from './CreateStageStepper';

const useStyles = makeStyles({
    root: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    paper: {
        textTransform: 'capitalize',
        backgroundColor: "#2A2A2A"
    },
});


export default function CreateStageModal(props: { open: boolean, handleClose(open: boolean): void }) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
            >
                <DialogTitle id="responsive-dialog-title" className="text-right white"><CloseIcon /></DialogTitle>
                <DialogContent>
                    <CreateStageStepper/>
                </DialogContent>
                {/* <DialogActions className="justify-content-center">
                    <ButtonStyled
                        className="button-white"
                        text="Back"
                        type="submit"
                    />
                    <ButtonStyled
                        className="button-red ml-2"
                        text="Next"
                        type="submit"
                    />
                </DialogActions> */}
            </Dialog>
        </div>
    );
}