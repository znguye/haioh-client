import { useState, useRef, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import "./SettingsDropdown.css";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function SettingsDropdown({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    if (onLogout) {
      onLogout(); // Use the passed logout handler
    } else {
      navigate("/auth"); // Fallback if no handler passed
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to delete account");
        return;
      }

      alert("Account deleted");
      localStorage.clear();
      setIsOpen(false);
      navigate("/auth");
    } catch (err) {
      console.error("Delete account error:", err);
      alert("Something went wrong while deleting your account.");
    }
  };

  return (
    <>
      <Menu className="nav-icon" onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="settings-modal" ref={dropdownRef}>
          <div className="modal-header">
            <h2>Settings</h2>
            <X className="close-icon" onClick={() => setIsOpen(false)} />
          </div>
          <ul className="settings-options">
            <li>Settings</li>
            <li>Help</li>
            <li>Privacy</li>
            <li>Legal</li>
            <li className="logout" onClick={handleLogout}>
              Log out
            </li>

            <li className="logout" onClick={handleDeleteAccount}>
              Delete Account
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
