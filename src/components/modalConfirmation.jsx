import { Modal } from "antd";

const ModalConfirmation = ({ open, onOk, onCancel }) => {
  return (
    <Modal
      title="Delete Confirmation"
      open={open} 
      onCancel={onCancel}
      onOk={onOk}
      okText="Yes"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete this data?</p>
    </Modal>
  );
};

export default ModalConfirmation;
