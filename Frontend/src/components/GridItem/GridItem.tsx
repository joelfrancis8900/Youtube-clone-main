import "./GridItem.css";
import dotIcon from "../../icons/dot-single-svgrepo-com.svg";


interface GridItemProps {
    title: string;
    thumbnail: string;
}

function GridItem({ title, thumbnail }: GridItemProps) {
    return (
        // <div className="grid-item">
        //     <img src={thumbnail} alt={title} />
        //     <h3>{title}</h3>
        // </div>

        <div className="grid-item">
            {/* thumbnail div is video loading placeholder */}

            <div className="thumbnail">
                <img src={thumbnail} alt={title} />
            </div>

            <div className="video-info-grid">

                <div className="GridItem-Channel-Photo"></div>

                <div className="Video-details">
                    <h3 className="video-title">{title}</h3>
                    <div className="video-channel">Video Channel</div>
                    <div className="test">
                        <div className="views">Video views</div>
                        {/* <div className="view-date-divider"> | </div> */}
                        <div className="dot-container"><img src={dotIcon} className="dot-icon" alt="dot icon" /></div>

                        <div className="date">14 minutes ago</div>
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