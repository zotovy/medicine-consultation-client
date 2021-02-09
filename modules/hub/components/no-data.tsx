import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  
  span.data {
    padding-top: 15px;
    color: #565656;
    font-size: 16px;
  }
`;

export type Props = {
    title: string;
}

const NoData: React.FC<Props> = ({ title }) => {
    return <Container>
        <Image
            className="image"
            width="70px"
            height="70px"
            src="/images/no-data.png"
        />
        <span className="data">{ title }</span>
    </Container>
}

export default NoData;
