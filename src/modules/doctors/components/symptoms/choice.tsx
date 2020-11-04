import React from "react";
import { SearchIcon, CaretteDown, Chevron } from "../../icons";
import SymptomsOptions from "./choice-options-wrapper";
import controller from "../../controllers/symptoms-controller";


const SymptomsTitle: React.FC = () => {
	const { handlerSearch } = controller;
	return (
		<div className="choice-wrapper">
			<div className="search">
				<input
					type="text"
					placeholder="Головная боль"
					onChange={(e) => handlerSearch(e)} />
				<SearchIcon />
			</div>
			<SymptomsOptions />
		</div>
	)
}

export default SymptomsTitle;