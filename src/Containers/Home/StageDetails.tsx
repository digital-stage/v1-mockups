import React from "react";
import ButtonStyled from "../../Components/Form/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Link } from "react-router-dom";
import UserIcon1 from "../../assets/images/user-img-1.png"
import UserIcon2 from "../../assets/images/user-img-2.png"
import UserIcon3 from "../../assets/images/user-img-3.png"

const StageDetails = (props: { stage: { title: string, image: string, online: boolean, users: { userPhoto: string }[] } }) => {
    return (
        <div className="stage-details">
            <div className="stage-image">
                <img className="stage-icon" src={props.stage.image} alt={props.stage.image} />
            </div>
            <div className="stage-details-content ml-4">
                <div className="title mb-4">
                    <h5>Stage</h5>
                    <h2>{props.stage.title}</h2>
                    <h6 style={{ color: "#B7B7B7" }}>Created by info@digital-stage.org</h6>
                </div>
                <div className="groups mt-4 mb-2">
                    <h5>Groups</h5>
                    <div className="d-inline-block mr-3 text-center">
                        <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        <p>Sopran</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        <p>Bass</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        <p>Alt</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        <p>Tenor</p>
                    </div>
                    <div className="d-inline-block mr-3 text-center">
                        <img src={UserIcon1} alt={UserIcon1} width="40px" height="40px" />
                        <p>Conductor</p>
                    </div>
                </div>
                <div className="news-info mb-4">
                    <h4>News</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quae?</p>
                    <h4>Info</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum fugiat soluta voluptas voluptate quisquam!</p>
                </div>{/* <div className="mb-3">
                    {props.stage.users.map(el => {
                        return (
                            <img src={el.userPhoto} alt={el.userPhoto} width="40px" height="40px" />
                        )
                    })}
                </div> */}
                <div>
                    <Link to="/stage"><ButtonStyled
                        className="button-red mb-2"
                        text="Start"
                        type="submit"
                    /></Link>
                    <ButtonStyled
                        className="button-white mb-2 ml-1"
                        text="Copy invitation"
                        type="submit"
                        startIcon={<FileCopyOutlinedIcon />}
                    />
                    <ButtonStyled
                        className="button-white mb-2 ml-1"
                        text="Edit"
                        type="submit"
                        startIcon={<EditOutlinedIcon />}
                    />
                </div>
                <a href="/#" style={{ fontSize: "12px" }}>Show stage invitation</a>
            </div>
            <div className="stage-status d-flex d-flex-row">
                {props.stage.online && <span style={{ color: "white" }} className="online d-inline-block mr-3"></span>}
                {props.stage.online && <h5 className="d-inline-block mr-4">Online</h5>}
            </div>
        </div>
    );
};

export default StageDetails;
