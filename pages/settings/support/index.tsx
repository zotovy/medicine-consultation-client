import { SupportSettingsPage } from "@/modules/settings";
export default SupportSettingsPage;

export async function getServerSideProps() {
    return {
        props: {}, // will be passed to the page component as props
    }
}