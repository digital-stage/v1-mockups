import React from "react";
import ButtonStyled from "../../Components/Form/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Link } from "react-router-dom";
import UserIcon1 from "../../assets/images/user-img-1.png"
import UserIcon2 from "../../assets/images/user-img-2.png"
import UserIcon3 from "../../assets/images/user-img-3.png"

const NotificationsDetails = (props: { stage: { title: string, image: string, online: boolean, users: { userPhoto: string }[] } }) => {
    return (
        <div className="notification-details">
            Notifications Details
        </div>
    );
};

export default NotificationsDetails;
