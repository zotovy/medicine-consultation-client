import React from "react";
import Slide from "./symptoms-doctor-slide"
import ConfirmButton from '../../../components/confirm-button';

const Slider: React.FC = () => {
    return(
        <div className="slider-container">
            <div className="slider-wrapper">
                <Slide id="1" name="Никита" surname="Лебедев" imgUrl="" rating={4.5} speciality="Доктор" />
                <Slide id="2" name="Никита" surname="Лебедев" imgUrl="" rating={3.5} speciality="Доктор" />
                <Slide id="3" name="Никита" surname="Лебедев" imgUrl="" rating={2.5} speciality="Доктор" />
                <Slide id="4" name="Никита" surname="Лебедев" imgUrl="" rating={1.5} speciality="Доктор" />
                <Slide id="5" name="Никита" surname="Лебедев" imgUrl="" rating={4.5} speciality="Доктор" />
                <Slide id="6" name="Никита" surname="Лебедев" imgUrl="" rating={3.5} speciality="Доктор" />
                <Slide id="7" name="Никита" surname="Лебедев" imgUrl="" rating={2.5} speciality="Доктор" />
                <Slide id="8" name="Никита" surname="Лебедев" imgUrl="" rating={1.5} speciality="Доктор" />
            </div>
            <div className="slider-control">
                <div  className="slider-control-wrapper slider-control-wrapper-left">
                    <div className="disactive slider-button slider-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.828" height="35.657" viewBox="0 0 19.828 35.657">
                            <path id="Icon_feather-chevron-right" data-name="Icon feather-chevron-right" d="M28.5,39l-15-15,8.125-8.125L28.5,9" transform="translate(-11.5 -6.172)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        </svg>
                    </div>
                </div>
                <div className="slider-control-wrapper slider-control-wrapper-right">
                    <div className="slider-button slider-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.828" height="35.657" viewBox="0 0 19.828 35.657">
                            <path id="Icon_feather-chevron-right" data-name="Icon feather-chevron-right" d="M13.5,39l15-15L13.5,9" transform="translate(-10.672 -6.172)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        </svg>
                    </div>
                </div> 
                
                
            </div>
            
	    </div>
    )
}

export default Slider;