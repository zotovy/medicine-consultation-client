import React from "react";
import styled from "styled-components";

import Documents from "./documents";
import Information from "./information";
import MainInformation from "./main-information";
import { toJS } from "mobx";

const Container = styled.div`
  width: 100%;
  
  .information_container {
    margin-top: 20px;
  }
  
  .documents {
    margin-bottom: 30px;
  } 
 
  span.disclaimer {
    color: #282828;
    font-size: 18px;
    
    a.reject {
      color: #30B9D6;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;


const AppointInformation: React.FC<Props> = (appointment) => {
    return <Container>
        <MainInformation
            patientPhotoUrl={appointment.consultation?.patient?.photoUrl}
            date={{ from: appointment.from, to: appointment.to }}
            onReject={() => {}}
            onConnect={() => {}}
            patientName={appointment.patientName} />
        <Information {...appointment} />
        <Documents documents={appointment.documents} />

        <span className="disclaimer">
            Консультация пройдет 10 декабря с 10:00 до 11:00. Вы можете <a className='reject'>отказаться</a> от этой
            консультации до её начала. После завершения консультации вы получите 1000₽ на свой баланс.
        </span>
    </Container>
}

interface Props extends IAppointment {
    consultation: PropsConsultation,
}

interface PropsConsultation extends Consultation {
    patient: UserType,
}

export default AppointInformation;
