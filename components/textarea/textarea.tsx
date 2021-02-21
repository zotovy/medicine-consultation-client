import React from "react";
import styles from "./textarea.module.scss";

type Props = {
    field?: string
    id?: string;
    onChange?: (v: string) => any;
    rows?: number;
    cols?: number;
    hint?: string;
    value?: string;
    error?: string;
    resize?: string; // default: true
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    className?: string;
    maxLength?: number;
}

const TextArea: React.FC<Props> = (props) => {

    const textareaStyles: any = {};
    if (props.error) textareaStyles.border = "1.15px solid #ff3b30";
    if (props.resize != undefined ) textareaStyles.resize = props.resize;
    if (props.maxWidth != undefined ) textareaStyles.maxWidth = props.maxWidth;
    if (props.maxHeight != undefined ) textareaStyles.maxHeight = props.maxHeight;
    if (props.minWidth != undefined ) textareaStyles.minWidth = props.minWidth;
    if (props.minHeight != undefined ) textareaStyles.minHeight = props.minHeight;

    return <div className={styles.textAreaContainer}>
        { props.field ? <div className={styles.field}>{ props.field }</div> : <React.Fragment/> }
        <textarea
            className={`${styles.textarea} text-area ${props.className}`}
            id={props.id}
            onChange={(e) => props.onChange ? props.onChange(e.target.value) : null}
            rows={props.rows}
            cols={props.cols}
            placeholder={props.hint}
            value={props.value}
            style={textareaStyles}
            maxLength={props.maxLength}
        />
        <span className={styles.errorText}>{ props.error }</span>
    </div>
}

export default TextArea;
