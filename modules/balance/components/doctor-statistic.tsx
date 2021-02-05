import React, { useState } from "react";
import styled from "styled-components";
import HeaderComponent from "@/modules/balance/components/header-component";
import Domain from "@/modules/balance/domain";
import { DoctorChartDataType, TransactionPeriod } from "@/modules/balance/balance-controller";
import { toJS } from "mobx";
import { observer } from "mobx-react";

const Component = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: calc(1100px - 280px);
  height: 215px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: auto;
  padding-bottom: 7px;
  margin-top: 10px;
  
  &::-webkit-scrollbar {
    height: 5px;
    
    &-track {
      background: none;
    }
    
    &-thumb {
      border-radius: 3px;
      background: #F5F8F8;
      
      //&:hover {
      //  back
      //}
    }
  }
`;

const Chart = styled.div`
  height: 100%;
  max-height: 205px;
  min-width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
  
  .column-container {
    display: flex;
    align-items: flex-end;
    height: 100%;
    animation: animation cubic-bezier(0.215, 0.61, 0.355, 1)  1.2s;
  }
  
  .column {
    width: 30px;
    min-height: 10px;
    height: 100%;
    border-radius: 10px;
    background-color: #E9F7FA;
    cursor: pointer;
    position: relative;
    
    .info {
      top: 5px; 
      position: absolute;
      border: 1px solid #CCCCCC;
      border-radius: 5px;
      color: #282828;
      font-size: 12px;
      font-weight: 500;
      padding: 3px;
      visibility: hidden;
      pointer-events: none;
      background: white;
      z-index: 100;
      
      &.left {
        right: 40px; 
      }
      
      &.right {
        left: 40px;
      }
    }
    
    &:hover {
      background-color: #30B9D6;
      
      .info {
        visibility: visible;
      }
    }
  }
  
  @keyframes animation {
      0% {
        height: 0;
      }
      
      100% {
        height: 100%;
      }
    }
  
  span.text {
    padding-top: 5px;
    color: #CCCCCC;
    font-size: 14px;
  }  
`

export type Props = {
    data: DoctorChartDataType,
    onPeriodChanged: (period: TransactionPeriod) => any
}

const DoctorStatisticComponent: React.FC<Props> = (props) => {
    const [selectedPeriod, setSelectedPeriod] = useState("За год")

    console.log(toJS(props.data));

    return <Component className="doctor-statistic__component">
        <HeaderComponent
            availablePeriods={Domain.availableChartPeriods}
            selectedPeriod={selectedPeriod}
            title="Статистика"
            onSelectPeriod={(v, i) => {
                setSelectedPeriod(v);
                // @ts-ignore
                props.onPeriodChanged(Domain.chartPeriodKeys[i]);
            }} />
        <Container>
            {
                props.data.data.map((e, i) => {
                    const height = e.moneyAmount / props.data.maxAmount * 100;
                    return <Chart>
                        <div className="column-container">
                            <div className="column" style={{ height: `${height ? height : 0}%` }}>
                                <div
                                    className={`info ${i < props.data.data.length - 2 ? "right" : "left"} `}>
                                    { e.moneyAmount.toLocaleString() }₽
                                </div>
                            </div>
                        </div>
                        <span className="text">{ e.chartText }</span>
                    </Chart>
                })
            }
        </Container>
    </Component>
}

export default observer(DoctorStatisticComponent);