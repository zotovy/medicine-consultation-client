import React from "react";
import styled from "styled-components";
import UserCard from "@/modules/hub/components/user-card";

const Container = styled.div`

  h3 {
    font-size: 25px;
    font-weight: 500;
    line-height: 1.2;
    text-align: left;
    color: #282828;
    margin-bottom: 15px;
  }
`;

export type Props = {
    appoints: IAppointment[],
}

const Appoints: React.FC<Props> = (props) => {
    return <Container className="appoints_component">
        <h3>Консультации</h3>
        <UserCard
            cursor="pointer"
            selected={true}
            date={{ from: new Date(), to: new Date() }}
            name={"Иван Иванов"} />
    </Container>
}

export default Appoints;
