import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";
import iconPath from "./iconsFiles";

const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

type Props = {
    onClick?: MouseEventHandler | undefined,
    icon: string,
    color?: string,
    viewBox: string,
    className: string,
    style: Object,
    size: string
}


const Icons = (props: Props) => {
    const styles = { ...defaultStyles, ...props.style };
    const icons: any = iconPath
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
            <g fill={props.color}>{icons[props.icon]}</g>
        </svg>
    );
};

Icons.defaultProps = {
    size: 24,
    color: "#fff",
    viewBox: "0 0 24 24",
    style: {},
    className: "",
};

Icons.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default Icons