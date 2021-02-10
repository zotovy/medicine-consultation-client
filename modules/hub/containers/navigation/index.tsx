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
    requests: IAppointRequest[],
    appoints: IAppointment[],
    dates: Date[],
    onSelectDate: (date: Date) => any,
    selectedAppointId: string | null,
    selectAppoint: (id: string | null) => any,
};

const NavigationComponent: React.FC<Props> = (props) => {
    console.log(props.dates);

    return <Container>
        <RequestComponent amount={props.requests.length} />
        <Calendar dates={props.dates} onSelect={props.onSelectDate} />
        <Appoints
                appoints={props.appoints}
                selectedAppointId={props.selectedAppointId}
                selectAppoint={props.selectAppoint}/>
    </Container>
}

export default NavigationComponent;
