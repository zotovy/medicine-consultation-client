import dynamic from "next/dynamic";

const SupportSettingsCreatePage = dynamic(
        // @ts-ignore
        () => import("@/modules/settings").then(module => module.SupportSettingsCreatePage),
        { ssr: false }
);
export default SupportSettingsCreatePage;
