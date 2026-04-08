import React from 'react';
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import { useTickets } from "../../Context/TicketContext"; 
import "../../Style/Settings/Settings.css";

function Settings() {
    const { theme, toggleTheme } = useTickets();

    return (
        <div className="page-wrapper">
            <Navigation/>
            <main className="settings-container">
                <h1>Settings</h1>
                
                <div className="settings-card">
                    <div className="setting-item">
                        <div>
                            <h3>Appearance</h3>
                            <p>Switch between light and dark mode</p>
                        </div>
                        {}
                        <button 
                            className={`theme-toggle-btn ${theme}`} 
                            onClick={toggleTheme} 
                        >
                            {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
                        </button>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Settings;