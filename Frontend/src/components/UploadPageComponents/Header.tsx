import VideoCameraIcon2 from "../../icons/VideoCameraIcon2.png";
import styles from "./Header.module.css";



function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.VideoCameraIconWrapper}>
                <img src={VideoCameraIcon2} alt="Video Camera Icon" className={styles.VideoCameraIcon} />
            </div>

            <div className={styles.UploadText}>
                <h1 className={styles.UploadVideosText}>Upload videos</h1>
                <div>Post a video on your channel</div>
            </div>


        </div>
    )
}

export default Header




