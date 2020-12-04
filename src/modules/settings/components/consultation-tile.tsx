import React from 'react';
import { ChevronIcon } from "../icons";
import userPlaceholder from "../../../static/images/user-placeholder.jpg";
import formatServices from "../../../services/format-services";

type Props = {
    consultation: Consultation;
    key: string;
    onShowNode: () => void;
}

const ConsultationTile: React.FC<Props> = ({ onShowNode, consultation, key }) => {

    const profileStyles = {
        backgroundImage: (consultation.doctorId as DoctorType).photoUrl
            ? `url(${(consultation.doctorId as DoctorType).photoUrl})`
            : `url(${userPlaceholder})`
    };

    return <div key={key} className="consultation-tile">
        <div className="header">
            <div className="profile-pic" style={profileStyles}/>
            <div className="info">
                <span className="title">{(consultation.doctorId as DoctorType).fullName}</span>
                <span className="subtitle">
                    {(consultation.doctorId as DoctorType).speciality},&nbsp;
                    {formatServices.formatToUsualDate(consultation.date)}</span>
            </div>
        </div>

        {
            consultation.note
                ? <div className="tab" onClick={onShowNode}>
                    <span>Показания</span>
                    <ChevronIcon/>
                </div>
                : <React.Fragment/>
        }
    </div>
}

export default ConsultationTile;