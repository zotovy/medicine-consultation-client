import styled from "styled-components";
import React from "react";
import FormatServices from "@/services/format-services";

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

const Information: React.FC<IAppointment> = (appointment) => {
    return <InformationContainer className="information_container">
        <h3 className="title">Информация</h3>
        <div className="two-column-section">
            <div className="column">
                <span className="key">ФИО:</span>
                <span className="key">Возраст:</span>
            </div>
            <div className="column">
                <span className="value">{ appointment.patientName }</span>
                <span className="value">{ FormatServices.getAgeFromBirthday(appointment.birthday) }</span>
            </div>
            <div className="space"/>
            <div className="column">
                <span className="key">Телефон:</span>
                <span className="key">Пол:</span>
            </div>
            <div className="column">
                <span className="value">{ FormatServices.formatNumericPhone(appointment.phone) }</span>
                <span className="value">{ appointment.sex ? "Мужской" : "Женский" }</span>
            </div>
        </div>

        <div className="one-column-section">
            <div className="column">
                <span className="key">Хронические заболевания:</span>
                <span className="key">Симптомы:</span>
            </div>
            <div className="column">
                <span className="value">{ appointment.chronicDiseases ?? "Отсутствуют" }</span>
                <span className="value">{ appointment.symptoms ?? "Отсутствуют" }</span>
            </div>
        </div>
    </InformationContainer>
}

export default Information;
