import styled from "styled-components";
import React from "react";
import Image from "next/image";
import { CloseIcon } from "@/static/icons";
import FormatServices from "@/services/format-services";
import Selector from "@/modules/hub/selector";

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
    patientName: string;
    date: {
        from: Date,
        to: Date,
    };
    onConnect: () => any,
    onReject: () => any,
}

const MainInformation: React.FC<Props> = (props) => {
    const profileImage = props.patientPhotoUrl ?? "/images/user-placeholder.jpg";

    // Convert date to correct format
    const timeBefore = Selector.getAppointDate(props.date.from, props.date.to);

    return <MainInformationContainer className="main">
        <Image
            className="profile-image"
            width="100px"
            height="100px"
            src={profileImage}/>

        <div className="information">
            <h3>{ props.patientName }</h3>
            <span className="date">{ timeBefore }</span>
        </div>

        <button className="connect" onClick={props.onConnect}>Подключиться</button>
        <button className="reject" onClick={props.onReject}><CloseIcon/></button>
    </MainInformationContainer>
}

export default MainInformation;
