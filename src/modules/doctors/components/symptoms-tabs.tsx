import React from "react";

const SymptomsTabs: React.FC = () => {
	type eType = object | string | number | any;
	type TabsType = {
		items: any,
	}
	type TabType = {
		sourse: string
	}
	let items: { title: string, sourseSvg: string, active: boolean, id: number }[] = [
		{ title: 'М', sourseSvg: '/', active: true, id: 0 },
		{ title: 'Ж', sourseSvg: '/', active: false, id: 1 },
	];
	
	const Tabs: React.FC<TabsType> = ({ items }: any) => {
		const TabContent: React.FC = ({ title, sourseSvg }: any) => {
			return (
				<div className="tab-content">
					<div className="tab-content-img-wrap">
						<Tab sourse={sourseSvg}/>
					</div>
				</div>
			)
		};
		const [active, setActive] = React.useState(items);

		const Tab: React.FC<TabType> = ({sourseSvg }:any) => {
		  return (
		    <>
				<div className='fake-img img-1'>
					{sourseSvg}
				</div>
				<div className='fake-img img-2'>
					{sourseSvg}
				</div>
		    </>
		  )
		}
		function openTab(e: any) {
			e.persist();
			console.log(e);
			items.map((item:eType) => {
				
				if (item.id == +e._targetInst.key) {
					item.active = true
				}else{
					item.active = false;
				}
				console.log(item.id+ " -> " +item.active)
			})

			return items = items;
		};
		return (
			<div className='tabs-wrapper'>
				<div className='tabs-ui-container'>
					<TabContent />
					<ul className="symptoms-tab">
						{items.map((n: any, i: any) => (
							<li key={n.id}
								className={`tab-links tab-${n.id} ${n.active === true ? 'tab-active' : ''}`}
								onClick={openTab}
								data-index={i}
							>{n.title}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
	return <Tabs items={items} />;

}
export default SymptomsTabs;