import FindDoctor, { getServerSideProps as FindDoctorGetServerSideProps } from "./pages/find-doctor";
import DetailDoctorPage, { GetServerSideProps as DetailGetServerSideProps } from './pages/detail';
import FilterCityModal from './components/filter/city-add-modal';
import SymptomsPage from './pages/symptoms';
import ErrorSymptomsPage from "./components/symptoms/error-page";

export {
    FindDoctor,
    FilterCityModal,
    DetailDoctorPage,
    SymptomsPage,
    DetailGetServerSideProps,
    FindDoctorGetServerSideProps,
    ErrorSymptomsPage
}