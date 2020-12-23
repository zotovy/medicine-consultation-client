import React from "react";

export const FullStar: React.FC<{ fill: string, className?: string }> = ({ fill, className }: { fill: string, className?: string }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="25" height="23.214" viewBox="0 0 25 23.214">
        <path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M26.3,11.411H18.093L15.6,3.967a.9.9,0,0,0-1.7,0l-2.494,7.444H3.143a.9.9,0,0,0-.893.893.656.656,0,0,0,.017.151.858.858,0,0,0,.374.631l6.747,4.754L6.8,25.367a.9.9,0,0,0,.307,1,.864.864,0,0,0,.5.218,1.094,1.094,0,0,0,.558-.2L14.75,21.7l6.585,4.693a1.046,1.046,0,0,0,.558.2.8.8,0,0,0,.5-.218.884.884,0,0,0,.307-1l-2.589-7.528,6.691-4.8.162-.14a.936.936,0,0,0,.29-.6A.945.945,0,0,0,26.3,11.411Z" transform="translate(-2.25 -3.375)" fill={fill} />
    </svg>

}

export const HalfStar: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23.214" viewBox="0 0 25 23.214">
        <path id="Icon_ionic-ios-star-half" data-name="Icon ionic-ios-star-half" d="M26.3,11.411H18.093L15.6,3.967a.9.9,0,0,0-1.7,0l-2.494,7.444H3.143a.9.9,0,0,0-.893.893.656.656,0,0,0,.017.151.858.858,0,0,0,.374.631l6.747,4.754L6.8,25.367a.9.9,0,0,0,.307,1,.864.864,0,0,0,.5.218,1.094,1.094,0,0,0,.558-.2L14.75,21.7l6.585,4.693a1.046,1.046,0,0,0,.558.2.8.8,0,0,0,.5-.218.884.884,0,0,0,.307-1l-2.589-7.528,6.691-4.8.162-.14a.936.936,0,0,0,.29-.6A.945.945,0,0,0,26.3,11.411Zm-2.645,1.964-4.453,3.2a1.567,1.567,0,0,0-.569,1.775l1.68,4.894a.224.224,0,0,1-.34.257l-4.319-3.08-.006-.006a2.081,2.081,0,0,1-.9-1.7V7.019a.109.109,0,0,1,.212-.033h0l1.652,4.922a1.56,1.56,0,0,0,1.479,1.066h5.43A.223.223,0,0,1,23.656,13.375Z" transform="translate(-2.25 -3.375)" fill="#30b9d6" />
    </svg>
}

export const Chevron = ({ fill, open, onClick, id }: { fill?: string, id?: string, open: boolean, onClick?: () => void }) => {
    return <svg id={id} xmlns="http://www.w3.org/2000/svg" onClick={onClick} width="12.621" height="22.243" viewBox="0 0 12.621 22.243" className={open ? "open" : ""}>
        <path id="Icon_feather-chevron-down" data-name="Icon feather-chevron-down" d="M0,9,9,0l9,9" transform="translate(11.121 2.121) rotate(90)" fill="none" stroke={fill ?? "#282828"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
}

export const CloseIcon = ({ onClick } : any) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="13.426" height="13.423" viewBox="0 0 13.426 13.423" onClick={onClick}>
        <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z" transform="translate(-11.285 -11.289)" fill="#fff" />
    </svg>
}

export const SearchIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="30.621" height="30.621" viewBox="0 0 30.621 30.621">
        <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3 -3)">
            <path id="Контур_102" data-name="Контур 102" d="M28.5,16.5a12,12,0,1,1-12-12A12,12,0,0,1,28.5,16.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path id="Контур_103" data-name="Контур 103" d="M31.5,31.5l-6.525-6.525" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
    </svg>;
}

export const CaretteDown = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="7.091" viewBox="0 0 12.5 7.091">
        <path id="Icon_awesome-caret-down" data-name="Icon awesome-caret-down" d="M1.635,13.5H12.453a.839.839,0,0,1,.593,1.434L7.639,20.345a.842.842,0,0,1-1.19,0L1.042,14.934A.839.839,0,0,1,1.635,13.5Z" transform="translate(-0.794 -13.5)" fill="#fff" />
    </svg>
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

export const ChevronRight = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121" viewBox="0 0 9.811 18.121">
        <path id="Icon_feather-chevron-right" d="M13.5,25l8-8-8-8" transform="translate(-12.439 -7.939)" fill="none" stroke="#ccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    </svg>
}

export const VkIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="37.876" height="22.5" viewBox="0 0 37.876 22.5">
        <path id="Icon_awesome-vk" data-name="Icon awesome-vk" d="M38.32,8.276c.26-.879,0-1.526-1.252-1.526H32.927a1.778,1.778,0,0,0-1.8,1.174A34.7,34.7,0,0,1,26.037,16.4c-.963.963-1.406,1.273-1.934,1.273-.26,0-.661-.309-.661-1.188V8.276c0-1.055-.3-1.526-1.167-1.526H15.764a1,1,0,0,0-1.055.949c0,1,1.491,1.23,1.645,4.043v6.1c0,1.336-.239,1.582-.766,1.582-1.406,0-4.823-5.161-6.848-11.067-.408-1.146-.809-1.61-1.87-1.61H2.728c-1.181,0-1.42.555-1.42,1.174,0,1.1,1.406,6.546,6.546,13.746,3.424,4.915,8.248,7.58,12.635,7.58,2.637,0,2.96-.591,2.96-1.61,0-4.7-.239-5.14,1.083-5.14.612,0,1.666.309,4.127,2.679,2.813,2.813,3.277,4.071,4.852,4.071h4.141c1.181,0,1.779-.591,1.434-1.758-.787-2.454-6.11-7.5-6.349-7.84-.612-.788-.436-1.139,0-1.842.007-.007,5.063-7.123,5.583-9.534Z" transform="translate(-1.308 -6.75)" fill="#30b9d6"/>
    </svg>
}

export const InstagramIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="31.518" height="31.511" viewBox="0 0 31.518 31.511">
        <path id="Icon_awesome-instagram" data-name="Icon awesome-instagram" d="M15.757,9.914a8.079,8.079,0,1,0,8.079,8.079A8.066,8.066,0,0,0,15.757,9.914Zm0,13.331a5.252,5.252,0,1,1,5.252-5.252,5.262,5.262,0,0,1-5.252,5.252ZM26.051,9.584A1.884,1.884,0,1,1,24.166,7.7,1.88,1.88,0,0,1,26.051,9.584ZM31.4,11.5a9.325,9.325,0,0,0-2.545-6.6,9.387,9.387,0,0,0-6.6-2.545c-2.6-.148-10.4-.148-13,0a9.373,9.373,0,0,0-6.6,2.538,9.356,9.356,0,0,0-2.545,6.6c-.148,2.6-.148,10.4,0,13a9.325,9.325,0,0,0,2.545,6.6,9.4,9.4,0,0,0,6.6,2.545c2.6.148,10.4.148,13,0a9.325,9.325,0,0,0,6.6-2.545,9.387,9.387,0,0,0,2.545-6.6c.148-2.6.148-10.392,0-12.994ZM28.041,27.281a5.318,5.318,0,0,1-3,3c-2.074.823-7,.633-9.288.633s-7.221.183-9.288-.633a5.318,5.318,0,0,1-3-3c-.823-2.074-.633-7-.633-9.288s-.183-7.221.633-9.288a5.318,5.318,0,0,1,3-3c2.074-.823,7-.633,9.288-.633s7.221-.183,9.288.633a5.318,5.318,0,0,1,3,3c.823,2.074.633,7,.633,9.288S28.863,25.214,28.041,27.281Z" transform="translate(0.005 -2.238)" fill="#30b9d6"/>
    </svg>
}

export const TelegramIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="31.497" height="26.415" viewBox="0 0 31.497 26.415">
        <path id="Icon_awesome-telegram-plane" data-name="Icon awesome-telegram-plane" d="M31.409,6.933,26.655,29.348c-.359,1.582-1.294,1.976-2.623,1.23l-7.242-5.337L13.3,28.6a1.819,1.819,0,0,1-1.455.71l.52-7.376L25.784,9.809c.584-.52-.127-.809-.907-.288L8.283,19.969,1.139,17.733c-1.554-.485-1.582-1.554.323-2.3L29.4,4.669c1.294-.485,2.426.288,2,2.264Z" transform="translate(-0.001 -4.528)" fill="#30b9d6"/>
    </svg>
}

export const WhatsAppIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 31.5 31.5">
        <path id="Icon_awesome-whatsapp" data-name="Icon awesome-whatsapp" d="M26.782,6.827A15.614,15.614,0,0,0,2.215,25.664L0,33.75l8.276-2.173a15.562,15.562,0,0,0,7.46,1.9h.007A15.76,15.76,0,0,0,31.5,17.866,15.671,15.671,0,0,0,26.782,6.827ZM15.743,30.846a12.951,12.951,0,0,1-6.609-1.807l-.471-.281L3.755,30.045l1.308-4.788-.309-.492a13,13,0,1,1,24.11-6.9,13.119,13.119,0,0,1-13.12,12.98Zm7.116-9.717c-.387-.2-2.306-1.139-2.665-1.266s-.619-.2-.879.2-1.005,1.266-1.237,1.533-.457.3-.844.1a10.617,10.617,0,0,1-5.309-4.641c-.4-.689.4-.64,1.146-2.13a.723.723,0,0,0-.035-.682c-.1-.2-.879-2.116-1.2-2.9-.316-.759-.64-.654-.879-.668s-.485-.014-.745-.014a1.445,1.445,0,0,0-1.041.485A4.383,4.383,0,0,0,7.8,14.4a7.641,7.641,0,0,0,1.589,4.036c.2.26,2.749,4.2,6.666,5.892,2.475,1.069,3.445,1.16,4.683.977a4,4,0,0,0,2.63-1.856,3.262,3.262,0,0,0,.225-1.856C23.505,21.417,23.245,21.319,22.859,21.129Z" transform="translate(0 -2.25)" fill="#30b9d6"/>
    </svg>
}

export const ViberIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="29.392" height="30.996" viewBox="0 0 29.392 30.996">
        <path id="Icon_awesome-viber" data-name="Icon awesome-viber" d="M27,3.021c-.769-.708-3.88-2.966-10.817-3,0,0-8.178-.49-12.161,3.166-2.215,2.215-3,5.466-3.081,9.491S.759,24.249,8.028,26.295h.006l-.006,3.123s-.048,1.265.787,1.519c1,.315,1.6-.648,2.56-1.683.527-.569,1.253-1.4,1.8-2.04a28.127,28.127,0,0,0,9.231-.678c1-.327,6.689-1.053,7.609-8.6.956-7.784-.46-12.7-3.014-14.921Zm.841,14.352c-.781,6.3-5.387,6.695-6.235,6.967a26.024,26.024,0,0,1-7.942.678s-3.148,3.8-4.128,4.782c-.321.321-.672.291-.666-.345,0-.418.024-5.187.024-5.187h0C2.738,22.56,3.1,16.138,3.168,12.778s.7-6.114,2.579-7.966c3.372-3.057,10.314-2.6,10.314-2.6,5.865.024,8.674,1.792,9.328,2.385,2.161,1.852,3.263,6.283,2.458,12.778Zm-8.414-4.891a.391.391,0,0,1-.781.036,1.872,1.872,0,0,0-1.973-2.052.391.391,0,0,1,.042-.781A2.632,2.632,0,0,1,19.432,12.482Zm1.229.684c.061-2.566-1.544-4.576-4.588-4.8a.391.391,0,0,1,.054-.781,5.3,5.3,0,0,1,5.315,5.6.391.391,0,0,1-.781-.018Zm2.845.811a.39.39,0,0,1-.781.006C22.689,9.05,19.4,6.362,15.413,6.332a.39.39,0,0,1,0-.781C19.874,5.581,23.464,8.662,23.506,13.977Zm-.684,5.938v.012c-.654,1.15-1.876,2.421-3.135,2.016l-.012-.018a23.267,23.267,0,0,1-6.186-3.42,15.824,15.824,0,0,1-2.566-2.566,19.642,19.642,0,0,1-1.864-2.821A18.087,18.087,0,0,1,7.483,9.746C7.078,8.487,8.343,7.264,9.5,6.61h.012a1.1,1.1,0,0,1,1.447.236s.751.9,1.071,1.338c.3.412.708,1.071.92,1.441a1.264,1.264,0,0,1-.224,1.61L12,11.816a1.065,1.065,0,0,0-.321.847,7.579,7.579,0,0,0,5.1,5.1,1.065,1.065,0,0,0,.847-.321l.581-.726a1.264,1.264,0,0,1,1.61-.224,15.684,15.684,0,0,1,2.772,1.991,1.081,1.081,0,0,1,.23,1.429Z" transform="translate(-0.927 -0.003)" fill="#30b9d6"/>
    </svg>
}

export const MailIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="33.203" height="26.3" viewBox="0 0 33.203 26.3">
        <g id="Icon_feather-mail" data-name="Icon feather-mail" transform="translate(-1.398 -4.85)">
            <path id="Контур_120" data-name="Контур 120" d="M6,6H30a3.009,3.009,0,0,1,3,3V27a3.009,3.009,0,0,1-3,3H6a3.009,3.009,0,0,1-3-3V9A3.009,3.009,0,0,1,6,6Z" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3"/>
            <path id="Контур_121" data-name="Контур 121" d="M33,9,18,19.5,3,9" fill="none" stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3"/>
        </g>
    </svg>
}



