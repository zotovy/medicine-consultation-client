import React from "react";
import Link  from "next/link";
import { AddIcon } from "@/static/icons";
import styles from "./header.module.scss";

/**
 * Do not include any styles. Used only inside support pages
 */

type Props = {
    title: string;
    link: string;
    back?: string;
}

const SupportHeader: React.FC<Props> = ({ title, back, link }) => {
    return <header className={styles.supportHeader}>
        <h1>{ title }</h1>
        <Link href={link}>
            <button id="cancel">{ back ?? <AddIcon/> }</button>
        </Link>
    </header>
}

export default SupportHeader;