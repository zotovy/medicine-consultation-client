import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingHeader : React.FC = () => {
        return <header>
            <div className="profileImage" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
                <Skeleton width={180} height={180}/>
            </div>

            <div className="info-main">
                <h2><Skeleton width={250} height={35}/></h2>
                <div className="rating"><Skeleton width={160} height={35} style={{ marginTop: "10px" }}/></div>
                <div className="buttons">
                    <Skeleton width={140} height={35}/>
                </div>
            </div>
        </header>
}

export default LoadingHeader;