import React from "react";
import Icon from "../Icons/Icons";
import "../../styles/Dropdown.scss";
import { preview } from "../../js/stagesMock";

const Dropdown = (props) => {
  return (
    <div class="dropdown" onMouseLeave={props.hover}>
      <button class="dropbtn" onMouseEnter={props.hover}>
        <Icon icon={props.value} />
      </button>
      {props.closeDropdown && (
        <div class="dropdown-content">
          {preview.map((el) => {
            return (
              <div onClick={() => props.onClick(el)}>
                <Icon icon={el} />
                <span>{el.charAt(0).toUpperCase() + el.slice(1)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
