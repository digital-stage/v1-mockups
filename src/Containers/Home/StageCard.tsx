import React from "react";

const StageCard = (props: { stage: { title: string, image: string, online: boolean, users: { userPhoto: string }[] }, usersNumber:number }) => {
    return (
        <div className="stage-card"><div className="stage-card-left">
            <img src={props.stage.image} alt="stage" width="80px" height="80px" className="mr-3" />
            <div className="stage-card-details my-auto">
                <h5 style={{ color: "white" }}>{props.stage.title}</h5>
                {props.stage.users.length > 5 ?
                    <div>
                        {
                            props.stage.users.slice(0, 5).map(el => {
                                return (
                                    <img src={el.userPhoto} alt="profile-pic" width="22px" height="22px" />
                                )
                            })
                        }
                        <p className="ml-2">{props.usersNumber} users</p>
                    </div> : props.stage.users.map(el => {
                        return (
                            <img src={el.userPhoto} alt="profile-pic" width="22px" height="22px" />
                        )
                    })}
            </div>
        </div>
            {props.stage.online && <span className="mt-3 online"></span>}
        </div>
    );
};

export default StageCard;
