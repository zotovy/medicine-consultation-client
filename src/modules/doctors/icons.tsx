import React from "react";
import { PropTypes } from "mobx-react";

export const FullStar: React.FC<{ fill: string }> = ({ fill }: { fill: string }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23.214" viewBox="0 0 25 23.214">
        <path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M26.3,11.411H18.093L15.6,3.967a.9.9,0,0,0-1.7,0l-2.494,7.444H3.143a.9.9,0,0,0-.893.893.656.656,0,0,0,.017.151.858.858,0,0,0,.374.631l6.747,4.754L6.8,25.367a.9.9,0,0,0,.307,1,.864.864,0,0,0,.5.218,1.094,1.094,0,0,0,.558-.2L14.75,21.7l6.585,4.693a1.046,1.046,0,0,0,.558.2.8.8,0,0,0,.5-.218.884.884,0,0,0,.307-1l-2.589-7.528,6.691-4.8.162-.14a.936.936,0,0,0,.29-.6A.945.945,0,0,0,26.3,11.411Z" transform="translate(-2.25 -3.375)" fill={fill} />
    </svg>

}

export const HalfStar: React.FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23.214" viewBox="0 0 25 23.214">
        <path id="Icon_ionic-ios-star-half" data-name="Icon ionic-ios-star-half" d="M26.3,11.411H18.093L15.6,3.967a.9.9,0,0,0-1.7,0l-2.494,7.444H3.143a.9.9,0,0,0-.893.893.656.656,0,0,0,.017.151.858.858,0,0,0,.374.631l6.747,4.754L6.8,25.367a.9.9,0,0,0,.307,1,.864.864,0,0,0,.5.218,1.094,1.094,0,0,0,.558-.2L14.75,21.7l6.585,4.693a1.046,1.046,0,0,0,.558.2.8.8,0,0,0,.5-.218.884.884,0,0,0,.307-1l-2.589-7.528,6.691-4.8.162-.14a.936.936,0,0,0,.29-.6A.945.945,0,0,0,26.3,11.411Zm-2.645,1.964-4.453,3.2a1.567,1.567,0,0,0-.569,1.775l1.68,4.894a.224.224,0,0,1-.34.257l-4.319-3.08-.006-.006a2.081,2.081,0,0,1-.9-1.7V7.019a.109.109,0,0,1,.212-.033h0l1.652,4.922a1.56,1.56,0,0,0,1.479,1.066h5.43A.223.223,0,0,1,23.656,13.375Z" transform="translate(-2.25 -3.375)" fill="#30b9d6" />
    </svg>
}

export const Chevron = ({ fill, open, onClick }: { fill?: string, open: boolean, onClick?: () => void }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} width="12.621" height="22.243" viewBox="0 0 12.621 22.243" className={open ? "open" : ""}>
        <path id="Icon_feather-chevron-down" data-name="Icon feather-chevron-down" d="M0,9,9,0l9,9" transform="translate(11.121 2.121) rotate(90)" fill="none" stroke={fill ?? "#282828"} strokeLinecap="round" stroke-linejoin="round" strokeWidth="3" />
    </svg>
}

export const CloseIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="13.426" height="13.423" viewBox="0 0 13.426 13.423">
        <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z" transform="translate(-11.285 -11.289)" fill="#fff" />
    </svg>
}

export const SearchIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="30.621" height="30.621" viewBox="0 0 30.621 30.621">
        <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3 -3)">
            <path id="Контур_102" data-name="Контур 102" d="M28.5,16.5a12,12,0,1,1-12-12A12,12,0,0,1,28.5,16.5Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
            <path id="Контур_103" data-name="Контур 103" d="M31.5,31.5l-6.525-6.525" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        </g>
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
