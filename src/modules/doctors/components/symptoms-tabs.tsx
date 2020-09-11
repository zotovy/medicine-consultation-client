import React from "react";

const SymptomsTabs: React.FC = () => {
	type eType = object|string|number|any;
	type TabsType = {
		items:any
	}
	let items: {title: string, sourseSvg: string, active: boolean, id: number}[] = [
		{ title: 'М', sourseSvg: '/' , active: true, id: 0},
		{ title: 'Ж', sourseSvg: '/' , active: false, id: 1},
	];
	// {items[active] && <TabContent {...items[active]} />}	
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

		// function openTab(e:any){
		// 	e.persist()
		// 	let id = +e._targetInst.key;
		// 	return items = items.map((item:{}) => {
		// 		(item.id == id) ? !item.active : 
		// 	})
		// 	console.log(e)
		// };
		return (
			<div className='tabs-wrapper'>
				<div className='tabs-ui-container'>
					{console.log(items[0].active)}
					<TabContent />
					<div className="symptoms-tab">
						{items.map((n:any, i:any) => (
							<button key={n.id}
							className={`tab-links tab-${n.id} ${n.active === true ? 'tab-active' : ''}`}
							onClick={openTab}
							data-index={i}
							>{n.title}</button>
						))}
					</div>
				</div>
			</div>
		);
	}
	return <Tabs items={items}/>;

}
export default SymptomsTabs;