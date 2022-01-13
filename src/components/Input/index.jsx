import React from "react";
import "./styles.scss";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
