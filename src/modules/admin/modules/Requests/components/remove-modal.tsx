import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import '../routes.scss';

const Modal: React.FC = () => {
    return <div className={`modal-container ${store.isCloseModalWindowOpen ? "" : "close"}`}>
        <div className="modal">
            <h1>Хотите удалить запрос от пользователя {store.userDataOnModalWindow.name}?</h1>
            <p>После нажатия кнопки «Удалить» запрос пользователя {store.userDataOnModalWindow.name} будет навсегда потерян. {store.userDataOnModalWindow.name} может снова подать запрос через некоторое время. Если вы хотите отменить удаление запроса нажмите на кнопку «Отменить» </p>
            <div className="buttons">
                <button id="remove" onClick={store.removeRequest}>Удалить</button>
                <button id="undo" onClick={store.undoModalWindow}>Отменить</button>
            </div>
        </div>
    </div>
}

export default observer(Modal);