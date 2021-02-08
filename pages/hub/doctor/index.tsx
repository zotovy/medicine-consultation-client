import dynamic from "next/dynamic";

const DoctorHub = dynamic(() => import("@/modules/hub/pages/doctor-hub"));
export default DoctorHub;
