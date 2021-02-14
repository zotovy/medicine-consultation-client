import React from "react";
import styled from "styled-components";

import NoData from "@/modules/hub/components/no-data";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
      visibility: hidden;
  }
`;

const NoDataAppointInformationComponent: React.FC = () => {
    return <Container className="appoint-information_container">
        <NoData title={"Не выбрана ни одна консультация"}/>
    </Container>
}

export default NoDataAppointInformationComponent;
