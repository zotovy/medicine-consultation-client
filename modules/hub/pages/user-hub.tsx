import React, { useEffect } from "react";
import { useRouter } from "next/router"
import { NextPage } from "next";
import Head from "next/head";
import { observer } from "mobx-react";
import UserHubController from "@/modules/hub/controllers/user-hub-controller";
import { useInjection, TYPES } from "container";

import Layout from "@/modules/hub/components/page-layout";
import Menu from "@/components/menu";
import HeaderComponent from "@/modules/hub/components/header";
import UserCard from "@/modules/hub/components/user-card";
import NoData from "@/modules/hub/components/no-data";
import { LoadingIndicator } from "@/components/loading-indicator";
import LoadingContainer from "@/modules/hub/containers/loading";


const UserHub: NextPage = () => {
    const controller = useInjection<UserHubController>(TYPES.userHubController);
    const router = useRouter();
    const isUser = localStorage.getItem("isUser") === "true";

    useEffect(() => {
        // redirect to correct hub based on isUser
        if (!localStorage.getItem("isUser")) router.push("/login");
        if (!isUser) router.push("/hub/doctor");

        controller.load();
    }, []);

    // return empty page while redirecting to correct hub page
    if (!isUser) return <React.Fragment/>

    // show spinner if loading some data
    if (controller.isLoading) {
        return <LoadingContainer title="Консультации" />
    }

    if (controller.isLoading) return <React.Fragment>
        <Head>
            <title>Консультации</title>
        </Head>
        <Menu/>
        <Layout>
            <div className="loading">
                <LoadingIndicator/>
            </div>
        </Layout>
    </React.Fragment>

    return <React.Fragment>
        <Head>
            <title>Hub</title>
        </Head>
        <Menu/>

        <Layout>
            <HeaderComponent title="Консультации"  />
            {
                controller.appoints.length > 0
                    ? <div className="cards">
                        {
                            controller.appoints.map(e => {
                                const consultation = e.consultation as Consultation;
                                const doctor = consultation.doctor as DoctorType;

                                return <UserCard
                                        key={e._id}
                                        date={{ from: e.from, to: e.to, }}
                                        name={doctor.fullName}
                                        onConnect={() => router.push(`/consultation/${consultation._id}`)}
                                        onReject={() => controller.reject(e._id)}/>
                            })
                        }

                    </div>
                    : <NoData title="У вас ещё пока нет ни одной консультации"/>
            }

            <div className="space" style={{ marginTop: "40px" }} />
            {
                controller.appointsRequests.length === 0
                        ? <React.Fragment/>
                        : <HeaderComponent
                                title="Неподтвержденные консультации"
                                subtitle="Эти консультации еще не подтвердил доктор. Мы уведомим вас если доктор
                                откажется от нее"/>
            }
            <div className="cards">
                {
                    controller.appointsRequests.map(e => {
                        const appointment = e.appointment as IAppointment;
                        const doctor = e.doctor as DoctorType;

                        return <UserCard
                                key={e._id}
                                date={{  from: appointment.from, to: appointment.to, }}
                                name={doctor.fullName} />
                    })
                }
            </div>
        </Layout>
    </React.Fragment>;
}

export default observer(UserHub);
