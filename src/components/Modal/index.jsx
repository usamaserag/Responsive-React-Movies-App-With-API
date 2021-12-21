import React, { useState } from "react";
import "./styles.scss";

const Modal = () => {
  const [active, setActive] = useState(true);

  const closeModal = () => {
    setActive(!active);
  };

  return (
    <div className={`modal ${active ? "active" : ""}`}>
      <div className="modal__content">
        <div className="modal__content__close" onClick={closeModal}>
          x
        </div>
      </div>
    </div>
  );
};

export default Modal;
