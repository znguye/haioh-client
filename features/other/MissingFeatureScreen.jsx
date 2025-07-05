import TopNavBar from "../../components/ui/navbars/TopNavBar.jsx";
import BottomNavBarMatchmaker from "../../components/ui/navbars/BottomNavBarMatchmaker.jsx";
import fishIcon from "../../components/ui/images/fish-cartoon-icon-clipart-png.png";
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
                <BottomNavBarMatchmaker />
            </div>
        </div>
    );
    }