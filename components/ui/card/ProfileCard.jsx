import './ProfileCard.css';

export default function ProfileCard({ name, photo }) {
  return (
    <div className="profile-card">
      <span className="profile-label">A: Suggested Person</span>
      <h2 className="profile-name">{name}</h2>
      <img
        src={photo}
        alt={`Photo of ${name}`}
        className="profile-photo"
      />
    </div>
  );
}
