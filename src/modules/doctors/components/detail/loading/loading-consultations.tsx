import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingConsultationsComponent : React.FC = () => {
    const weekSelectorSkeletonWidth: number = window.screen.width < 640 ? window.screen.width - 32 : 150;

    return <div className="selector">
        <Skeleton width={weekSelectorSkeletonWidth} height={35} className="week-selector" />
        <Skeleton count={7} height={28} style={{ margin: "3px 0" }} />
    </div>
}

export default LoadingConsultationsComponent;