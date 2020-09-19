import React from "react";
import { SearchIcon, CaretteDown, Chevron } from "../icons";
import Checkbox from "../../../components/checkbox";
import MediaQuery from "react-responsive";
import SymptomsOptions from "./symptoms-choice-options-wrapper"

const SymptomsTitle: React.FC = () => {
    return(
        <div className="choice-wrapper"> 
			<div className="search">
				<input
				type="text"
				placeholder="Головная боль"
				onChange={(e) => console.log(e)}/>
				<SearchIcon />
			</div>
			<SymptomsOptions/>
        </div>
    )
}

export default SymptomsTitle;