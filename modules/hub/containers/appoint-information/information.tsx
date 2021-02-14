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
  
  .two-column-section.mobile, .one-column-section.mobile {
    display: none;
  }
  
  @media screen and (max-width: 768px) {
    .two-column-section.mobile {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }
    
    .one-column-section.mobile {
      display: block;
      width: 100%;
      
      .column {
        display: flex;
        flex-direction: column;
        
        span.key {
          margin-bottom: 3px;
          font-size: 15px;
        }
        
        span.value {
          margin-bottom: 15px;
        }
      }
    }
    
    .two-column-section.desktop, .one-column-section.desktop {
      display: none;
    }
    
  
    h3.title {
      font-size: 18px;
    }
    
    span {
      font-size: 16px !important;
      margin-bottom: 7px;
      
      &.key {
        margin-right: 25px;
      }
    }
  }
`;

const Information: React.FC<IAppointment> = (appointment) => {
    return <InformationContainer className="information_container">
        <h3 className="title">Информация</h3>
        <div className="two-column-section desktop">
            <div className="column">
                <span className="key">ФИО:</span>
                <span className="key">Возраст:</span>
            </div>
            <div className="column">
                <span className="value">{appointment.patientName}</span>
                <span className="value">{FormatServices.getAgeFromBirthday(appointment.birthday)}</span>
            </div>
            <div className="space"/>
            <div className="column">
                <span className="key">Телефон:</span>
                <span className="key">Пол:</span>
            </div>
            <div className="column">
                <span className="value">{FormatServices.formatNumericPhone(appointment.phone)}</span>
                <span className="value">{appointment.sex ? "Мужской" : "Женский"}</span>
            </div>
        </div>

        <div className="two-column-section mobile">
            <div className="column">
                <span className="key">ФИО:</span>
                <span className="key">Возраст:</span>
                <span className="key">Телефон:</span>
                <span className="key">Пол:</span>
            </div>
            <div className="column">
                <span className="value">{appointment.patientName}</span>
                <span className="value">{FormatServices.getAgeFromBirthday(appointment.birthday)}</span>
                <span className="value">{FormatServices.formatNumericPhone(appointment.phone)}</span>
                <span className="value">{appointment.sex ? "Мужской" : "Женский"}</span>
            </div>
        </div>

        <div className="one-column-section desktop">
            <div className="column">
                <span className="key">Хронические заболевания:</span>
                <span className="key">Симптомы:</span>
            </div>
            <div className="column">
                <span className="value">{appointment.chronicDiseases ?? "Отсутствуют"}</span>
                <span className="value">{appointment.symptoms ?? "Отсутствуют"}</span>
            </div>
        </div>

        <div className="one-column-section mobile">
            <div className="column">
                <span className="key">Хронические заболевания:</span>
                <span className="value">{appointment.chronicDiseases ?? "Отсутствуют"}</span>
            </div>
            <div className="column">
                <span className="key">Симптомы:</span>
                <span className="value">{appointment.symptoms ?? "Отсутствуют"}</span>
            </div>
        </div>
    </InformationContainer>
}

export default Information;
