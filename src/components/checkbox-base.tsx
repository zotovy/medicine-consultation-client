import React from "react";
import "./styles/checkbox.css";


type Props = {
    checked: boolean;
    onChange: () => void;
    dataTest?: string;
}

const CheckboxBase: React.FC<Props> = (props: Props) => {
    return <div className="checkbox">
        <label>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
            <span data-test={props.dataTest} className="checkbox-material">
                <span className="check"></span>
            </span>

        </label>
    </div>
}

export default CheckboxBase;