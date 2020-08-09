import React from "react";
import { observer } from "mobx-react";
import Title from '../../../components/title';
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';


const FindDoctor: React.FC = () => {
    return <React.Fragment>
        <Title title="Врачи" />
        <div className="row">
            <DoctorWrapper />
            <Filter />
        </div>
    </React.Fragment>
};

export default observer(FindDoctor);