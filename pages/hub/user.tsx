import dynamic from "next/dynamic";

const UserHub = dynamic(() => import("@/modules/hub/pages/user-hub"), { ssr: false });

export default UserHub;
