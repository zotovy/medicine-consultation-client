import React, { useState } from "react";
import styled from "styled-components";
import Domain from "../domain";
import { ChevronRight } from "@/static/icons";
import { TableDataType } from "@/modules/balance/balance-controller";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const PeriodSelector = styled.div`
  cursor: pointer;
  color: #565656;
  font-size: 14px;
  user-select: none;
  
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
`;

const Table = styled.div`
  margin-top: 10px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const MainRowBg = styled.div`
  width: 100%;
  height: 31px;
  position: absolute;
  background-color: #F5F8F8;
  border-radius: 5px;
  top: 0;
  left: 0;
`;

const Column = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 15px;
    color: #565656;
    margin: 0 10px 10px;
    
    &.main {
      margin-top: 7px;
      margin-bottom: 18px;
    }
  }
`;

export type Props = {
    selectedPeriod: string;
    title: string
    onSelectPeriod: (period: string) => any;
    data: TableDataType,
}

const TableComponent: React.FC<Props> = (props) => {
    const [isPeriodSelectorActive, setIsPeriodSelectorActive] = useState(false);

    return <Container className="table__component">
        <Header>
            <Title>{ props.title }</Title>

            <PeriodSelector
                onClick={() => setIsPeriodSelectorActive(!isPeriodSelectorActive)}
                className={isPeriodSelectorActive ? "active" : "disable"}
            >
                { props.selectedPeriod }
                <ChevronRight/>
            </PeriodSelector>

            <PeriodSelectorModal className={isPeriodSelectorActive ? "active" : "disable"}>
                {
                    Domain.availablePeriods.map(e => <span
                        onClick={() => {
                        setIsPeriodSelectorActive(false);
                        props.onSelectPeriod(e);}}
                    >{ e }</span>)
                }
            </PeriodSelectorModal>
        </Header>

        <Table>
            <MainRowBg/>
            {
                Object.keys(props.data).map(e => {
                    // @ts-ignore
                    const key = e as keyof TableDataType;

                    const data = props.data[key];
                    return <Column>
                        <span className="main">{ Domain.dataTranslation[key] }</span>
                        {
                            data.map(e => <span>{ e }</span>)
                        }
                    </Column>
                })
            }

        </Table>
    </Container>
}

export default TableComponent;

