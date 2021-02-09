import React from "react";
import styled from "styled-components";
import { FileIcon, ImageIcon, PdfIcon } from "@/modules/consultations/icons";

const Container = styled.div`
    padding: 7px;
    border-radius: 5px;
    background: #F5F5F5;
    display: flex;
    cursor: pointer;
    margin: 5px 10px 5px 0;
    
    .info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    
        span.title {
            font-weight: 500;
            color: #282828;
            font-size: 14px;
        }
    
        span.subtitle {
            color: #707070;
            font-size: 12px;
        }
    }
    
    .icon {
        cursor: pointer;
    }
    
    svg:last-child {
        margin-left: 15px;
        width: 10px;
        height: 10px;
    
        path {
            fill: #30B9D6;
        }
    
    }
`;

const DocumentComponent: React.FC<ConsultationDocument> = (props) => {
    const splitted = props.name.split(".");
    const type = splitted[splitted.length - 1].toUpperCase();

    return <Container className="document">
        <Icon type={ props.type } />
        <div className="info">
            <span className="title">{ props.name.substring(0, 15) + (props.name.length > 15 ? "..." : "") }</span>
            <span className="subtitle">{ props.size } { type }</span>
        </div>
    </Container>
}


const Icon: React.FC<{ type: string }> = ({ type }) => {
    if (type === "img") {
        return <ImageIcon />;
    } else if (type === "pdf") {
        return <PdfIcon />;
    } else {
        return <FileIcon />
    }
}

export default DocumentComponent;
