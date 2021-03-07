import dynamic from "next/dynamic";

const SupportSettingsPage = dynamic(
        // @ts-ignore
        () => import("@/modules/settings").then(module => module.SupportSettingsPage),
        { ssr: false }
);
export default SupportSettingsPage;
