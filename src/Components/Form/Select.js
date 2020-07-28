import React from "react";
import PropTypes from "prop-types";
import {preview} from "../../js/stagesMock";

const Select = (props) => {
  return (
    <select id="preview" value={props.value} onChange={props.onChange}>
      {preview.map((el) => {
        return (
          <option value={el} key={el}>
            {el.charAt(0).toUpperCase() + el.slice(1)}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {};

export default Select;
