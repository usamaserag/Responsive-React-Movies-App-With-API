import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

Modal.prototype = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <div>x</div>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;