import dynamic from "next/dynamic"
const HubPage = dynamic(() => import("@/modules/hub"), { ssr: false });
export default HubPage;
