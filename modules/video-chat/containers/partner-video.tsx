import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: hidden;

    video {
        /* Make video to at least 100% wide and tall */
        //min-width: 100%;
        min-height: 100%;

        /* Setting width & height to auto prevents the browser from stretching or squishing the video */
        //width: auto;
        //height: auto;

        /* Center the video */
        //position: absolute;
        //top: 50%;
        //left: 50%;
        //transform: translate(-50%, -50%);
    }

    .not-connected {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: #f2f2f2;

        h3 {
            font-weight: normal;
            font-size: 24px;
            color: #565656;

        }
    }
`;

export type Props = {
    isMicroOn: boolean;
}

const PartnerVideoContainer: React.FC<Props> = (props) => {
    return <Container>
        <video id="partner-video" autoPlay playsInline muted={!props.isMicroOn} />
    </Container>
}

export default PartnerVideoContainer;
