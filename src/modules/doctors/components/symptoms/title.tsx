import React from "react";
const SymptomsTitle: React.FC = () => {
    return (
        <div className="symptoms-title-wrap">
            <h1>Симптомы<span id="dot">.</span></h1>
            <h3>Выберите симптомы, которые Вас беспокоят.<br />Мы поможем легко Вам подобрать нужного врача!</h3>
        </div>
    )
}

export default SymptomsTitle;