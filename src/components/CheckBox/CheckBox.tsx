import React from "react";
import "./CheckBox.css";
import { Field } from "formik";

const Options = () => {
  return (
    <div className="grid grid-rows-2">
      <div className="option">
        <Field type="radio" id="jednokratna" name="typeOfAction" value="ONE_TIME" />
        <label htmlFor="jednokratna"></label>
        <span className="pl-2">Jednokratna opcija</span>
      </div>
      <div className="option">
        <Field type="radio" id="dvokratna" name="typeOfAction" value="MULTIPLE_TIMES" />
        <label htmlFor="dvokratna"></label>
        <span className="pl-2">Višekratna opcija</span>
      </div>
    </div>
  );
};

export default Options;
