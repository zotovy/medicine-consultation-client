import dynamic from "next/dynamic";

const SettingsBalancePage = dynamic(
        // @ts-ignore
        () => import("@/modules/settings").then(module => module.SettingsBalancePage),
        { ssr: false }
);
export default SettingsBalancePage;
