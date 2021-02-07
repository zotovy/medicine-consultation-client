import React, { useState } from "react";
import styled from "styled-components";
import Domain from "../domain";
import { TableDataType, TransactionPeriod } from "@/modules/balance/balance-controller";
import HeaderComponent from "@/modules/balance/components/header-component";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .table-wrapper {
    margin-top: 10px;    
    position: relative;
  }
`;


const Table = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  
  &::-webkit-scrollbar {
    height: 5px;
    
    &-track {
      background: none;
    }
    
    &-thumb {
      border-radius: 3px;
      background: #F5F8F8;
    }
  }
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
  
  @media screen and (max-width: 768px) {
      flex: 0 0 auto;
  }
  
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
    title: string
    onSelectPeriod: (period: TransactionPeriod) => any;
    data: TableDataType,
}

const TableComponent: React.FC<Props> = (props) => {
    const [selectedPeriod, setSelectedPeriod] = useState("За год")

    return <Container className="table__component">
        <HeaderComponent
            availablePeriods={Domain.availablePeriods}
            selectedPeriod={selectedPeriod}
            title={props.title}
            onSelectPeriod={(v, i) => {
                setSelectedPeriod(v);
                // @ts-ignore
                props.onSelectPeriod(Domain.periodKeys[i]);
            }} />

        <div className="table-wrapper">
            <MainRowBg/>
            <Table>
                {
                    Domain.tableDataKeys.map(key => {
                        const data = props.data[key];
                        return <Column>
                            <span className="main">{Domain.dataTranslation[key]}</span>
                            {
                                data.map(e => <span>{e}</span>)
                            }
                        </Column>
                    })
                }

            </Table>
        </div>
    </Container>
}

export default TableComponent;

