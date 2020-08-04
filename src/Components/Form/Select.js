import React from "react";
import { preview } from "../../js/stagesMock";

const style = {
  fontSize: "12px",
};
const Select = (props) => {
  return (
    <select
      id="preview"
      value={props.value}
      onChange={props.onChange}
      style={style}
    >
      {preview.map((el) => (
        <option value={el} key={el}>
          {el.charAt(0).toUpperCase() + el.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default Select;
