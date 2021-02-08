import React from "react";
import Image from "next/image";
import styled from "styled-components";
import FormatServices from "@/services/format-services";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 20px;
  padding: 15px;
  min-width: 350px;
  position: relative; 
  
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
}

const UserCard: React.FC<Props> = (props) => {

    // Convert date to correct format
    const date = `${FormatServices.formatDayAndMonth(props.date.from.getDate(), props.date.from.getMonth() + 1)}, ${FormatServices.formatTime(props.date.from)} - ${FormatServices.formatTime(props.date.to)}`;
    let timeBefore = `через ${FormatServices.formatToUsualDate(props.date.from, true, false, "")}`;
    if (timeBefore === "через меньше минуты ") timeBefore = "сейчас";

    // Apply user profile image
    const profileImage = props.profileImage ?? "/images/user-placeholder.jpg";

    return <Card>
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
                    <button className="connect">Подключиться</button>
                    <button className="reject">Отказаться</button>
                </div>
        }
    </Card>
}

export default UserCard;
