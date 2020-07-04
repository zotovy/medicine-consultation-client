import React from "react";
import styled from "styled-components";

// Static
import bgImage from "../../../static/images/signup-bg.png";

const Image = styled.div`
  background-color: #dbecf4;
  width: 45vw;
  height: 100vh;

  .image {
    width: 100%;
    height: 100%;
    background: url(${bgImage});
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
  }
`;


const ImageComponent: React.FC = () => {
    return <Image>
        <div className="image"></div>
    </Image>
}

export default ImageComponent;