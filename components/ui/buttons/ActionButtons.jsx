// Description: Action buttons component that adapts to different roles and permissions.

import { Button } from "../buttons/Button.jsx";
import { Ban, Heart, CircleQuestionMark, Pencil} from "lucide-react";
import './ActionButtons.css';

export default function ActionButtons({role}) {
  if (role === 'matchmaker') {
    return (
      <div className="action-buttons">
        <Button variant="outline" size="icon">
          <Pencil className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Ban className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    );
  }
  
  // Default action buttons for 'loner' role
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
