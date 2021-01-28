import React, { useEffect } from "react";
import { observer } from "mobx-react";
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';
import ErrorBadge from '@/components/error-badge';
import FindDoctorController, { Config } from "../controllers/find-doctor-controller";
import { getContainer, TYPES, useInjection } from "../../../container";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next";
import Menu from "@/components/menu";
import CityAddModal from "@/modules/doctors/components/filter/city-add-modal";


type Props = {
    doctors: DoctorType[],
}

const FindDoctor: NextPage<Props> = (props) => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);
    const history = useRouter();

        console.log(7, props.doctors)

    // Scroll component
    useEffect(() => {
        const config = controller.getConfig(history.query);

        if (controller.doctors.length === 0) controller.setDoctors(config, props.doctors);
        else controller.fetchDoctors(config);

        document.getElementsByClassName("doctor-module")[0].addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        const element = document.getElementsByClassName("doctor-module")[0];

        if (element.scrollHeight - element.scrollTop - 1 <= element.clientHeight) {
            controller.loadNextPage();
        }
    }

    return <div className="doctor-module">
        <CityAddModal/>
        <Menu/>
        <main className=" find-doctor-page">
            <ErrorBadge
                isOpen={controller.isErrorBadgeOpen}
                message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
            />
            <Filter/>
            <DoctorWrapper/>
            {/* <div className={`loading-badge ${controller.isLoading ? "" : "close"}`}>
            <LoadingIndicator />
        </div> */}
        </main>
    </div>
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const container = getContainer();
    const controller = container.get<FindDoctorController>(TYPES.findDoctorController);
    const config = controller.getConfig(ctx.query);
    console.log(config);
    controller.onComponentReady(config);
    const doctors = await controller._fetchDoctors();
    return { props: { doctors } };
}

export default observer(FindDoctor);