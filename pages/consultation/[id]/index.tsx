import dynamic from "next/dynamic"

const Page = dynamic(() => import("@/modules/video-chat"), { ssr: false });
export default Page;
