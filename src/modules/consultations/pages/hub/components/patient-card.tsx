import React from "react";
import "../styles.scss";
import Doc from "./document";

type Props = {
    imgUrl: string;
    name: string;
    surname: string;
    middlename: string;
    number: string;
    sex: string;
    chronicDiseases: string;
    symptoms: string;
    date: string | any;
    age?: number;
    fullname: string;
    id: string;
};

const Error: React.FC<Props> = (props: Props) => {

    const date = new Date(`${props.date}`);
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const img = "https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg" ?? props.imgUrl;

    function agetostr(age: number = -1) {
        let txt;
        if(age == -1){
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
        return age+" "+txt;
    }

    return(
        <>
            <div className="patient-card-container">
                <div className="patient-card-header">
                    <div>
                        <div className="card-profile-pic" style={{ backgroundImage: `url(${img})` }}></div>
                        <div className="card-name-surname-container">
                            <h3 className="card-name-surname-middlename">{props.surname}&nbsp;{props.name}&nbsp;{props.middlename}</h3>
                            <h4 className="card-consultation-data">{date.getDate()}&nbsp;{months[+date.getMonth()]},&nbsp;{date.getHours()}:{date.getMinutes()}</h4>
                        </div> 
                    </div>
                    <div>
                        <div className="card-buttons">
                            <div className="card-connect-button">Подключиться</div>
                            <div className="card-discard-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                    <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M14.92,13.144l5.357-5.359A1.256,1.256,0,0,0,18.5,6.01l-5.357,5.359L7.787,6.01A1.256,1.256,0,1,0,6.012,7.786l5.357,5.359L6.012,18.5a1.256,1.256,0,0,0,1.775,1.776l5.357-5.359L18.5,20.279A1.256,1.256,0,0,0,20.277,18.5Z" transform="translate(-5.643 -5.644)" fill="#30b9d6"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="patient-card-body">
                    <p className="card-section-title">Информация</p>
                    <div className="card-patient-information">
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
                                <span className="card-patient-information-a">{props.fullname}</span>
                            </div>
                            <div className="card-row-2">
                                <span className="card-patient-information-a">{agetostr(props.age)}</span>
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
                                <span className="card-patient-information-a">{props.number}</span>
                            </div>
                            <div className="card-row-2">
                                <span className="card-patient-information-a">{props.sex}</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-info-symps">
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
                                <span className="card-patient-information-a">{props.chronicDiseases.length !== 0 ? props.chronicDiseases : "Отсутствуют"}</span>
                            </div>
                            <div className="card-row-4">
                                <span className="card-patient-information-a">{props.symptoms}</span>
                            </div>
                        </div>
                    </div>
                    <p className="card-section-title">Документы</p>
                    <div className="card-info-docs">
                        <Doc name="Анализ_Который.pdf" type="PDF" size="1.5 MB" path=""/>
                        <Doc name="Анализ.pdf" type="PDF" size="1.5 MB" path=""/>
                        <Doc name="Анализ.pdf" type="PDF" size="1.5 MB" path=""/>
                        <Doc name="Анализ.pdf" type="PDF" size="1.5 MB" path=""/>
                        <Doc name="Анализ.pdf" type="PDF" size="1.5 MB" path=""/>
                    </div>   
                </div>
                <div className="patient-card-footer">
                    <p className="card-notification">Консультация пройдет {date.getDate()}&nbsp;{months[+date.getMonth()]} в {date.getHours()}:{date.getMinutes()}. Вы можете <u>отказаться</u> от этой консультации до её начала. После завершения консультации вы получите ?₽ на свой баланс.</p>
                </div>       
            </div>
        </>
    )
}

export default Error;