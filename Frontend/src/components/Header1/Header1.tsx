import styles from "./Header1.module.css";
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
        <header className={styles.header}>

            <div className={styles['header-left']}>


                <img src={menuIcon} id="sidebar-toggle" className={styles['menu-button']} alt="menu" />

                <div>VidTube</div>
            </div>






            <div className={styles['header-center']}>

                <div className={styles['icon-container']}>

                    <img src={searchIcon} className={styles['search-icon']} alt="search icon" />
                </div>

                <div className={styles['search-container']}>
                    <input type="text" className={styles['search-input']} placeholder="Search" />
                    <button className={styles['search-button']}>
                        <img src={searchIcon} alt="search" />
                    </button>


                </div>

                <img src={voiceIcon} className={styles['voice-icon']} alt="voice" />
            </div>





            <div className={styles['header-right']}>
                <button className={styles['header-create-button']}>

                    <img src={plusIcon} className={styles['plus-icon']} alt="create" />

                    <div>Create</div>
                </button>




                <img src={bellIcon} className={styles['bell-icon']} alt="notifications" />



                <div className={styles['profile-placeholder']}></div>
            </div>





        </header>
    );
}

export default Header1;