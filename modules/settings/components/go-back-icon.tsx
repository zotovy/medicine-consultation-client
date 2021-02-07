import React from "react";
import Link from "next/link";
import { BackIcon } from "@/static/icons";
import { useWindowWidth } from "@react-hook/window-size";

const GoBackIcon : React.FC = () => {
    const width = useWindowWidth() ?? 0;

    if (width > 1024) return <React.Fragment/>;
    return <div className="back-icon">
        <Link href="/settings" passHref>
            <a><BackIcon/></a>
        </Link>
    </div>;
}

export default GoBackIcon;
