import dynamic from "next/dynamic";

const DoctorRequestHub = dynamic(() => import("@/modules/hub/pages/doctor-hub-appoint-requests"), { ssr: false });
export default DoctorRequestHub;
