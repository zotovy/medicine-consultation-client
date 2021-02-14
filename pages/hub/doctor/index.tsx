import dynamic from "next/dynamic";

const DoctorHub = dynamic(() => import("@/modules/hub/pages/doctor-hub"), { ssr: false });
export default DoctorHub;
