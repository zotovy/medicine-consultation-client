// This file includes search input & all existing filters =)

import React, { useState } from "react";
import { SearchIcon, CaretteDown } from "../icons";

const Filter: React.FC = () => {

    const [down, setDown] = useState(false)

    return <div className="filter">
        <div className="column">
            {/* Search input, sort by & downward */}
            <div className="row">
                <div className="search">
                    <input type="text" placeholder="Введите имя доктора" />
                    <SearchIcon />
                </div>

                <div className="sort-by">
                    <span id="sort-by__title">Сортироваться по</span>
                    <div className="selector">
                        Рейтингу
                        <CaretteDown />
                    </div>
                </div>

                <div onClick={() => setDown(!down)} className={`downward-upward ${down ? "" : "upward"}`}>
                    <p className="stick" id="stick-top"></p>
                    <p className="stick" id="stick-centre"></p>
                    <p className="stick" id="stick-bottom"></p>
                </div>
            </div>


            {/* Other filters */}
            <div className="row"></div>
        </div>
    </div>
}

export default Filter;