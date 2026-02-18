import styles from "./GridItem.module.css";
import dotIcon from "../../icons/dot-single-svgrepo-com.svg";
import { useState, useRef } from "react";


interface GridItemProps {
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

function GridItem({ title, videoUrl, thumbnailUrl }: GridItemProps) {

    const [isHovering, setIsHovering] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    return (


        <div className={styles['grid-item']} onMouseEnter={() => {
            setIsHovering(true);
            videoRef.current?.play();
        }}
            onMouseLeave={() => {
                setIsHovering(false);
                videoRef.current?.pause();
                if (videoRef.current) videoRef.current.currentTime = 0;
            }}>
            {/* thumbnail div is video loading placeholder */}

            <div className={styles.thumbnail} >
                {/* <img src={thumbnail} alt={title} /> */}
                {!isHovering && <img src={thumbnailUrl} alt={title} />}
                {isHovering && (
                    <video width="300" controls ref={videoRef}
                        src={videoUrl}
                        muted
                        loop
                        preload="metadata"
                        className={styles.hoverVideo}>
                        {/* <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag. */}
                    </video>
                )}
            </div>

            <div className={styles['video-info-grid']}>

                <div className={styles['GridItem-Channel-Photo']}></div>

                <div className={styles['Video-details']}>
                    <h3 className={styles['video-title']}>{title}</h3>
                    <div className={styles['video-channel']}>Video Channel</div>
                    <div className={styles.test}>
                        <div className={styles.views}>Video views</div>
                        {/* <div className="view-date-divider"> | </div> */}
                        <div className={styles['dot-container']}><img src={dotIcon} className={styles['dot-icon']} alt="dot icon" /></div>

                        <div className={styles.date}>14 minutes ago</div>
                    </div>


                </div>

            </div>



        </div>
    );
}


export default GridItem;









//  <div className="grid-item">
//             <div className="thumbnail-container">
//                 <img src={thumbnail} alt={title} />
//             </div>
//             <h3>{title}</h3>
//             <div>Video Channel</div>
//             <div>Video views</div>
//             <div>Video upload time/date</div>
//         </div>