import React from "react";
import "../styles.scss";
import controller from "../controllers/hub-controller"
import { observer } from "mobx-react";
const PopUp: React.FC = () => {


    return(
        <>
            <div className="hub-wrapper-popup" onClick={() => controller.closePopUp()}>
                <div className="block-popup">
                    <h2>Отменить консультацию</h2>
                    <div className="popup-text-container">
                        <h4>Вы действительно хотите отменить консультацию?</h4>
                        <h4>Данная консультация будет безвозвратно  отменена, а <span>рейтинг</span> вашего аккаунта <span>снижется</span>. Мы настоятельно рекомендуем  провести данную консультацию.</h4>
                    </div>
                    <div className="popup-buts-container">
                        <div className="popup-discard-but popup-buts">Отменить консультацию</div>
                        <div className="popup-сancel-but popup-buts" onClick={() => controller.closePopUp()}>Пока не отменять</div>
                    </div>
                    <div className="close-popup-but" onClick={() => controller.closePopUp()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.953" height="20.953" viewBox="0 0 20.953 20.953">
                            <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z" transform="translate(-7.523 -7.523)" fill="#30b9d6"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(PopUp);