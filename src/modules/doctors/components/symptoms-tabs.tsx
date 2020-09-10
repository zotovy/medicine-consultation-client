"use strict";

import React from "react";

// const SymptomsTabs: React.FC = () => {
// 	const items: {title: string, sourseSvg: string, active: boolean}[] = [
// 		{ title: 'М', sourseSvg: '/' ,active: true},
// 		{ title: 'Ж', sourseSvg: '/' ,active: false},
// 	];

// 	const Tabs:React.FC = ({ items }:any ) => {
// 		const TabContent:React.FC = ({title, sourseSvg}:any) => {
// 			return(
// 				<div className="tabcontent">
// 					<h3>{title}</h3>
// 					<div>

// 					</div>	
// 				</div>
// 			)
// 		};
// 		const [ active, setActive ] = React.useState(null);

// 		const openTab:any = e => setActive(e.toNumber.target.dataset.index);
// 		return (
// 			<div>
// 				<div className="tab">
// 					{items.map((n:any, i:any) => (
// 					<button
// 					className={`tablinks ${i === active ? 'active' : ''}`}
// 					onClick={openTab}
// 					data-index={i}
// 					>{n.title}</button>
// 					))}
// 				</div>
// 				{items[active] && <TabContent {...items[active]} />}
// 			</div>
// 		);
// 	}

// 	return <Tabs />;

// }

// export default SymptomsTabs;