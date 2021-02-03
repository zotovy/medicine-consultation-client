import React from "react";
import styled from "styled-components";

// Components
import Header from "@/modules/balance/components/header";
import PrimaryButton from "@/modules/balance/components/primary-button";
import { AddIcon, SendIcon } from "@/static/icons";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .buttons {
    margin-top: 15px;
    display: flex;
    
    .primary-button__component.primary { 
      margin-right: 10px;
    }
  }
`;


const UserBalancePage: React.FC = () => {
    return <Page>
        <Header/>
        <div className="buttons">
            <PrimaryButton type="primary"> <SendIcon/> Вывести </PrimaryButton>
            <PrimaryButton type="secondary"> <AddIcon/> Пополнить </PrimaryButton>
        </div>
    </Page>
}

export default UserBalancePage;