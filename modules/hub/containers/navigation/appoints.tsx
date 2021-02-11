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
  
  .userCard {
    margin-bottom: 20px;
  }
`;

export type Props = {
    appoints: IAppointment[],
    selectedAppointId: string | null,
    selectAppoint: (id: string | null) => any,
}

const Appoints: React.FC<Props> = (props) => {
    return <Container className="appoints_component">
        <h3>Консультации</h3>
        {
            props.appoints.map(appoint => {
                return <UserCard
                        onClick={() => {
                            if (appoint._id !== props.selectedAppointId)
                                props.selectAppoint(appoint._id);
                            else props.selectAppoint(null);
                        }}
                        key={ appoint._id }
                        cursor="pointer"
                        selected={ appoint._id === props.selectedAppointId }
                        date={{ from: appoint.from, to: appoint.to }}
                        name={ appoint.patientName } />
            })
        }

    </Container>
}

export default Appoints;
