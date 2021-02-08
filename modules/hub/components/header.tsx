import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column; 
   
  .main-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
  
      h3 {
        color: #282828;
        font-size: 24px;
        line-height: 27px;
        font-weight: 500;
      }
      
      span.back {
        color: #30B9D6;
        font-size: 18px;
        cursor: pointer;
      }
  }
  
  span.subtitle {
    padding-top: 15px;
    font-size: 18px;
    color: #282828;
  }
`;

export type Props = {
    title: string;
    subtitle?: string;
    back?: boolean;
}

const HeaderComponent: React.FC<Props> = (props) => {
    const router = useRouter();

    return <Container>
        <div className="main-row">
            <h3>{ props.title }</h3>

            {
                props.back
                    ? <span className="back" onClick={router.back}>Назад</span>
                    : <React.Fragment/>
            }
        </div>
        <span className="subtitle">{ props.subtitle }</span>
    </Container>
}

export default HeaderComponent;
