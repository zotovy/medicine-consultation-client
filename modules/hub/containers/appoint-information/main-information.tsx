import styled from "styled-components";
import React from "react";
import Image from "next/image";
import { CloseIcon } from "@/static/icons";

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

type Props = {
    patientPhotoUrl: string;
}

const MainInformation: React.FC<Props> = (props) => {
    const profileImage = props.patientPhotoUrl ?? "/images/user-placeholder.jpg";

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

export default MainInformation;
