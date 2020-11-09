import React from 'react';
import { ChevronIcon } from "../icons";
import Consultation from "../../admin/types/consultation";
import userPlaceholder from "../../../static/images/user-placeholder.jpg";
import formatServices from "../../../services/format-services";

type Props = {
    consultation: Consultation;
    key: string;
}

const ConsultationTile: React.FC<Props> = ({ consultation, key }) => {

    const profileStyles = { backgroundImage: (consultation.doctorId as DoctorType).photoUrl
            ? `url(${(consultation.doctorId as DoctorType).photoUrl})`
            : `url(${userPlaceholder})`
    };

    return <div key={key} className="consultation-tile">
        <div className="header">
            <div className="profile-pic" style={ profileStyles }/>
            <div className="info">
                <span className="title">{ (consultation.doctorId as DoctorType).fullName }</span>
                <span className="subtitle">
                    { (consultation.doctorId as DoctorType).speciality },&nbsp;
                    { formatServices.formatToUsualDate(consultation.date) }</span>
            </div>
        </div>

        <div className="tab">
            <span>Показания</span>
            <ChevronIcon/>
        </div>
    </div>
}

export default ConsultationTile;