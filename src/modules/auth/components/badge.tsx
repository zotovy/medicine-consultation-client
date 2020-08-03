import React, { useState } from "react";
import '../index.scss'

type Props = {
    icon: React.FC;
    title: string;
    children: any;
    isOpen: boolean;
}

const Close: React.FC = () => {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" width="512px" height="512px" className=""><g><g>
        <g>
            <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#ccc" />
        </g>
    </g><link type="text/css" id="dark-mode" rel="stylesheet" className="active-path" /><style type="text/css" id="dark-mode-custom-style" className="active-path" /></g> </svg>

}

const Badge: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);

    const OnClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 3000);
    }

    return <div className="badge-container">
        <div className={`badge ${props.isOpen && isOpen ? 'open' : ""}`} >
            <div className="icon">{<props.icon />}</div>
            <div className="text">
                <h3>{props.title}</h3>
                <p>{props.children}</p>
            </div>
        </div>
        <div className={`close ${props.isOpen && isOpen ? 'open' : ""}`} onClick={OnClose} ><Close /></div>
    </div>
}

export default Badge;