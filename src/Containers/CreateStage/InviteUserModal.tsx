import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Slide, InputAdornment, makeStyles, } from '@material-ui/core';
import ButtonStyled from '../../Components/Form/Button';
import Icons from '../../Components/Icons/Icons';
import { choir, Group, User } from './SelectPresetStep';
import Input from "../../Components/Form/Input";
import { Search, Clear } from '@material-ui/icons';
import AvatarImg from "../../assets/images/Avatar.png";

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

const modalTransition = React.forwardRef(function Transition(
    props: { children?: React.ReactElement<any, any> },
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
    group?: Group,
    open: boolean,
    handleClose: () => void,
    InputProps?: () => void,
    saveGroup?: () => void,
    groupId: number | undefined,
    onSave: (selectedUsers: User[]) => void
}) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string>(Tabs.USERNAME)
    const [group, SetGroup] = React.useState<Group>(choir[0])
    const [users, SetUsers] = React.useState(recentUsers)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
    const [emails, setEmails] = React.useState<string>('')

    const reset = () => {
        SetGroup(choir[0]);
        SetUsers(recentUsers);
        setSelectedUsers([]);
        setEmails('');
        setSelected(Tabs.USERNAME)
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const user = recentUsers.filter(el => el.name && el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        SetUsers(user)
    }

    const handleUserAdd = (id: number) => {
        return () => {
            const user: User[] = recentUsers.filter((el: User) => el.id === id);
            const recent = users.filter(el => el.id !== id);
            SetUsers(recent);
            setSelectedUsers([...selectedUsers, user[0]])
        }
    }

    const handleUserRemove = (id: number) => {
        return () => {
            const user: User[] = recentUsers.filter(el => el.id === id);
            const recent = selectedUsers.filter((el: User) => el.id !== id);
            setSelectedUsers(recent);
            SetUsers([...users, user[0]])
        }
    }

    const searchEmails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailList = e.target.value
        setEmails(emailList)
    }

    const addEmails = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const emailArray = emails.split(';');
            const emailObject = emailArray.map((email: string) => { return { email } })
            setSelectedUsers([...selectedUsers, ...emailObject])
        }
    }

    const handleTabSelection = (tab: string) => {
        return () => setSelected(tab)
    }

    const handleCancel = () => {
        props.handleClose();
        reset()
    }

    const handleAddUsers = () => {
        props.handleClose()
        props.onSave(selectedUsers)
    }

    useEffect(() => {
        const selectedGroup = choir.filter(el => el.id === props.groupId)
        SetGroup(selectedGroup[0])
    }, [props.groupId])

    return (
        <div>
            <Dialog
                // maxWidth="xs"
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
                                onClick={handleTabSelection(Tabs.USERNAME)}
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
                                onClick={handleTabSelection(Tabs.EMAIL)}
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
                                                required={true}
                                                name="text"
                                                context="group"
                                                placeholder="Search for users"
                                                type="text"
                                                id="text"
                                                onInputChange={search}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <Search />
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
                                                key={user.id}
                                                className="d-flex py-2 px-1 ml-3"
                                                style={{
                                                    borderBottom: "1px solid #3D3D3D",
                                                    whiteSpace: "nowrap",
                                                    cursor: "pointer",
                                                }}
                                                onClick={handleUserAdd(user.id!)}
                                            >
                                                <img className="mr-2 my-auto" src={AvatarImg} alt={user.name} width="24px" height="24px" />
                                                <span className="mr-2" >
                                                    <h6 className="white m-0">{user.name}</h6>
                                                    <p className="m-0">{user.email}</p>
                                                </span>
                                            </div>
                                        })}
                                    </div>
                                    {group && Object.keys(group).length > 0 ? <div className="w-100 mx-4 pr-4  pb-2 mt-3 text-left" style={{ border: `2px solid ${group.color}`, borderRadius: "24px" }}>
                                        <Icons
                                            className="d-inline-block mx-1"
                                            icon={group.icon}
                                            // type="circled" 
                                            // circleColor={group[0].color} 
                                            width={40}
                                            height={40}
                                        />
                                        <h5 className="white d-inline-block"> {group.name}</h5>
                                        <h6 className="white my-2 mx-3">Selected users</h6>
                                        {selectedUsers.map((user: User) => {
                                            return <div
                                                key={user.id}
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
                                                        <Clear style={{ color: "white", fontSize: "17", marginBottom: "-20px" }} onClick={handleUserRemove(user.id!)} />
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
                                            required={true}
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
                                                        <Search />
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
                                            key={user.id}
                                            className="d-flex py-2 px-1 ml-3"
                                            style={{
                                                borderBottom: "1px solid #3D3D3D",
                                                whiteSpace: "nowrap",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleUserAdd(user.id!)}
                                        >
                                            <img className="mr-2 my-auto" src={AvatarImg} alt={user.name} width="24px" height="24px" />
                                            <span className="mr-2" >
                                                <h6 className="white m-0">{user.name}</h6>
                                                <p className="m-0">{user.email}</p>
                                            </span>
                                        </div>
                                    })}
                                </div>
                                {group && Object.keys(group).length > 0 ?
                                    <div className="w-100 mx-4 pb-2 mt-3 text-left">
                                        <Icons
                                            className="d-inline-block mx-1"
                                            icon={group.icon}
                                            type="circled"
                                            circleColor={group.color}
                                            width={40}
                                            height={40}
                                        />
                                        <h5 className="white d-inline-block"> {group.name}</h5>
                                        <h6 className="white my-2 mx-3">Selected users</h6>
                                        {selectedUsers.map((user: User) => {
                                            return <div
                                                key={user.email}
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
                                                        {user.id && <Clear style={{ color: "white", fontSize: "17", marginBottom: "-20px" }} onClick={handleUserRemove(user.id)} />}
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
                </DialogContent>
                <DialogActions>
                    <ButtonStyled
                        className="button-white"
                        text="Cancel"
                        onClick={handleCancel}
                    />
                    <ButtonStyled
                        className="button-red"
                        text="Add users"
                        onClick={handleAddUsers}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}