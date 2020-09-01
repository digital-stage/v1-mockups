import React from "react";
import ButtonStyled from "../../Components/Form/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Link } from "react-router-dom";

const StageDetails = (props: { stage: { title: string, image: string, online: boolean, users: { userPhoto: string }[] } }) => {
    return (
        <div className="stage-details">
            <div className="title">
                <h2>{props.stage.title}</h2>
                {props.stage.online && <span className="online"></span>}
                {props.stage.online && <h5>Online</h5>}
            </div>
            <img className="stage-icon" src={props.stage.image} alt={props.stage.image} />
            <h4>News</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quae?</p>
            <h4>Info</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum fugiat soluta voluptas voluptate quisquam!</p>
            <div className="mb-3">
                {props.stage.users.map(el => {
                    return (
                        <img src={el.userPhoto} alt={el.userPhoto} width="40px" height="40px" />
                    )
                })}
            </div>
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
    );
};

export default StageDetails;
