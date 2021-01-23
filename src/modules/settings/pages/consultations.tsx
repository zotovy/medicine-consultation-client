import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import Navigation from "../components/navigation";
import ConsultationTile from "../components/consultation-tile";
import controller from "../controllers/consultations_controller";
import NotFound from "../components/not-found";
import NoteComponent from "../components/note";
import "../styles.scss";
import SettingsLoadingComponent from "../components/loading";
import GoBackIcon from "../components/go-back-icon";

const ConsultationsPage = () => {

    useEffect(() => {
        controller.fetchConsultations();
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/consultations"/>
    }

    if (controller.consultations.length === 0) return  <main className="consultations-page settings-page">
        <Navigation active="/consultations" />
        <NotFound text="У вас еще не было консультаций" />
    </main>

    return <main className="consultations-page settings-page">
        <NoteComponent />
        <Navigation active="/consultations" />
        <GoBackIcon/>
        <section className="content consultations">
            {
                controller.consultations.map((e, i) => <ConsultationTile
                    onShowNode={() => controller.showConsultationNode(i)}
                    consultation={e}
                    key={e.toString()} />)
            }
        </section>
    </main>

};

export default observer(ConsultationsPage);