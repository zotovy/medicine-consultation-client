import React from "react";
import { SearchIcon, CaretteDown, Chevron } from "../../icons";
import Checkbox from "../../../../components/checkbox";
import MediaQuery from "react-responsive";
import Option from "./choice-option"

const SymptomsOption: React.FC = () => {
	return (
		<div className="symptoms-checkbox-wrapper">
			<Option />
		</div>
	)
}

export default SymptomsOption;