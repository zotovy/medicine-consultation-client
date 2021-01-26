import React from "react";
import { observer } from "mobx-react";
import DetailController from "../../controllers/detail-controller";
import { CloseIcon } from "../../icons";
import { TYPES, useInjection } from "../../../../container";

const FullScheduleModalWindow: React.FC = () => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);

    return <div
        className={`full-schedule-modal-window-container ${controller.isScheduleModalWindowOpen ? "open" : ""}`}>
        <div className="modal-window">
            <CloseIcon onClick={() => controller.isScheduleModalWindowOpen = false}/>
            <div className="content">
                {
                    controller.schedule.map(e => <div key={e.day} className="day">
                       <span className="name">
                           {e.day}
                       </span>
                        <div className="times">
                            {
                                !e.isWeekEnd
                                    ? e.times.map(el => <div key={`${e.day}-${el.time}`} className={`time ${el.occupied ? "selected" : ""}`}>
                                        {
                                            el.time
                                        }
                                    </div>)
                                    : <span className="text">Выходной</span>
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>
}

export default observer(FullScheduleModalWindow);