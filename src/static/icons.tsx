import React from "react";

type Props = {
    className?: string;
}

export const AddIcon: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28.328" height="28.328" viewBox="0 0 28.328 28.328">
        <g id="Сгруппировать_78" data-name="Сгруппировать 78" transform="translate(-1026 -775.5)">
            <line id="Линия_24" data-name="Линия 24" x2="25.328" transform="translate(1027.5 789.664)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-width="3" />
            <line id="Линия_25" data-name="Линия 25" x2="25.328" transform="translate(1040.164 777) rotate(90)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-width="3" />
        </g>
    </svg>
}

export const SupportIcon: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
        <path id="Icon_ionic-ios-help-circle" data-name="Icon ionic-ios-help-circle"
              d="M16.875,3.375a13.5,13.5,0,1,0,13.5,13.5A13.5,13.5,0,0,0,16.875,3.375ZM16.6,23.106a1.338,1.338,0,1,1,1.4-1.337A1.355,1.355,0,0,1,16.6,23.106Zm2.609-6.289c-1.129.656-1.512,1.136-1.512,1.967V19.3H15.441l-.019-.558a2.7,2.7,0,0,1,1.532-2.856c1.1-.656,1.558-1.071,1.558-1.876a1.575,1.575,0,0,0-1.746-1.4,1.642,1.642,0,0,0-1.739,1.6h-2.3c.045-2.09,1.59-3.57,4.2-3.57,2.434,0,4.108,1.35,4.108,3.291A3.177,3.177,0,0,1,19.205,16.817Z"
              transform="translate(-3.375 -3.375)" fill="#30b9d6"/>
    </svg>
}

export const LongArrowIcon: React.FC<Props> = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32.367" height="11.621" viewBox="0 0 32.367 11.621" {...props}>
        <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(14.617 -6.439)">
            <path id="Контур_334" data-name="Контур 334" d="M7.5,18H38.367" transform="translate(-21.367 -5.75)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path id="Контур_335" data-name="Контур 335" d="M18,7.5l4.75,4.75L18,17" transform="translate(-5.75)" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </g>
    </svg>;
}

export const Chevron = ({ fill, open, onClick, id }: { fill?: string, id?: string, open: boolean, onClick?: () => void }) => {
    return <svg id={id} xmlns="http://www.w3.org/2000/svg" onClick={onClick} width="12.621" height="22.243" viewBox="0 0 12.621 22.243" className={open ? "open" : ""}>
        <path id="Icon_feather-chevron-down" data-name="Icon feather-chevron-down" d="M0,9,9,0l9,9" transform="translate(11.121 2.121) rotate(90)" fill="none" stroke={fill ?? "#282828"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
}