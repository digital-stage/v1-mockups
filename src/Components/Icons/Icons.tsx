import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";
import iconPath from "./svgFiles";

const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

type Props = {
    onClick?: MouseEventHandler | undefined,
    icon: string,
    color?: string,
    circleColor?:string,
    viewBox: string,
    className: string,
    style: Object,
    size: string,
    type?:string
}

const Icons = (props: Props) => {
    const styles = { ...defaultStyles, ...props.style };
    return (
        <svg
            className={props.className}
            style={styles}
            viewBox={props.viewBox}
            width={`${props.size}px`}
            height={`${props.size}px`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g fill={props.color}>
            {props.type === "circled" && <circle cx="16" cy="16" r="16"  fill={props.circleColor}/>}
            {iconPath(props.icon)}
            </g>
        </svg>
    );
};

Icons.defaultProps = {
    size: 32,
    color: "#fff",
    circleColor:"#e84040",
    viewBox: "0 0 32 32",
    style: {},
    className: "",
    type:""
};

Icons.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    circleColor:PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    type:PropTypes.string
};

export default Icons