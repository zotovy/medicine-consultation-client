import React from "react";

const SymptomsTabs: React.FC = () => {
	type eType = object|string|number|any;
	type TabsType = {
		items:any
	}
	let items: {title: string, sourseSvg: string, active: boolean, id: number}[] = [
		{ title: 'М', sourseSvg: '/' ,active: true, id: 0},
		{ title: 'Ж', sourseSvg: '/' ,active: false, id: 1},
	];

	const Tabs:React.FC<TabsType> = ({ items }:any ) => {
		const TabContent:React.FC = ({title, sourseSvg}:any) => {
			return(
				<div className="tab-content">
					<div className="tab-content-img-wrap">
						<div className='fake-img img-1'>
						</div>
						<div className='fake-img img-2'>
						</div>		
					</div>	
				</div>
			)
		};
		const [ active, setActive ] = React.useState(items);

		const openTab = (e:eType) => setActive(e.toNumber.target.dataset.index);
		return (
			<div className='tabs-wrapper'>
				<div className='tabs-ui-container'>	
					<div className="symptoms-tab">
						{items.map((n:any, i:any) => (
							
							<button
							className={`tab-links tab-${n.id} ${n.active === true ? 'tab-active' : ''}`}
							onClick={openTab}
							data-index={i}
							>{n.title}</button>
						))}
					</div>
					{items[active] && <TabContent {...items[active]} />}
				</div>
			</div>
		);
	}
	return <Tabs items={items}/>;

}
export default SymptomsTabs;