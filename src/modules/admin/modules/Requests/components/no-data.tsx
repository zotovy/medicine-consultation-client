import React from "react";
import noData from "../../../static/noData.png";
import { requests } from "../../../translation";
import '../routes.scss'

const NoData: React.FC = () => {
    return <div className="no-data">
        <img src={noData} alt="no-data" />
        <span>{requests.no_requests_found}</span>
    </div>
}

export default NoData;