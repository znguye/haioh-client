import {useState, useRef, useEffect} from 'react';
import { Menu, X } from "lucide-react";
import "./SettingsDropdown.css";
import { Link } from "react-router-dom";



export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    // Function to handle touches outside the dropdown to close it
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        }
    };
    
    // Add event listeners for touch and mouse events
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);
    
    return (
    <>
      <Menu className="nav-icon" onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="settings-modal">
          <div className="modal-header">
            <h2>Settings</h2>
            <X className="close-icon" onClick={() => setIsOpen(false)} />
          </div>
          <ul className="settings-options">
            <li>Settings</li>
            <li>Help</li>
            <li>Privacy</li>
            <li>Legal</li>
            <li className="logout">
                <Link to ="/auth" onClick={() => setIsOpen(false)}>
                    Logout
                </Link>
            </li>
            <li className="logout">
                <Link to ="/auth" onClick={() => setIsOpen(false)}>
                    Delete Account
                </Link>
            </li>
          </ul>
        </div>
      )}
    </>
    );
    }