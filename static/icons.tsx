import React from "react";

type Props = {
    className?: string;
}

export const AddIcon: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="28.328" height="28.328" viewBox="0 0 28.328 28.328">
        <g id="Сгруппировать_78" data-name="Сгруппировать 78" transform="translate(-1026 -775.5)">
            <line id="Линия_24" data-name="Линия 24" x2="25.328" transform="translate(1027.5 789.664)" fill="none" stroke="#30b9d6" strokeLinecap="round" strokeWidth="3" />
            <line id="Линия_25" data-name="Линия 25" x2="25.328" transform="translate(1040.164 777) rotate(90)" fill="none" stroke="#30b9d6" strokeLinecap="round" strokeWidth="3" />
        </g>
    </svg>
}

export const SupportIcon: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
        <path id="Icon_ionic-ios-help-circle" d="M16.875,3.375a13.5,13.5,0,1,0,13.5,13.5A13.5,13.5,0,0,0,16.875,3.375ZM16.6,23.106a1.338,1.338,0,1,1,1.4-1.337A1.355,1.355,0,0,1,16.6,23.106Zm2.609-6.289c-1.129.656-1.512,1.136-1.512,1.967V19.3H15.441l-.019-.558a2.7,2.7,0,0,1,1.532-2.856c1.1-.656,1.558-1.071,1.558-1.876a1.575,1.575,0,0,0-1.746-1.4,1.642,1.642,0,0,0-1.739,1.6h-2.3c.045-2.09,1.59-3.57,4.2-3.57,2.434,0,4.108,1.35,4.108,3.291A3.177,3.177,0,0,1,19.205,16.817Z" transform="translate(-3.375 -3.375)" fill="#ccc"/>
    </svg>


}

export const LongArrowIcon: React.FC<Props> = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32.367" height="11.621" viewBox="0 0 32.367 11.621" {...props}>
        <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(14.617 -6.439)">
            <path id="Контур_334" data-name="Контур 334" d="M7.5,18H38.367" transform="translate(-21.367 -5.75)" fill="none" stroke="#30b9d6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path id="Контур_335" data-name="Контур 335" d="M18,7.5l4.75,4.75L18,17" transform="translate(-5.75)" fill="none" stroke="#30b9d6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
    </svg>;
}

export const Chevron = ({ fill, open, onClick, id }: { fill?: string, id?: string, open: boolean, onClick?: () => void }) => {
    return <svg id={id} xmlns="http://www.w3.org/2000/svg" onClick={onClick} width="12.621" height="22.243" viewBox="0 0 12.621 22.243" className={open ? "open" : ""}>
        <path id="Icon_feather-chevron-down" data-name="Icon feather-chevron-down" d="M0,9,9,0l9,9" transform="translate(11.121 2.121) rotate(90)" fill="none" stroke={fill ?? "#282828"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
}

export const SendIcon: React.FC<Props> = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="19.007" height="19.005" viewBox="0 0 19.007 19.005">
        <path id="Icon_ionic-ios-send" data-name="Icon ionic-ios-send" d="M22.911,4.545,4.738,12.466a.417.417,0,0,0,.015.757L9.669,16a.793.793,0,0,0,.906-.089l9.693-8.356c.064-.054.218-.158.277-.1s-.035.213-.089.277L12.07,17.179a.79.79,0,0,0-.079.946L15.2,23.277a.418.418,0,0,0,.752-.01L23.47,5.095A.417.417,0,0,0,22.911,4.545Z" transform="translate(-4.503 -4.503)" fill="#fff" />
    </svg>;
}

export const WarningIcon = () => {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 512.001 512.001"  >
        <g>
            <g>
                <path d="M503.839,395.379l-195.7-338.962C297.257,37.569,277.766,26.315,256,26.315c-21.765,0-41.257,11.254-52.139,30.102
                L8.162,395.378c-10.883,18.85-10.883,41.356,0,60.205c10.883,18.849,30.373,30.102,52.139,30.102h391.398
                c21.765,0,41.256-11.254,52.14-30.101C514.722,436.734,514.722,414.228,503.839,395.379z M477.861,440.586
                c-5.461,9.458-15.241,15.104-26.162,15.104H60.301c-10.922,0-20.702-5.646-26.162-15.104c-5.46-9.458-5.46-20.75,0-30.208
                L229.84,71.416c5.46-9.458,15.24-15.104,26.161-15.104c10.92,0,20.701,5.646,26.161,15.104l195.7,338.962
                C483.321,419.836,483.321,431.128,477.861,440.586z"/>
            </g>
        </g>
        <g>
            <g>
                <rect x="241.001" y="176.01" width="29.996" height="149.982" />
            </g>
        </g>
        <g>
            <g>
                <path d="M256,355.99c-11.027,0-19.998,8.971-19.998,19.998s8.971,19.998,19.998,19.998c11.026,0,19.998-8.971,19.998-19.998
                S267.027,355.99,256,355.99z"/>
            </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
    </svg>

}
