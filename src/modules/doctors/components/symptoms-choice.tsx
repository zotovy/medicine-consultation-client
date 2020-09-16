import React from "react";
import { SearchIcon, CaretteDown, Chevron } from "../icons";
import Checkbox from "../../../components/checkbox";
import MediaQuery from "react-responsive";


const SymptomsTitle: React.FC = () => {
    return(
        <div className="choice-wrapper"> 
			<div className="search">
				<input
				type="text"
				placeholder="Головная боль"
				onChange={(e) => /*controller.onNameChange(e.target.value)*/ console.log(e)}/>
				<SearchIcon />
			</div>
        </div>
    )
}

export default SymptomsTitle;