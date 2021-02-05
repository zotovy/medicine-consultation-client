import React, { useState } from "react";
import styled from "styled-components";
import HeaderComponent from "@/modules/balance/components/header-component";
import Domain from "@/modules/balance/domain";

const Component = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  min-width: 100%;
  max-width: calc(1100px - 280px);
  height: 215px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: auto;
  padding-bottom: 7px;
  
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

export type Props = {}

const DoctorStatisticComponent: React.FC<Props> = ({}) => {
    const [selectedPeriod, setSelectedPeriod] = useState("За год")

    return <Component className="doctor-statistic__component">
        <HeaderComponent
            availablePeriods={Domain.availablePeriods}
            selectedPeriod={selectedPeriod}
            title="Статистика"
            onSelectPeriod={setSelectedPeriod} />
        <Container>
            {
                new Array(31).fill(1).map((_, i) => <Chart>
                    <div className="column-container">
                        <div className="column" style={{ height: `${i / 31 * 100}%` }}>
                            <div className={`info ${i < 28 ? "right" : "left"} `}>100Р</div>
                        </div>
                    </div>
                    <span className="text">{ i + 1}</span>
                </Chart>)
            }
        </Container>
    </Component>
}

export default DoctorStatisticComponent;