import React from "react";
import styled from "styled-components";

import RequestComponent from "@/modules/hub/containers/navigation/requests";
import Calendar from "@/modules/hub/containers/navigation/calendar";
import Appoints from "@/modules/hub/containers/navigation/appoints";

const Container = styled.nav`
  flex: 0 0 375px;
  margin-left: 80px;
    
  .calendar_component {
    margin-top: 20px;
  }
    
  .appoints_component {
    margin-top: 30px;
  }
`;

export type Props = {
    // requests: IAppointRequest[],
    // appoints: IAppointment,
};

const NavigationComponent: React.FC<Props> = (props) => {
    return <Container>
        <RequestComponent amount={5} />
        <Calendar onSelect={(date) => console.log(date)} />
        <Appoints appoints={[]} />
    </Container>
}

export default NavigationComponent;
