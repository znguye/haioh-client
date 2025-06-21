import { Button } from "../buttons/Button.jsx";
import { Ban, Heart, CircleQuestionMark, } from "lucide-react";
import './ActionButtons.css';

export default function ActionButtons() {
  return (
    <div className="action-buttons">
      <Button variant="outline" size="icon">
        <Ban className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="icon">
        <CircleQuestionMark className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="icon">
        <Heart className="w-5 h-5" />
      </Button>
    </div>
  );
}
