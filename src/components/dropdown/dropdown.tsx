import React from "react";
import "./dropdown.scss";

type Props = {
    options: string[];
    selected?: string;
    onSelect?: () => {};
    id?: string;
    hint?: string;
    value?: string;
    error?: string;
    name?: string;
    simulateField?: boolean;
    styles?: any;
}

const Dropdown: React.FC<Props> = (props) => {

    let dropdownStyles: any = {};
    if (props.error) dropdownStyles.border = "1.15px solid #ff3b30";
    if (props.styles) dropdownStyles = {...dropdownStyles, ...props.styles}

    return <div className="dropdown-container">
        { props.simulateField ? <div className="field">&nbsp;</div> : <React.Fragment/> }
        <select className="dropdown" name={props.name} id={props.id} style={dropdownStyles}>
            {
                props.options.map(e => <option value={e}>{e}</option>)
            }
        </select>
        <span className="error-text">{ props.error }</span>
    </div>
}

export default Dropdown;