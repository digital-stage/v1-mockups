import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TiUserAdd } from "react-icons/ti";

type Props = {
  hover: () => void,
  enableHideScreensHandler: () => void,
  onShowScreenClick(value: {}): void,
  hiddenScreens: Array<Object>,
  enableHideScreens: boolean
}

const ShowScreensDropdown = (props: Props) => {
  return (
    <div className="dropdown show-screens-dropdown" onMouseLeave={props.hover}>
      <button
        className={
          props.hiddenScreens.length > 0 ? "dropbtn" : "dropbtn-screens"
        }
        onMouseEnter={props.hover}
      >
        <div className="btn-icon">
          {!props.enableHideScreens && (
            <FiEye
              size="1.5em"
              title="Enable hide screens"
              onClick={props.enableHideScreensHandler}
            />
          )}
          {props.enableHideScreens && (
            <FiEyeOff
              size="1.5em"
              title={props.hiddenScreens.length === 0 ? "Disable hide screens" : undefined}
              onClick={
                props.hiddenScreens.length === 0
                  ? props.enableHideScreensHandler
                  : undefined
              }
            />
          )}
        </div>
      </button>
      {props.hiddenScreens.length > 0 && (
        <div className="dropdown-content">
          {props.hiddenScreens.map((el: any, i: number) => {
            return (
              <div onClick={() => props.onShowScreenClick(el)} key={i}>
                <TiUserAdd size="1.5em" />
                <span>{el.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowScreensDropdown;
