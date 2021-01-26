import React from "react";
import FindDoctorController from "../../controllers/find-doctor-controller";
import { observer } from "mobx-react";
import { CloseIcon, SearchIcon } from "../../icons";
import { TYPES, useInjection } from "../../../../container";

const CityAddModal: React.FC = () => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);
    return <div className={`city-add-modal-container ${controller.isSelectCityModalOpen ? "" : "close"}`}>
        <div className={`city-add-modal ${controller.isSelectCityModalOpen ? "" : "close"}`}>
            <h1>Выберите города</h1>
            <div className="selected">
                {
                    controller.selectedCities.map((e: any, i: number) => <div className="tile">
                        <span className="city">{e}</span>
                        <span onClick={() => controller.removeCity(i)} ><CloseIcon /></span>
                    </div>)
                }
            </div>
            <div className="add">
                <input type="text" onChange={(e) => controller.typeCity(e.target.value)} />
                <span className="icon"><SearchIcon /></span>
            </div>
            <div className="autocomplete">
                {
                    controller.queryCities.map((e: any, i: number) => <div className="tile" onClick={() => controller.addCity(i)}>{e}</div>)
                }
            </div>
            <div className="buttons">
                <button id="cancel" onClick={() => controller.isSelectCityModalOpen = false}>Отменить</button>
                <button id="submit" onClick={controller.onModalSubmit}>Подтвердить</button>
            </div>
        </div>
    </div>
}

export default observer(CityAddModal);