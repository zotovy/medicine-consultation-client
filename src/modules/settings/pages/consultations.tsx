import React from 'react';
import { observer } from "mobx-react";
import Navigation from "../components/navigation";
import ConsultationTile from "../components/consultation-tile";

const a = [1, 2, 6, 3, 4, 5, 5]

const ConsultationsPage = () => {
    return <main className="consultations-page settings-page">
        <Navigation active={1} />
        <section className="content consultations">
            {
                a.map(e => <ConsultationTile key={e.toString()} />)
            }
        </section>
    </main>

};

export default observer(ConsultationsPage);