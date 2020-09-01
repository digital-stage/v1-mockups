import React, { MouseEventHandler } from "react";
import Icon from "../Icons/Icons";
import { preview } from "../../js/stageMock";

type Props = {
  hover: MouseEventHandler,
  value: string,
  closeDropdown: boolean,
  onClick(el: string): void
}

const Dropdown = (props: Props) => {
  return (
    <div className="dropdown" onMouseLeave={props.hover}>
      <button className="dropbtn" onMouseEnter={props.hover}>
        <Icon icon={props.value} />
      </button>
      {props.closeDropdown && (
        <div className="dropdown-content">
          {preview.map((el: string) => {
            return (
              <div onClick={() => props.onClick(el)} key={el}>
                <Icon icon={el} />
                <p className="d-inline my-auto">{el.charAt(0).toUpperCase() + el.slice(1)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
