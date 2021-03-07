import dynamic from "next/dynamic";

const SettingsPasswordPage = dynamic(
        // @ts-ignore
        () => import("@/modules/settings").then(module => module.SettingsPasswordPage),
        { ssr: false }
);
export default SettingsPasswordPage;
