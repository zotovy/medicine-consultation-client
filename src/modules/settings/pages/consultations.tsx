import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import Navigation from "../components/navigation";
import ConsultationTile from "../components/consultation-tile";
import controller from "../controllers/consultations_controller";
import NotFound from "../components/not-found";

const ConsultationsPage = () => {

    useEffect(() => {
        controller.fetchConsultations();
    }, []);

    if (controller.isLoading) return <h1>Loading...</h1>

    if (controller.consultations.length === 0) return  <main className="consultations-page settings-page">
        <Navigation active={1} />
        <NotFound text="У вас еще небыло консультаций" />
    </main>

    return <main className="consultations-page settings-page">
        <Navigation active={1} />
        <section className="content consultations">
            {
                controller.consultations.map(e => <ConsultationTile consultation={e} key={e.toString()} />)
            }
        </section>
    </main>

};

export default observer(ConsultationsPage);