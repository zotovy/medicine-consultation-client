import React from "react";
import { observer } from "mobx-react";
import Title from '../../../components/title';
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';
import ErrorBadge from '../../../components/error-badge';
import controller from "../controllers/find-doctor-controller";


const FindDoctor: React.FC = () => {
    return <React.Fragment>
        <ErrorBadge
            isOpen={controller.isErrorBadgeOpen}
            message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
        />
        <Title title="Врачи" />
        <div className="row">
            <DoctorWrapper />
            <Filter />
        </div>
    </React.Fragment>
};

export default observer(FindDoctor);