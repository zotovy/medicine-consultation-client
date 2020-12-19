import React from "react";
import { observer } from "mobx-react";
import controller from "../../controllers/detail-controller";
import { CloseIcon } from "../../icons";

const FullScheduleModalWindow : React.FC = () => {
    return <div className={`full-schedule-modal-window-container ${controller.isScheduleModalWindowOpen ? "open" : ""}`}>
        <div className="modal-window">
            <CloseIcon onClick={() => controller.isScheduleModalWindowOpen = false} />
           <div className="content">
               {
                   [1, 2, 3, 4, 5, 6, 7].map(e => {
                       return <div className="day">
                           <span className="name">9 Декабря</span>
                           <div className="times">
                               <div className="time">8:00 - 9:00</div>
                               <div className="time selected">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                               <div className="time">8:00 - 9:00</div>
                           </div>
                       </div>
                   })
               }
           </div>
        </div>
    </div>
}

export default observer(FullScheduleModalWindow);