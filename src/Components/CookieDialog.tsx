import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ButtonStyled from './Form/Button';
import { useAuth } from '../hooks/useAuth';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CookieDialog() {
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (!auth.acceptedCookie && !auth.auth) {
            setTimeout(() => {
                setOpen(true)
            }, 3000)
        }
    }, [auth.acceptedCookie, auth.auth])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent'
                    },
                }}
                open={open}
                TransitionComponent={Transition}
                maxWidth="xs"
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div style={{ backgroundColor: "#282828", borderRadius: "4px" }}>
                    <DialogTitle style={{ color: "white" }}>{"Cookies and privacy"}</DialogTitle>

                    <DialogContent>
                        <DialogContentText style={{ color: "#828282" }}>
                            This website uses cookies to ensure you get the best experience on our website
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <a href="#" onClick={handleClose}>
                            <p style={{ color: "#897FE4" }} className="my-auto">More information</p>
                        </a>
                        <ButtonStyled
                            onClick={() => { auth.setAcceptedCookie(true); setOpen(false) }}
                            className="button-red"
                            text="Agree"
                        />
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}