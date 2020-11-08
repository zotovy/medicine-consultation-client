import React from 'react';
import { ChevronIcon } from "../icons";
import Document from "../../../components/document";
import Consultation from "../../admin/types/consultation";

type Props = {
    consultation: Consultation;
    key: string;
}

const ConsultationTile : React.FC<Props> = ({  key}) => {

    const profileStyles = { backgroundImage: `url(${"https://medvestnik.ru/apps/mv/assets/cache/files/content/news/825/82515/front-jpg/front-z-400.jpg?time=1536247000"})` };

    return <div key={key} className="consultation-tile">
        <div className="header">
            <div className="profile-pic" style={profileStyles}/>
            <div className="info">
                <span className="title">Иванова Елена</span>
                <span className="subtitle">Педиатр, 7 июня</span>
            </div>
        </div>

        <div className="tab">
            <span>Сообщения</span>
            <ChevronIcon/>
        </div>
        <div className="tab">
            <span>Показания</span>
            <ChevronIcon/>
        </div>
    </div>
}

export default ConsultationTile;