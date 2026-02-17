import styles from "./GridItem.module.css";
import dotIcon from "../../icons/dot-single-svgrepo-com.svg";


interface GridItemProps {
    title: string;
    videoUrl: string;
}

function GridItem({ title, videoUrl }: GridItemProps) {
    return (
        // <div className="grid-item">
        //     <img src={thumbnail} alt={title} />
        //     <h3>{title}</h3>
        // </div>

        <div className={styles['grid-item']}>
            {/* thumbnail div is video loading placeholder */}

            <div className={styles.thumbnail}>
                {/* <img src={thumbnail} alt={title} /> */}
                <video width="300" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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