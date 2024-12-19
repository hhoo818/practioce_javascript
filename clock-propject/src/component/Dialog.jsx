import PropTypes from "prop-types";
const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-2 flex justify-center items-start pt-20">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        {/* ヘッダー */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// PropTypesの設定
Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Dialog;
