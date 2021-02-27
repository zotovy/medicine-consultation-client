import React from "react";
import styled from "styled-components";

type Props = {
    onConfirm: () => void;
    content: string;
    borderRadius?: string;
    fullSize?: boolean;
    size?: string;
    styles?: any;
    dataTest?: string;
    className?: string;
    disabled?: boolean;
    type?: "primary" | "secondary";
};

const Button = styled.div`
    transition: 0.3s ease-in-out;
    cursor: pointer;
    width: 100%;
    background-color: #30b9d6;
    padding: 12px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: white;
    user-select: none;
    
    &.disable {
        background: #F2F2F2;
        color: #949494;
        cursor: not-allowed;
    }
    
    &.secondary:not(.disabled) {
        background-color: #e9f7fa;
        color: #30b9d6;
    }

    &:hover:not(.disable, .secondary) {
        box-shadow: 0px 3px 5px rgba(48, 185, 215, 0.3);
    }

    &:active:not(.disable, .secondary) {
        background: rgba(48, 185, 215, 0.8);
    }

    /* Tablet */
    @media screen and (max-width: 1024px) and (min-width: 768px) {
        font-size: 18px;
    }
`;


const ConfirmButton: React.FC<Props> = (props: Props) => {

    const type = props.type ?? "primary";

    return <Button
            className={`confirm-button ${props.className} ${props.disabled ? "disable" : ""} ${type}`}
            data-test={props.dataTest}
            {/*
     // @ts-ignore */  ...{}}
            style={{ ...props.styles?.button, borderRadius: `${props.borderRadius ?? "10px"}` }}
            onClick={(e) => props.onConfirm()}
    >
        {/*
     // @ts-ignore */}
        { props.content }
    </Button>;
};

export default ConfirmButton;
