import React from "react";
import styled from "styled-components";



const Image = styled.div`
  background-color: #dbecf4;
  z-index: 2;
  width: 45vw;
  height: 100vh;

  .image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
  }
`;

type Props = {
  image: string;
}

const ImageComponent: React.FC<Props> = ({ image }) => {

  const styles = { backgroundImage: `url(${image})` }

  return <Image >
    <div className="image" style={styles}></div>
  </Image>
}

export default ImageComponent;