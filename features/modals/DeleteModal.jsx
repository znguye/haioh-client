import "./MessageModal.css";
import {X} from "lucide-react";
import fishIcon from "../../components/ui/images/neutral.png";

export default function DeleteModal({ onClose, onDelete }) {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img 
            src={fishIcon}
            alt="Coming soon fish" 
            className="coming-soon-image"
        />
        <h2>Hold up!</h2>
        <p>Are you sure you want to delete?</p>

          <div className="modal-actions">
          <button className="modal-option" onClick={onDelete}>
            Delete
          </button>
          <button className="modal-option" onClick={onClose}>
            Back
          </button>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
