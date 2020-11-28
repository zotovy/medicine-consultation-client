import React from "react";

type IconProps = {
    className?: string,
};

export const AccountIcon : React.FC<IconProps> = ({className}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
        <path id="Icon_ionic-md-person" data-name="Icon ionic-md-person" d="M18,18a6.75,6.75,0,1,0-6.75-6.75A6.77,6.77,0,0,0,18,18Zm0,3.375c-4.472,0-13.5,2.278-13.5,6.75V31.5h27V28.125C31.5,23.653,22.472,21.375,18,21.375Z" transform="translate(-4.5 -4.5)" fill="#ccc"/>
    </svg>
}

export const ConsultationIcon : React.FC<IconProps> = ({className}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="27.574" height="27" viewBox="0 0 27.574 27">
        <path id="Icon_map-doctor" data-name="Icon map-doctor" d="M24.8,7.614H21.975v-3A3.853,3.853,0,0,0,18.13.72H10.885A3.852,3.852,0,0,0,7.039,4.611v3H4.21A3.426,3.426,0,0,0,.72,11.024V24.241A3.484,3.484,0,0,0,4.21,27.72H24.8a3.485,3.485,0,0,0,3.49-3.48V11.024A3.427,3.427,0,0,0,24.8,7.614Zm-15.467-3a1.659,1.659,0,0,1,1.548-1.594H18.13a1.66,1.66,0,0,1,1.548,1.594v3H9.337Zm11.489,15.64H16.805v4.021h-4.6V20.252H8.188v-4.6h4.021V11.635h4.6v4.021h4.021v4.6Z" transform="translate(-0.72 -0.72)" fill="#ccc"/>
    </svg>
}

export const ReviewsIcon : React.FC<IconProps> = ({className}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="30.857" height="27" viewBox="0 0 30.857 27">
        <path id="Icon_awesome-comment-dots" data-name="Icon awesome-comment-dots" d="M15.429,2.25C6.907,2.25,0,7.861,0,14.786a11.126,11.126,0,0,0,3.435,7.877,15.332,15.332,0,0,1-3.3,5.774.479.479,0,0,0-.09.524.472.472,0,0,0,.44.289,13.783,13.783,0,0,0,8.474-3.1,18.38,18.38,0,0,0,6.473,1.169c8.522,0,15.429-5.611,15.429-12.536S23.95,2.25,15.429,2.25ZM7.714,16.714a1.929,1.929,0,1,1,1.929-1.929A1.927,1.927,0,0,1,7.714,16.714Zm7.714,0a1.929,1.929,0,1,1,1.929-1.929A1.926,1.926,0,0,1,15.429,16.714Zm7.714,0a1.929,1.929,0,1,1,1.929-1.929A1.926,1.926,0,0,1,23.143,16.714Z" transform="translate(0 -2.25)" fill="#ccc"/>
    </svg>;
}

export const NotificationIcon : React.FC<IconProps> = ({className}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="22.493" height="28.132" viewBox="0 0 22.493 28.132">
        <g id="Icon_ionic-ios-notifications" data-name="Icon ionic-ios-notifications" transform="translate(-6.761 -3.93)">
            <path id="Контур_93" data-name="Контур 93" d="M17.993,32.063c2.187,0,3.382-1.547,3.382-3.727H14.6C14.6,30.516,15.8,32.063,17.993,32.063Z" fill="#ccc"/>
            <path id="Контур_94" data-name="Контур 94" d="M28.969,24.764c-1.083-1.427-3.213-2.264-3.213-8.655,0-6.56-2.9-9.2-5.6-9.83-.253-.063-.436-.148-.436-.415v-.2a1.716,1.716,0,1,0-3.431,0v.2c0,.26-.183.352-.436.415-2.707.64-5.6,3.27-5.6,9.83,0,6.391-2.13,7.221-3.213,8.655A1.4,1.4,0,0,0,8.163,27H27.858A1.4,1.4,0,0,0,28.969,24.764Z" fill="#ccc"/>
        </g>
    </svg>
}

export const LinkIcon : React.FC<IconProps> = ({ }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
        <path id="Icon_awesome-link" data-name="Icon awesome-link" d="M22.965,13.035a10.682,10.682,0,0,1,.025,15.088l-.025.026L18.24,32.875A10.687,10.687,0,0,1,3.126,17.76l2.609-2.609a1.124,1.124,0,0,1,1.919.746A12.956,12.956,0,0,0,8.335,19.6a1.132,1.132,0,0,1-.266,1.168l-.92.92a5.063,5.063,0,1,0,7.114,7.2l4.725-4.724a5.061,5.061,0,0,0,0-7.16,5.267,5.267,0,0,0-.727-.6,1.128,1.128,0,0,1-.488-.886,2.8,2.8,0,0,1,.823-2.1l1.48-1.48a1.13,1.13,0,0,1,1.447-.122,10.721,10.721,0,0,1,1.443,1.209Zm9.909-9.91a10.7,10.7,0,0,0-15.114,0L13.035,7.85l-.025.026a10.69,10.69,0,0,0,1.468,16.3,1.13,1.13,0,0,0,1.447-.122l1.48-1.48a2.8,2.8,0,0,0,.823-2.1,1.128,1.128,0,0,0-.488-.886,5.267,5.267,0,0,1-.727-.6,5.061,5.061,0,0,1,0-7.16L21.738,7.1a5.063,5.063,0,1,1,7.114,7.2l-.92.92a1.132,1.132,0,0,0-.266,1.168,12.956,12.956,0,0,1,.681,3.707,1.124,1.124,0,0,0,1.919.746l2.609-2.609a10.7,10.7,0,0,0,0-15.114Z" transform="translate(0 0)" fill="#ccc"/>
    </svg>;
}

export const PasswordIcon : React.FC<IconProps> = ({className}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="19.81" height="26" viewBox="0 0 19.81 26">
        <path id="Icon_material-lock" data-name="Icon material-lock" d="M23.333,10.167H22.1V7.69a6.19,6.19,0,1,0-12.381,0v2.476H8.476A2.483,2.483,0,0,0,6,12.643V25.024A2.483,2.483,0,0,0,8.476,27.5H23.333a2.483,2.483,0,0,0,2.476-2.476V12.643A2.483,2.483,0,0,0,23.333,10.167ZM15.9,21.31a2.476,2.476,0,1,1,2.476-2.476A2.483,2.483,0,0,1,15.9,21.31Zm3.838-11.143H12.067V7.69a3.838,3.838,0,1,1,7.676,0Z" transform="translate(-6 -1.5)" fill="#ccc"/>
    </svg>
}

export const LogoutIcon : React.FC<IconProps> = ({className}) => {
    return <svg id="logout" xmlns="http://www.w3.org/2000/svg" width="26.835" height="26.746" viewBox="0 0 26.835 26.746">
        <g id="Сгруппировать_91" data-name="Сгруппировать 91" transform="translate(12.348 0)">
            <g id="Сгруппировать_90" data-name="Сгруппировать 90">
                <path id="Контур_97" data-name="Контур 97" d="M1.114,25.367h10.03a1.115,1.115,0,0,0,1.114-1.114V4.193a1.115,1.115,0,0,0-1.114-1.114H1.114a1.114,1.114,0,0,1,0-2.229h10.03a3.347,3.347,0,0,1,3.343,3.343v20.06A3.347,3.347,0,0,1,11.144,27.6H1.114a1.114,1.114,0,1,1,0-2.229Z" transform="translate(0 -0.85)" fill="#ff3b30"/>
            </g>
        </g>
        <g id="Сгруппировать_93" data-name="Сгруппировать 93" transform="translate(0 5.572)">
            <g id="Сгруппировать_92" data-name="Сгруппировать 92">
                <path id="Контур_98" data-name="Контур 98" d="M170.432,114.172l6.776-6.687a1.114,1.114,0,1,1,1.565,1.587l-4.842,4.779h12.975a1.114,1.114,0,0,1,0,2.229H173.93l4.842,4.779a1.114,1.114,0,1,1-1.565,1.587l-6.776-6.687a1.114,1.114,0,0,1,0-1.587Z" transform="translate(-170.1 -107.165)" fill="#ff3b30"/>
            </g>
        </g>
    </svg>;
}

export const IconClass : React.FC<IconProps> = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="26.413" height="23.111" viewBox="0 0 26.413 23.111">
        <path id="Icon_awesome-camera" data-name="Icon awesome-camera" d="M26.413,8.028V22.885a2.477,2.477,0,0,1-2.476,2.476H2.476A2.477,2.477,0,0,1,0,22.885V8.028A2.477,2.477,0,0,1,2.476,5.552h4.54l.635-1.7a2.473,2.473,0,0,1,2.316-1.6h6.474a2.473,2.473,0,0,1,2.316,1.6l.64,1.7h4.54A2.477,2.477,0,0,1,26.413,8.028ZM19.4,15.456a6.19,6.19,0,1,0-6.19,6.19A6.2,6.2,0,0,0,19.4,15.456Zm-1.651,0a4.54,4.54,0,1,1-4.54-4.54A4.546,4.546,0,0,1,17.746,15.456Z" transform="translate(0 -2.25)" fill="#fff"/>
    </svg>
}

export const NotFoundIcon : React.FC<IconProps> = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="179" height="150" viewBox="0 0 179 150">
        <g id="Сгруппировать_191"  transform="translate(-913 -455)">
            <ellipse id="Эллипс_44"  cx="89.5" cy="16" rx="89.5" ry="16" transform="translate(913 573)" fill="#f7f7f7"/>
            <path id="Контур_138"  d="M14178.086,1995l-20.562-26.3H14108v71.14Z" transform="translate(-13107 -1452)" fill="#aeb8c2"/>
            <path id="Контур_137" d="M14108,1995l20.563-26.3h49.523v71.14Z" transform="translate(-13174 -1452)" fill="#aeb8c2"/>
            <rect id="Прямоугольник_306" width="95" height="125" rx="5" transform="translate(955 455)" fill="#f5f5f7"/>
            <path id="Прямоугольник_304" d="M0,0H137a0,0,0,0,1,0,0V48a5,5,0,0,1-5,5H5a5,5,0,0,1-5-5V0A0,0,0,0,1,0,0Z" transform="translate(934 543)" fill="#dce0e6"/>
            <path id="Прямоугольник_305" d="M0,0H68a0,0,0,0,1,0,0V12A15,15,0,0,1,53,27H15A15,15,0,0,1,0,12V0A0,0,0,0,1,0,0Z" transform="translate(969 540)" fill="#f5f5f7"/>
            <rect id="Прямоугольник_307" width="69" height="38" rx="3" transform="translate(968 467)" fill="#dce0e6"/>
        </g>
    </svg>;
}

export const ChevronIcon: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="12.621" height="22.243" viewBox="0 0 12.621 22.243">
        <path id="Icon_feather-chevron-down" data-name="Icon feather-chevron-down" d="M0,9,9,0l9,9" transform="translate(11.121 2.121) rotate(90)" fill="none" stroke="#000" strokeLinecap="round" stroke-linejoin="round" strokeWidth="3" />
    </svg>
}

export const CloseIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="13.426" height="13.423" viewBox="0 0 13.426 13.423">
        <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z" transform="translate(-11.285 -11.289)" fill="#fff" />
    </svg>
}

export const BackIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="35.858" height="13.501" viewBox="0 0 35.858 13.501">
        <path id="Icon_ionic-ios-arrow-round-back" d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282,31.879.007a.914.914,0,0,1,0,1.828l-31.879-.007L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z" transform="translate(-7.882 -11.252)" fill="rgba(17,17,17,0.8)"/>
    </svg>;
}
