import React from "react";
import styles from "./dropdown.module.scss";

type Props = {
    options: string[];
    values: string[];
    selected?: string;
    onSelect?: (v: string) => {};
    id?: string;
    hint?: string;
    value?: string;
    error?: string;
    name?: string;
    simulateField?: boolean;
    styles?: any;
    placeholder?: string;
}

const Dropdown: React.FC<Props> = (props) => {

    let dropdownStyles: any = {};
    if (props.error) dropdownStyles.border = "1.15px solid #ff3b30";
    if (props.styles) dropdownStyles = {...dropdownStyles, ...props.styles}

    return <div className={styles.dropdownContainer}>
        { props.simulateField ? <div className="field">&nbsp;</div> : <React.Fragment/> }
        <select
            className={styles.dropdown}
            name={props.name}
            id={props.id}
            style={dropdownStyles}
            defaultValue={props.placeholder ? "__default" : undefined}
            onChange={(e) => props.onSelect ? props.onSelect(e.target.value) : undefined}>
            {
                props.placeholder ? <option value="__default" disabled>{ props.placeholder }</option> : <React.Fragment/>
            }
            {
                props.options.map((e, i) => <option key={props.values[i]} value={props.values[i]}>{e}</option>)
            }
        </select>
        <span className={styles.errorText}>{ props.error }&nbsp;</span>
    </div>
}

export default Dropdown;