import React from "react";

type Props = {
  height?: string;
  width?: string;
};

const SizedBox: React.FC<Props> = (props: Props) => (
  <div
    style={{
      height: props.height ?? "0px",
      width: props.width ?? "0px",
    }}
  ></div>
);

export default SizedBox;
