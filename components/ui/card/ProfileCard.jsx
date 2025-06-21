import './ProfileCard.css';
import ActionButtons from '../buttons/ActionButtons';

export default function ProfileCard({ name, photo, tagline, role }) {
  return (
    <div className="profile-card">
      <div className="photo-container">
        <img
          src={photo}
          alt={`Photo of ${name}`}
          className="profile-card-photo"
        />

        <div className="action-row">
          <ActionButtons role={role} />
        </div>
      </div>

      <div className="caption-row">
        <span className="profile-name">{name}</span>
        <span className="profile-tagline">&nbsp; {tagline}</span>
      </div>
    </div>
  );
}