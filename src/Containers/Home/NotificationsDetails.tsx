import React from "react";
import ButtonStyled from "../../Components/Form/Button";
import { Link } from "react-router-dom";
import UserIcon1 from "../../assets/images/user-img-1.png"
import { Badge } from "@material-ui/core";

const NotificationsDetails = (props: { stage: { title: string, image: string, online: boolean, users: { userPhoto: string, username: string }[] } }) => {
    return (
        <div className="notification-details">
            <div className="notification-details-intro">
                <div className="stage-icon" >
                    <img src={props.stage.image} alt={props.stage.image} />
                </div>
                <div className="mb-5 mt-4">
                    <h5>Stage</h5>
                    <h2>{props.stage.title}</h2>
                    <h6 style={{ color: "#B7B7B7" }}>Created by info@digital-stage.org</h6>
                </div>
                <div className="my-4">
                    <h5 className="mb-3">Groups</h5>
                    <div className="d-inline-block mr-3 text-center">
                        <Badge badgeContent={4} color="secondary" showZero overlap="circle">
                            <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        </Badge>
                        <p>Sopran</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <Badge badgeContent={0} color="secondary" showZero overlap="circle">
                            <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        </Badge>
                        <p>Bass</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <Badge badgeContent={6} color="secondary" showZero overlap="circle">
                            <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        </Badge>
                        <p>Alt</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <Badge badgeContent={3} color="secondary" showZero overlap="circle">
                            <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        </Badge>
                        <p>Tenor</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <Badge badgeContent={12} color="secondary" showZero overlap="circle">
                            <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        </Badge>
                        <p>Conductor</p>
                    </div>
                </div>
                <div>
                    <Link to="/stage"><ButtonStyled
                        className="button-red mb-2"
                        text="Accept invitation"
                        type="submit"
                    /></Link>
                    <ButtonStyled
                        className="button-white mb-2 ml-1"
                        text="Decline invitation"
                        type="submit"
                    />
                </div>
            </div>
            <div className="notification-details-users">
                <h3 className="mb-0">Users</h3>
                <p>{props.stage.users.length} users</p>
                <div className="users-list-scrollablle">
                    {
                        props.stage.users.map(user => {
                            return(
                                <div className="d-inline-block mr-2">
                                <img src={user.userPhoto} alt="fotoja e perdoruesit" width="80px" height="80px"/>
                                <p className="text-center">{user.username}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <h4>News</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quae?</p>
                <h4>Info</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum fugiat soluta voluptas voluptate quisquam!</p>
            </div>
            <div className="notification-details-status">
                <div className="stage-status d-flex d-flex-row">
                    {props.stage.online && <span style={{ color: "white" }} className="online d-inline-block mr-2"></span>}
                    {props.stage.online && <h5 className="d-inline-block mr-4">Online</h5>}
                </div>
            </div>
        </div>
    );
};

export default NotificationsDetails;
