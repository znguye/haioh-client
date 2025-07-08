import TopNavBar from "../navbars/TopNavBar.jsx";
import BottomNavBar from "../navbars/BottomNavbar.jsx";
import fishIcon from "../../components/ui/images/neutral.png";
import "./MissingFeatureScreen.css"


export default function MissingFeatureScreen() {
    
    return (
        <div className="screen-container">
            <div className="top-nav-wrapper">
                <TopNavBar />
            </div>

            <div className="main-content coming-soon-content">
                <img 
                    src={fishIcon}
                    alt="Coming soon fish" 
                    className="coming-soon-image"
                />
                <h2>Coming soon</h2>
                <p>Thank you for your interest. This feature is on its way.</p>

            </div>

            <div className="bottom-nav-wrapper">
                <BottomNavBar />
            </div>
        </div>
    );
    }