import React, { FC, PropsWithChildren } from "react";
import { Modal as ModalUI } from "@nextui-org/react";

type TProps = {
  header?: React.ReactNode;
  visible: boolean;
  onClose?(): void;
  footer?: React.ReactNode;
};

const Modal: FC<PropsWithChildren<TProps>> = ({
  header,
  visible,
  children,
  onClose,
  footer,
}) => {
  return (
    <ModalUI
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      {header && <ModalUI.Header>{header}</ModalUI.Header>}
      <ModalUI.Body>{children}</ModalUI.Body>
      {footer && <ModalUI.Footer>{footer}</ModalUI.Footer>}
    </ModalUI>
  );
};

export default Modal;
