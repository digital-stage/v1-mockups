import React from "react";
import ClearIcon from '@material-ui/icons/Clear';

function secondsToHms(d:number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    // var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    // var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay 
    // + sDisplay; 
}

const NotificationCard = (props: {
    notification: {
        title: string,
        time: number
        image: string,
    }
}) => {
    return (
        <div className="notification-card">
            <div className="notification-card-image mt-4">
                <img src={props.notification.image} alt="notification" width="80px" height="80px" className="mr-1" />
            </div>
            <div className="notification-card-details mb-4">
                <div className="text-right">
                    <ClearIcon style={{ color: "white" }} />
                </div>
                <div>
                    <h6 style={{ color: "white" }}>{props.notification.title}</h6>
                    <p className="m-0">{secondsToHms(props.notification.time)} ago</p>
                </div>
                <div className="text-right">
                    <p className="mb-0 mr-0"><span><b>Accept</b></span> <span><b>Decline</b></span></p>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
