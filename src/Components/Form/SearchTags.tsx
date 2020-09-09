import React from 'react';
import Avatar from "../../assets/images/Avatar.png";

const searchTagsStyle = {
    backgroundColor:"white",
    color:"black",
    border:"1px solid #707070",
    borderRadius:"24px",
    maxWidth:"max-content",
    padding:"2px",
    display:"inline-flex",
    cursor:"pointer"
}

function SearchTags(props:{tag:string, onClick: any}) {
    return (
        <div style={searchTagsStyle} className="ml-1" onClick={props.onClick}>
            <img src={Avatar} alt="avatar" width="24px" height="24px"/>
            <h6 className="my-auto mx-2">{props.tag}</h6>
        </div>
    )
}

export default SearchTags