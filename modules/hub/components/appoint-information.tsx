import React from "react";
import Image from "next/image";
import styled from "styled-components";

import Document from "@/modules/hub/components/document";
import { CloseIcon } from "@/static/icons";

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
        <MainInformation {...appointment} />
        <Information {...appointment} />
        <Documents {...appointment}/>

        <span className="disclaimer">
            Консультация пройдет 10 декабря с 10:00 до 11:00. Вы можете <a className='reject'>отказаться</a> от этой
            консультации до её начала. После завершения консультации вы получите 1000₽ на свой баланс.
        </span>
    </Container>
}

// ---- DOCUMENTS -------------------------------------
const DocumentsContainer = styled.div`
  h3.title {
    font-size: 20px;
    color: #282828;
    font-weight: 500;
  }
  
  .documents {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    column-gap: 30px;
    row-gap: 10px;
  }
`;

const Documents: React.FC<Props> = (appointment) => {
    return <DocumentsContainer className="documents">
        <h3 className="title">Документы</h3>
        <div className="documents">
            <Document name="a.png" path="/a/s.py" size="10KB" type="img" />
        </div>
    </DocumentsContainer>;
};

// ---- INFORMATION -----------------------------------
const InformationContainer = styled.div`
  h3.title {
    font-size: 20px;
    color: #282828;
    font-weight: 500;
  }
  
  .two-column-section {
    margin-top: 10px;
    width: calc(100% - 70px);
    display:flex;
    justify-content: space-between;
  }
  
  .one-column-section {
    margin-top: 10px;
    width: 100%;
    display: flex;
    
    .key {
      margin-right: 50px;
    }
  }
  
  .space {
    width: 10px;
  }
  
  .column {
    display: flex;
    flex-direction: column;
  
    span {
      font-size: 18px;
      margin-bottom: 10px;
      
      &.key {
        color: #565656;
        white-space: nowrap;
      }
      
      &.value {
        color: #282828;
      }
    }
  }
`;

const Information: React.FC<Props> = (appointment) => {
    return <InformationContainer className="information_container">
        <h3 className="title">Информация</h3>
        <div className="two-column-section">
            <div className="column">
                <span className="key">ФИО:</span>
                <span className="key">Возраст:</span>
            </div>
            <div className="column">
                <span className="value">Иванов Иван Иванович</span>
                <span className="value">31 год</span>
            </div>
            <div className="space"/>
            <div className="column">
                <span className="key">Телефон:</span>
                <span className="key">Пол:</span>
            </div>
            <div className="column">
                <span className="value">+7 (932) 33-27-350</span>
                <span className="value">Мужской</span>
            </div>
        </div>

        <div className="one-column-section">
            <div className="column">
                <span className="key">Хроническое заоблевания:</span>
                <span className="key">Симптомы:</span>
            </div>
            <div className="column">
                <span className="value">Отсутствуют</span>
                <span className="value">У меня короче вообще все болит вообще сильно. Ходить не могу, руки немеют, горло болит, в голове беда.</span>
            </div>
        </div>
    </InformationContainer>
}

// ---- MAIN INFORMATION CONTAINER --------------------
const MainInformationContainer = styled.div`
  display: flex;
  align-items: center;

  .profile-image {
    border-radius: 10px;
  }
  
  .information {
    width: calc(100% - 355px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    
    h3 {
      color: #111111;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    
    span.date {
      color: #707070;
      font-size: 18px;
    }
  }
  
  button {
    height: 40px;
    padding: 10px;
    border-radius: 7px;
    border: none;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    
    &.connect {
      width: 175px;
      background: #30B9D6;
      color: white;
      text-align: center;
      padding: 10px 15px;
      margin-right: 10px;
      box-shadow: 0 3px 15px rgba(48, 185, 214, 0.2);
    }
    
    &.reject {
      background: #E9F7FA;
      width: 40px;
      
      &:hover {
        background: #E6F2F4;
      }
      
      svg path {
        fill: #30b9d6;
      }
    }
  }
`;

const MainInformation: React.FC<Props> = (appointment) => {
    const profileImage = appointment.consultation?.patient?.photoUrl ?? "/images/user-placeholder.jpg";

    return <MainInformationContainer className="main">
        <Image
            className="profile-image"
            width="100px"
            height="100px"
            src={profileImage}/>

        <div className="information">
            <h3>Иванов Иван Иванович</h3>
            <span className="date">14 декабря, 10:00 – 11:00</span>
        </div>

        <button className="connect">Подключиться</button>
        <button className="reject"><CloseIcon/></button>
    </MainInformationContainer>
}

// ---- TYPES -----------------------------------------
interface Props extends IAppointment {
    consultation: PropsConsultation,
}

interface PropsConsultation extends Consultation {
    patient: UserType,
}

export default AppointInformation;
