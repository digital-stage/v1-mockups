import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CreateStageStepper from './CreateStageStepper';

const useStyles = makeStyles({
    root: {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    paper: {
        textTransform: 'initial',
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
                // onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
            >
                <div className="text-right white p-0 pr-2 pt-2" onClick={() => props.handleClose(false)}><CloseIcon style={{ cursor: "pointer" }} /></div>
                <DialogContent>
                    <CreateStageStepper />
                </DialogContent>
            </Dialog>
        </div>
    );
}