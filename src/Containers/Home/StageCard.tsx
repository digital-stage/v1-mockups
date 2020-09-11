import React from "react";

const StageCard = (props: {
    stage: {
        title: string,
        image: string,
        online: boolean,
        users: { userPhoto: string }[],
        description: string
    }
}) => {
    return (
        <div className="stage-card">
            <div className="stage-card-image">
                <img src={props.stage.image} alt="stage" width="80px" height="80px" className="mr-3" />
            </div>
            <div className="stage-card-details my-auto">
                <div>
                    <h5 style={{ color: "white" }}>{props.stage.title}</h5>
                    {props.stage.online && <span className="online"></span>}
                </div>
                <p>{props.stage.description}</p>
                <div className="float-right">
                    <p className="mb-0">{props.stage.users.length} users</p>
                </div>
            </div>
        </div>
    );
};

export default StageCard;
