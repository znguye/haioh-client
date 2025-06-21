// Description: Action buttons component that adapts to different roles and permissions.
import { useState } from "react";
import { Button } from "../buttons/Button.jsx";
import { Ban, Heart, CircleQuestionMark, Pencil} from "lucide-react";
import './ActionButtons.css';

// Temporary hardcoded matchmaker setup for MVP
const matchmakerData = {
  currentUser: {
    name: "Valerie Tan",
    avatar: 'https://images.pexels.com/photos/32630160/pexels-photo-32630160.jpeg',
    id: "valerie",
  },
  matchableFriends: [
    {
      id: "mike",
      name: "Mike",
      avatar: "https://images.pexels.com/photos/2108809/pexels-photo-2108809.jpeg",
    },
    {
      id: "michelle",
      name: "Michelle",
      avatar: "https://images.pexels.com/photos/17924664/pexels-photo-17924664.jpeg",
    },
  ],
};

export default function ActionButtons({role}) {
  const [selectedIds, setSelectedIds] = useState([]);

    if (role === 'matchmaker') {
      const people = [matchmakerData.currentUser, ...matchmakerData.matchableFriends];

      const toggleSelect = (id) => {
        setSelectedIds((prev) => 
          prev.includes(id)
            ? prev.filter((selectedId) => selectedId !== id)
            : [...prev, id]);
      }

      return (
        <div className="matchmaker-buttons">
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => toggleSelect(person.id)}
              className={`avatar-button ${selectedIds.includes(person.id) ? 'selected' : ''}`}
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="avatar-image"
              />
            </button>
          ))}
        </div>
      );
    }

    // Default action buttons for 'loner' role
    return (
      <div className="action-buttons">
        <Button variant="outline" size="icon">
          <Ban className="w-5 h-5" alt="dislike" />
        </Button>
        <Button variant="outline" size="icon">
          <CircleQuestionMark className="w-5 h-5" alt="maybe" />
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-5 h-5" alt="like" />
        </Button>
      </div>
    );
  }