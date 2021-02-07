import React, { useState } from "react";
import styled from "styled-components";
import { ChevronRight } from "@/static/icons";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const PeriodSelector = styled.div`
  cursor: pointer;
  color: #565656;
  font-size: 14px;
  user-select: none;
  
  @media screen and (max-width: 768px) {
      font-size: 12px;
  }
  
  svg {
    height: 9px;
    margin-left: 10px;
    transition: transform 300ms;
    transform: rotate(90deg);
  }
  
  &.active {
    svg {
      transform: rotate(-90deg);
    }
  }
`;

const PeriodSelectorModal = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: end;
  color: #282828;
  font-size: 15px;
  z-index: 12;
  
  &.disable {
    display: none;
  }
  
  span {
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  color: #282828;
  font-weight: 500;
  
  @media screen and (max-width: 768px) {
      font-size: 18px;
  }
`;


export type Props = {
    availablePeriods: string[]
    selectedPeriod: string;
    title: string;
    onSelectPeriod: (v: string, i: number) => any;
}

const HeaderComponent: React.FC<Props> = ({ title, selectedPeriod, onSelectPeriod, availablePeriods }) => {
    const [isPeriodSelectorActive, setIsPeriodSelectorActive] = useState(false);

    return <Header>
        <Title>{title}</Title>

        <PeriodSelector
            onClick={() => setIsPeriodSelectorActive(!isPeriodSelectorActive)}
            className={isPeriodSelectorActive ? "active" : "disable"}
        >
            {selectedPeriod}
            <ChevronRight/>
        </PeriodSelector>

        <PeriodSelectorModal className={isPeriodSelectorActive ? "active" : "disable"}>
            {
                availablePeriods.map((e, i) => <span
                    onClick={() => {
                        setIsPeriodSelectorActive(false);
                        onSelectPeriod(e, i);
                    }}>
                    { e }
                </span>)
            }
        </PeriodSelectorModal>
    </Header>
}

export default HeaderComponent;
