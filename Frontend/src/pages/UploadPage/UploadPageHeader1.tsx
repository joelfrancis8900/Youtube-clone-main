import "./Header1.css";
import menuIcon from "../../icons/menu-svgrepo-com space removed.svg";
import searchIcon from "../../icons/search-outline-svgrepo-com space removed.svg";
import voiceIcon from "../../icons/voice input icon space removed.svg";
import plusIcon from "../../icons/plus-svgrepo-com.svg";
import bellIcon from "../../icons/notification-bell-svgrepo-com space removed.svg";
import useSidebarToggle from "../../hooks/useSidebarToggle";
// import { useSidebarToggle } from "../../hooks/useSidebarToggle"
// import { useEffect } from "react";

function Header1() {

    useSidebarToggle();

    return (
        <header className="header">

            <div className="header-left">


                <img src={menuIcon} id="sidebar-toggle" className="menu-button" alt="menu" />

                <div>VidTube</div>
            </div>






            <div className="header-center">

                <div className="icon-container">

                    <img src={searchIcon} className="search-icon" alt="search icon" />
                </div>

                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search" />
                    <button className="search-button">
                        <img src={searchIcon} alt="search" />
                    </button>


                </div>

                <img src={voiceIcon} id="voice-icon" alt="voice" />
            </div>





            <div className="header-right">
                <button className="header-create-button">

                    <img src={plusIcon} id="plus-icon" alt="create" />

                    <div>Create</div>
                </button>




                <img src={bellIcon} className="bell-icon" alt="notifications" />



                <div className="profile-placeholder"></div>
            </div>





        </header>
    );
}

export default Header1;