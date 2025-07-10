import { Link } from 'react-router-dom';
import './ProfileCard.css';

export default function ProfileCard({ username, photo, tagline }) {
  return (
    <Link to={`/profiles/${username}`} style={{ textDecoration: 'none' }}>
      <div className="profile-card" style={{ cursor: 'pointer' }}>
        <div className="header-row">
          <img src={photo} alt={`${username} avatar`} className="profile-avatar" />
          <h4 className="profile-name">{username}</h4>
        </div>
        <div className="photo-container">
          <img
            src={photo}
            alt={`Photo of ${username}`}
            className="profile-card-photo"
          />
        </div>
        <div className="caption-row">
          <div className="text-group">
            <span className="profile-tagline">{tagline}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
