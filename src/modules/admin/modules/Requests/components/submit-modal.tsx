import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import '../routes.scss';

const Modal: React.FC = () => {
    return <div className={`modal-container ${store.isSubmitModalWindowOpen ? "" : "close"}`}>
        <div className="modal">
            <h1>Хотите подтвердить запрос от пользователя {store.userDataOnModalWindow.name}?</h1>
            <p>После нажатия кнопки «Подтвердить» запрос пользователя {store.userDataOnModalWindow.name} будет подтвержден. Для пользователя {store.userDataOnModalWindow.name} будет автоматически создан аккаунт доктора и отправлено письмо на его email. Если вы хотите отменить подтверждение запроса нажмите на кнопку «Отменить» </p>
            <div className="buttons">
                <button id="submit" onClick={store.submitRequest}>Подтвердить</button>
                <button id="undo" onClick={store.undoModalWindow}>Отменить</button>
            </div>
        </div>
    </div>
}

export default observer(Modal);