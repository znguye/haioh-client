import { Button } from "../buttons/Button.jsx";
import { X, Check, HelpCircle } from "lucide-react";
import './ActionButtons.css';

export default function ActionButtons() {
  return (
    <div className="action-buttons">
      <Button variant="outline" size="icon">
        <X className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="icon">
        <HelpCircle className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="icon">
        <Check className="w-5 h-5" />
      </Button>
    </div>
  );
}
