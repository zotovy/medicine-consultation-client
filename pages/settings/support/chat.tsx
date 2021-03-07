import dynamic from "next/dynamic";

const SupportSettingsChatPage = dynamic(
        // @ts-ignore
        () => import("@/modules/settings").then(module => module.SupportSettingsChatPage),
        { ssr: false }
);
export default SupportSettingsChatPage;
