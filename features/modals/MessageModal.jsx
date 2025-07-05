import { useNavigate } from "react-router-dom";
import "./MessageModal.css";
import {X} from "lucide-react";

export default function MessageModal({ onClose, username }) {
  const navigate = useNavigate();

  const goToMissingFeature = () => {
    navigate("/feature-coming-soon");
    onClose(); // optional: close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Who do you want to message?</h3>
        <button className="modal-option" onClick={goToMissingFeature}>
          {username}
        </button>
        <button className="modal-option" onClick={goToMissingFeature}>
          Their matchmaker
        </button>
        <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
