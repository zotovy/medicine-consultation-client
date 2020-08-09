import React from "react";
import controller from "../../controllers/find-doctor-controller";
import { observer } from "mobx-react";
import { CloseIcon, SearchIcon } from "../../icons";

const CityAddModal: React.FC = () => {

    return <div className="city-add-modal-container close">
        <div className="city-add-modal">
            <h1>Выберите города</h1>
            <div className="selected">
                {
                    controller.selectedCities.map((e) => <div className="tile">
                        <span className="city">{e}</span>
                        <CloseIcon />
                    </div>)
                }
            </div>
            <div className="add">
                <input type="text" onChange={(e) => controller.typeCity(e.target.value)} />
                <span className="icon"><SearchIcon /></span>
            </div>
            <div className="autocomplete">
                {
                    controller.queryCities.map(e => <div className="tile">{e}</div>)
                }
            </div>
        </div>
    </div>
}

export default observer(CityAddModal);