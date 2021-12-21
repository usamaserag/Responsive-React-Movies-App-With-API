import React from "react";
import './styles.scss'

const Button = ({ className, onClick, title }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;