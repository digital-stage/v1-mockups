import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { InputAdornment, makeStyles } from '@material-ui/core';
import ButtonStyled from '../../Components/Form/Button';
import Icons from '../../Components/Icons/Icons';
import { choir, Group, User } from './CreateStageSecondStep';
import Input from "../../Components/Form/Input";
import SearchIcon from '@material-ui/icons/Search';
import AvatarImg from "../../assets/images/Avatar.png";
import ClearIcon from '@material-ui/icons/Clear';




const useStyles = makeStyles({
    root: {
    },
    paper: {
        textTransform: 'initial',
        backgroundColor: "#4B4B4B",
        maxHeight: "none",
        maxWidth: "none"
    },
    input: {
        background: "transparent",
        color: "white",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
    }
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export enum Tabs {
    USERNAME = "Username",
    EMAIL = "Email"
}

const recentUsers: User[] = [
    {
        id: 1,
        name: "Brad Daniels",
        email: "brad@gmail.com"
    },
    {
        id: 2,
        name: "Felix Daniels",
        email: "brad@gmail.com"
    },
    {
        id: 3,
        name: 'Amy Taylor',
        email: 'amy@gmail.com',
    },
    {
        id: 4,
        name: 'Michael Jones',
        email: 'michael@gmail.com',
    },
    {
        id: 5,
        name: 'Jennifer Wu',
        email: 'jennifer@gmail.com',
    },]

export default function InviteUserModal(props: {
    group?: Group | null,
    open: boolean,
    handleClose: any,
    InputProps?: any,
    saveGroup?: any
    groupId: any
}) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string>(Tabs.USERNAME)
    const [group, SetGroup] = React.useState<any>(choir[0])
    const [users, SetUsers] = React.useState(recentUsers)
    const [selectedUsers, setSelectedUsers] = React.useState<any>([])
    const [emails, setEmails] = React.useState<any>([])

    const reset = () => {
        SetGroup(choir[0]);
        SetUsers(recentUsers);
        setSelectedUsers([]);
        setEmails([]);
        setSelected(Tabs.USERNAME)
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const user = recentUsers.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
        SetUsers(user)
    }

    const handleUserAdd = (id: number) => {
        const user: any = recentUsers.filter((user: any) => user.id === id);
        const recent = users.filter(user => user.id !== id);
        SetUsers(recent);
        setSelectedUsers([...selectedUsers, user[0]])
    }

    const handleUserRemove = (id: number) => {
        const user: any = recentUsers.filter(user => user.id === id);
        const recent = selectedUsers.filter((user: any) => user.id !== id);
        setSelectedUsers(recent);
        SetUsers([...users, user[0]])
    }

    const searchEmails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emails = e.target.value
        setEmails(emails)
        console.log(emails);
    }

    const addEmails = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const emailArray = emails.split(';');
            const emailObject = emailArray.map((email: string) => { return { email: email } })
            setSelectedUsers([...selectedUsers, ...emailObject])
        }
    }

    useEffect(() => {
        const group = choir.filter(group => group.id === props.groupId)
        console.log(group)
        SetGroup(group)
    }, [props.groupId])

    return (
        <div>
            <Dialog
                // maxWidth="xs"
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="w-100">
                            <div className="d-flex">
                                <h6
                                    className="mr-4"
                                    style={{
                                        color: selected === Tabs.USERNAME ? "white" : "#979797",
                                        borderBottom: selected === Tabs.USERNAME ? "1px solid white" : "",
                                        cursor: "pointer",
                                        padding: "10px"
                                    }}
                                    onClick={() => setSelected(Tabs.USERNAME)}
                                >
                                    Username
                                    </h6>
                                <h6
                                    style={{
                                        color: selected === Tabs.EMAIL ? "white" : "#979797",
                                        borderBottom: selected === Tabs.EMAIL ? "1px solid white" : "",
                                        cursor: "pointer",
                                        padding: "10px"
                                    }}
                                    onClick={() => setSelected(Tabs.EMAIL)}
                                >
                                    Email
                                    </h6>
                            </div>
                            {selected === Tabs.USERNAME &&
                                <div className="select-user" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                                    <div className="d-flex">
                                        <div className="w-100 mx-4 my-0">
                                            <div className="d-flex flex-column">
                                                <Input
                                                    required
                                                    name="text"
                                                    context="group"
                                                    placeholder="Search for users"
                                                    type="text"
                                                    id="text"
                                                    onInputChange={search}
                                                    InputProps={{
                                                        endAdornment:
                                                            <InputAdornment position="end">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                    }}
                                                />
                                                <div style={{
                                                    backgroundColor: "#2A2A2A",
                                                    borderRadius: "0 0 24px 24px",
                                                    marginTop: "-20px",
                                                    boxShadow: "0px 3px 17px #000000"
                                                }}>
                                                    <p className="mt-3 pt-3 px-3">Click on results to invite users to your stage group</p>
                                                </div>
                                            </div>
                                            <h6 className="white my-3">Recent users</h6>
                                            {users.map((user: User) => {
                                                return <div
                                                    className="d-flex py-2 px-1 ml-3"
                                                    style={{
                                                        borderBottom: "1px solid #3D3D3D",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => handleUserAdd(user.id)}
                                                >
                                                    <img className="mr-2 my-auto" src={AvatarImg} alt={user.name} width="24px" height="24px" />
                                                    <span className="mr-2" >
                                                        <h6 className="white m-0">{user.name}</h6>
                                                        <p className="m-0">{user.email}</p>
                                                    </span>
                                                </div>
                                            })}
                                        </div>
                                        {group.length > 0 ? <div className="w-100 mx-4 pr-4  pb-2 mt-3 text-left" style={{ border: `2px solid ${group[0].color}`, borderRadius: "24px" }}>
                                            <Icons
                                                className="d-inline-block mx-1"
                                                icon={group[0].icon}
                                                // type="circled" 
                                                // circleColor={group[0].color} 
                                                width={40}
                                                height={40}
                                            />
                                            <h5 className="white d-inline-block"> {group[0].name}</h5>
                                            <h6 className="white my-2 mx-3">Selected users</h6>
                                            {selectedUsers.map((user: User) => {
                                                return <div
                                                    className="d-flex px-1 ml-3"
                                                    style={{
                                                        borderBottom: "1px solid #3D3D3D",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer",

                                                    }}
                                                >
                                                    <img className="mr-2 mt-4" src={AvatarImg} alt={user.name} width="24px" height="24px" />
                                                    <span className="mr-2" style={{ minWidth: "100%" }}>
                                                        <div className="text-right mt-2 mr-5" style={{ minWidth: "max-content" }}>
                                                            <ClearIcon style={{ color: "white", fontSize: "17", marginBottom: "-20px" }} onClick={() => handleUserRemove(user.id)} />
                                                        </div>
                                                        <h6 className="white m-0">{user.name}</h6>
                                                        <p className="m-0">{user.email}</p>
                                                    </span>
                                                </div>
                                            })}
                                        </div> : null}
                                    </div>
                                </div>}
                            {selected === Tabs.EMAIL && <div className="select-user" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                                <div className="d-flex">
                                    <div className="w-100 mx-4 my-0">
                                        <div className="d-flex flex-column">
                                            <Input
                                                required
                                                name="text"
                                                context="group"
                                                placeholder="Search for users"
                                                type="text"
                                                id="text"
                                                onInputChange={searchEmails}
                                                onKeyDown={addEmails}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                }}
                                            />
                                            <div style={{
                                                backgroundColor: "#2A2A2A",
                                                borderRadius: "0 0 24px 24px",
                                                marginTop: "-20px",
                                                boxShadow: "0px 3px 17px #000000"
                                            }}>
                                                <p className="mt-3 pt-3 px-3">Search or paste E-mail addresses, separated by semicolon</p>
                                            </div>
                                        </div>
                                        <h6 className="white my-3">Recent users</h6>
                                        {users.map((user: User) => {
                                            return <div
                                                className="d-flex py-2 px-1 ml-3"
                                                style={{
                                                    borderBottom: "1px solid #3D3D3D",
                                                    whiteSpace: "nowrap",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleUserAdd(user.id)}
                                            >
                                                <img className="mr-2 my-auto" src={AvatarImg} alt={user.name} width="24px" height="24px" />
                                                <span className="mr-2" >
                                                    <h6 className="white m-0">{user.name}</h6>
                                                    <p className="m-0">{user.email}</p>
                                                </span>
                                            </div>
                                        })}
                                    </div>
                                    {group.length > 0 ?
                                        <div className="w-100 mx-4 pb-2 mt-3 text-left">
                                            <Icons
                                                className="d-inline-block mx-1"
                                                icon={group[0].icon}
                                                type="circled"
                                                circleColor={group[0].color}
                                                width={40}
                                                height={40}
                                            />
                                            <h5 className="white d-inline-block"> {group[0].name}</h5>
                                            <h6 className="white my-2 mx-3">Selected users</h6>
                                            {selectedUsers.map((user: User) => {
                                                return <div
                                                    className="d-flex px-1 ml-3"
                                                    style={{
                                                        borderBottom: "1px solid #3D3D3D",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {user.id && <img className="mr-2 mt-4" src={AvatarImg} alt={user.name} width="24px" height="24px" />}
                                                    <span className="mr-2" style={{ minWidth: "100%" }}>
                                                        <div className="text-right mt-2 mr-5" style={{ minWidth: "max-content" }}>
                                                            {user.id && <ClearIcon style={{ color: "white", fontSize: "17", marginBottom: "-20px" }} onClick={() => handleUserRemove(user.id)} />}
                                                        </div>
                                                        {!user.id && <h6 className="white d-block">Mail user</h6>}
                                                        <h6 className="white m-0">{user.name}</h6>
                                                        <p className="m-0">{user.email}</p>
                                                    </span>
                                                </div>
                                            })}
                                        </div> : null}
                                </div>
                            </div>}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonStyled
                        className="button-white"
                        text="Cancel"
                        onClick={() => { props.handleClose(); reset() }}
                    />
                    <ButtonStyled
                        className="button-red"
                        text="Add users"
                        onClick={() => { props.handleClose(); }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}