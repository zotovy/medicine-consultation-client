import React from "react";
import Doc from "./document";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { TYPES, useInjection } from "container";
import HubController from "../controllers/hub-controller";
// import { useWindowWidth } from "@react-hook/window-size";

type Props = {
    imgUrl: string;
    patientName: string;
    number: number;
    sex: boolean;
    chronicDiseases: string;
    symptoms: string;
    birthday: string;
    dateTo: string;
    dateFrom: string;
    id: string;
    documents: [];
};

const Card: React.FC<Props> = (props: Props) => {
    const controller = useInjection<HubController>(TYPES.hubController);

    const date = new Date(`${props.dateFrom}`),
        dateTo = new Date(`${props.dateTo}`),
        dateFrom = new Date(`${props.dateFrom}`),
        months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;

    const history = useRouter();
    const goToConsultation = (): void => {
        // controller.sendAthorize(localStorage.getItem("accessToken"));
        history.push(`/consultation/${props.id}`);
    }

    function agetostr(age: number = -1) {
        let txt;
        if (age == -1) {
            return txt = 'Не указано'
        }
        let count: number = age % 100;
        if (count >= 5 && count <= 20) {
            txt = 'лет';
        } else {
            count = count % 10;
            if (count == 1) {
                txt = 'год';
            } else if (count >= 2 && count <= 4) {
                txt = 'года';
            } else {
                txt = 'лет';
            }
        }
        return age + " " + txt;
    }

    function formatPhone(phone: number) {
        let txt: any = String(phone);

        if (txt[0] == "8") {
            txt.splice(0, " ", "7")
        }
        if (txt[0] == "7") {
            txt = "+" + txt;
        }

        let lenTxt = txt.length;
        let tt: any = txt.split('');

        if (lenTxt == 12) {
            tt.splice(2, "", "");
            tt.splice(3, "", "(");
            tt.splice(7, "", ")");
            tt.splice(8, "", " ");
            tt.splice(11, "", "-");
            tt.splice(14, "", "-");
        } else if (lenTxt == 13) {
            tt.splice(3, "", "(");
            tt.splice(7, "", ")");
            tt.splice(11, "", "-");
            tt.splice(14, "", "-");
        }

        return tt.join('')
    }

    function formatDate(dateHours: string, dateMinutes: string) {
        if (dateHours.length === 1) {
            dateHours = "0" + dateHours;
        }
        if (dateMinutes.length === 1 && +dateMinutes <= 6) {
            dateMinutes = "0" + dateMinutes;
        }
        return `${dateHours}:${dateMinutes}`
    }

    function formatAge(date: string) {
        let age = new Date(date),
            currentDate = new Date();
        return +currentDate.getFullYear() - +age.getFullYear();
    }

    // const width = useWindowWidth() ?? 1920;
    const width = 1920;

    return (
        <>
            <div className="patient-card-container">
                <div className="patient-card-header">
                    <div>
                        <div className="card-profile-pic" style={{ backgroundImage: `url(${img})` }}></div>
                        <div className="card-name-surname-container">
                            <h3 className="card-name-surname-middlename">{props.patientName}</h3>
                            <h4 className="card-consultation-data">{date.getDate()}&nbsp;{months[+date.getMonth()]},&nbsp;{formatDate(`${dateFrom.getHours()}`, `${dateFrom.getMinutes()}`)} – {formatDate(`${dateTo.getHours()}`, `${dateTo.getMinutes()}`)}</h4>
                        </div>
                    </div>
                    <div>
                        <div className="card-buttons">
                            <Link href={`/consultation/${props.id}`}>
                                <div className="card-connect-button">Подключиться</div>
                            </Link>
                            <div className="card-discard-button" onClick={() => controller.openPopUp()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                    <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close"
                                          d="M14.92,13.144l5.357-5.359A1.256,1.256,0,0,0,18.5,6.01l-5.357,5.359L7.787,6.01A1.256,1.256,0,1,0,6.012,7.786l5.357,5.359L6.012,18.5a1.256,1.256,0,0,0,1.775,1.776l5.357-5.359L18.5,20.279A1.256,1.256,0,0,0,20.277,18.5Z"
                                          transform="translate(-5.643 -5.644)" fill="#30b9d6"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="patient-card-body">
                    <p className="card-section-title">Информация</p>
                    <div className="card-patient-information">
                        {
                            width > 1200
                                ? <React.Fragment>
                                    <div className="card-col-1">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-p">ФИО:</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span className="card-patient-information-p">Возраст:</span>
                                        </div>
                                    </div>
                                    <div className="card-col-2">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-a">{props.patientName}</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span
                                                className="card-patient-information-a">{agetostr(formatAge(props.birthday))}</span>
                                        </div>
                                    </div>
                                    <div className="card-col-3">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-p">Телефон:</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span className="card-patient-information-p">Пол:</span>
                                        </div>
                                    </div>
                                    <div className="card-col-4">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-a">{formatPhone(props.number)}</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span
                                                className="card-patient-information-a">{props.sex == true ? "Мужской" : "Женский"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <React.Fragment/>
                        }
                        {
                            width < 1200
                                ? <React.Fragment>
                                    <div className="card-col-1">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-p">ФИО:</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span className="card-patient-information-p">Возраст:</span>
                                        </div>
                                        <div className="card-row-3">
                                            <span className="card-patient-information-p">Телефон:</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span className="card-patient-information-p">Пол:</span>
                                        </div>
                                    </div>
                                    <div className="card-col-2">
                                        <div className="card-row-1">
                                            <span className="card-patient-information-a">{props.patientName}</span>
                                        </div>
                                        <div className="card-row-2">
                                            <span
                                                className="card-patient-information-a">{agetostr(formatAge(props.birthday))}</span>
                                        </div>
                                        <div className="card-row-3">
                                            <span className="card-patient-information-a">{formatPhone(props.number)}</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span
                                                className="card-patient-information-a">{props.sex == true ? "Мужской" : "Женский"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <React.Fragment/>
                        }
                    </div>
                    <div className="card-info-symps">
                        {
                            width > 1200
                                ? <React.Fragment>
                                    <div className="card-col-5">
                                        <div className="card-row-3">
                                            <span className="card-patient-information-p">Хронические заболевания:</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span className="card-patient-information-p">Cимптомы:</span>
                                        </div>
                                    </div>
                                    <div className="card-col-6">
                                        <div className="card-row-3">
                                            <span
                                                className="card-patient-information-a">{props.chronicDiseases.length !== 0 ? props.chronicDiseases : "Отсутствуют"}</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span
                                                className="card-patient-information-a">{props.symptoms.length !== 0 ? props.symptoms : "Отсутствуют"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <React.Fragment/>
                        }
                        {
                            width < 1201 && width <= 976
                                ? <React.Fragment>
                                    <div className="card-col-5">
                                        <div className="card-row-3">
                                            <span className="card-patient-information-p">Хронические заболевания:</span>
                                        </div>
                                        <div className="card-row-3">
                                            <span
                                                className="card-patient-information-a">{props.chronicDiseases.length !== 0 ? props.chronicDiseases : "Отсутствуют"}</span>
                                        </div>
                                    </div>
                                    <div className="card-col-6">
                                        <div className="card-row-4">
                                            <span className="card-patient-information-p">Cимптомы:</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span
                                                className="card-patient-information-a">{props.symptoms.length !== 0 ? props.symptoms : "Отсутствуют"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <React.Fragment/>
                        }
                        {
                            width < 975
                                ? <React.Fragment>
                                    <div className="card-col-5">
                                        <div className="card-row-3">
                                            <span className="card-patient-information-p">Хронические заболевания:</span>
                                        </div>
                                        <div className="card-row-3">
                                            <span
                                                className="card-patient-information-a">{props.chronicDiseases.length !== 0 ? props.chronicDiseases : "Отсутствуют"}</span>
                                        </div>
                                    </div>
                                    <div className="card-col-6">
                                        <div className="card-row-4">
                                            <span className="card-patient-information-p">Cимптомы:</span>
                                        </div>
                                        <div className="card-row-4">
                                            <span
                                                className="card-patient-information-a">{props.symptoms.length !== 0 ? props.symptoms : "Отсутствуют"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <React.Fragment/>
                        }
                    </div>
                    <p className="card-section-title">Документы</p>
                    <div className="card-info-docs">
                        {props.documents !== undefined ? props.documents.map((e: any) => <Doc name={e.name}
                                                                                              type={e.type}
                                                                                              size={e.size}
                                                                                              path={e.path}/>) :
                            <span className='doc-null-text'>Документы не приложены</span>}
                    </div>
                </div>
                <div className="patient-card-footer">
                    <p className="card-notification">Консультация
                        пройдет {date.getDate()}&nbsp;{months[+date.getMonth()]} с {formatDate(`${dateFrom.getHours()}`, `${dateFrom.getMinutes()}`)} до {formatDate(`${dateTo.getHours()}`, `${dateTo.getMinutes()}`)}.
                        Вы можете <span onClick={() => controller.openPopUp()}>отказаться</span> от этой консультации до
                        её начала. После завершения консультации вы
                        получите {JSON.parse(localStorage.getItem("user") as string).price}₽ на свой баланс.</p>
                </div>
            </div>
        </>
    )
}

export default observer(Card);
