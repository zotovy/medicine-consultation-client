import React from "react";
import { observer } from "mobx-react";
import controller from "../controllers/symptoms-controller";

const SymptomsTabs: React.FC = () => {
	type TabsType = {
		items: any,
	}
	type TabType = {
		sourse: string
	}
	
	const {items, openTab} = controller;
	
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
		return (
			<div className='tabs-wrapper'>
				<div className='tabs-ui-container'>
					<TabContent />
					<ul className="symptoms-tab">
						{items.map((n: any, i: any) => (
							<li key={n.id}
								className={`tab-links tab-${n.id} ${n.active === true ? 'tab-active' : ''}`}
								onClick={(e) => openTab(items, e)}
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
export default observer(SymptomsTabs);