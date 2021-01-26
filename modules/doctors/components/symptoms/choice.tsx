import React from "react";
import { SearchIcon } from "../../icons";
import SymptomsOptions from "./choice-options-wrapper";
import SympController from "../../controllers/symptoms-controller";
import { TYPES, useInjection } from "../../../../container";


const SymptomsTitle: React.FC = () => {
	const controller = useInjection<SympController>(TYPES.symptomsController)
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