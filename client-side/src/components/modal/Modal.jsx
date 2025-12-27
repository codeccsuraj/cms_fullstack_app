import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ isOpen, onClose, children, size = 'md', position = 'center' }) => {
  // Map size prop to pixel values
  const sizeMap = {
    sm: 320,
    md: 520,
    lg: 720,
    xl: 920,
    xxl: 1200
  };

  // Determine modal width
  const width = sizeMap[size] || sizeMap.md;

  // Set modal style for positioning
  const modalStyle = position === 'top' ? { top: 20 } : {};

  return (
    <AntdModal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      style={modalStyle}
      centered={position === 'center'}
      maskClosable={true}
      destroyOnHidden={true}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
