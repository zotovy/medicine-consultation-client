import React from "react";
import classnames from "classnames";
import styled from "styled-components";

type Props = {
    error?: string;
    showErrorMessage?: boolean;
}

const ErrorAlertDialog = styled.div`
  top: 16px;
  right: 0;
  position: absolute;
  transition: 1s;
  width: 360px;
  display: flex;
  align-items: center;
  background: #ff3b30;
  padding: 10px;
  border-radius: 5px 0px 0px 5px;
  color: white;
`

const ErrorAlert: React.FC<Props> = (props: Props) => {


    return <ErrorAlertDialog className={!props.showErrorMessage ? "disable" : ""}>
        <i className={classnames("fa", "fa-exclamation-circle", "alert-icon")} aria-hidden="true"></i>
        <span className="alert-text">{props.error}</span>
    </ErrorAlertDialog>
}

export default ErrorAlert;

