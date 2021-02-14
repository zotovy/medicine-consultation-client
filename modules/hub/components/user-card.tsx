import React from "react";
import Image from "next/image";
import styled from "styled-components";
import FormatServices from "@/services/format-services";
import Selector from "@/modules/hub/selector";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 20px;
  padding: 15px;
  min-width: 350px;
  position: relative; 
  border: 1px solid white;
  
  span.time {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #CCCCCC;
    font-size: 14px;
  }
  
  .main {
    display: flex;
    align-items: center;
    
    .profile {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: lightgray;
    }
    
    .name { 
      margin-left: 10px;
      
      span {
        font-size: 18px;
        font-weight: 500;
        color: #282828;
      }
      
      .underline {
        width: 50px;
        height: 4px;
        border-radius: 10px;
        background: #30B9D6;
        margin-top: 3px;
      }
    }
  }
  
  .date {
    color: #565656;
    font-size: 14px;
    padding-top: 10px;
  }
  
  .buttons {
    margin-top: 15px;
    display: flex;
    
    button { 
      width: 140px;
      border-radius: 7px;
      text-align: center;
      padding: 7px;
      font-size: 14px;
      border: none;
      outline: none;
      cursor: pointer;
      
      &.connect {
        color: white;
        background: #30B9D6;
        margin-right: 20px;
      }
      
      &.reject {
        color: #30B9D6;
        background: #E9F7FA;
        
        &:hover {
          background: #E6F2F4;
        }
      }
    }
  }
  
  &.selected {
    border: 1px solid #30b9d6;
  }
  
  @media screen and (max-width: 768px) {
      padding: 10px;
      min-width: initial;
  
      span.time {
        font-size: 13px;
      }
      
      .main {
        .profile {
          width: 45px;
          height: 45px;
        }
        
        .name span {
          font-size: 16px;
        }
      }
  }
`;

export type Props = {
    profileImage?: string;
    date: {
        from: Date,
        to: Date,
    };
    name: string;
    onConnect?: () => any,
    onReject?: () => any,
    connectButtonText?: string;
    rejectButtonText?: string;
    cursor?: "pointer" | "initial";
    selected?: boolean;
    onClick?: () => any;
}

const UserCard: React.FC<Props> = (props) => {

    // Convert date to correct format
    const date = Selector.getAppointDate(props.date.from, props.date.to);
    let timeBefore = `через ${FormatServices.formatToUsualDate(props.date.from, true, false, "")}`;
    if (timeBefore === "через меньше минуты ") timeBefore = "сейчас";
    else if (timeBefore.includes(".")) timeBefore = timeBefore.split(" ")[1];

    // Apply user profile image
    const profileImage = props.profileImage ?? "/images/user-placeholder.jpg";

    const styles = {
        cursor: props.cursor ?? "initial",
    }

    return <Card onClick={props.onClick} style={styles} className={`userCard ${props.selected ? "selected" : ""}`} >
        <span className="time">{ timeBefore }</span>
        <div className="main">
            <Image
                className="profile"
                width="55px"
                height="55px"
                src={profileImage}
            />
            <div className="name">
                <span>{props.name}</span>
                <div className="underline"/>
            </div>
        </div>
        <span className="date">{ date }</span>
        {
            !props.onConnect || !props.onReject
                ? <React.Fragment/>
                : <div className="buttons">
                    <button className="connect" onClick={props.onConnect}>
                        { props.connectButtonText ?? "Подключиться" }
                    </button>
                    <button className="reject" onClick={props.onReject}>
                        { props.rejectButtonText ?? "Отказаться" }
                    </button>
                </div>
        }
    </Card>
}

export default UserCard;
