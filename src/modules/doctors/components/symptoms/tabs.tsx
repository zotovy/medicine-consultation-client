import React from "react";
import { observer } from "mobx-react";
import controller from "../../controllers/symptoms-controller";
import { MaleSide, MaleFront, FemaleSide, FemaleFront } from "../../svg-symp";

const SymptomsTabs: React.FC = () => {
	type TabsType = {
		items: any,
	}

	const { items, openTab } = controller;

	const Tabs: React.FC<TabsType> = ({ items }: any) => {
		const TabContent: React.FC = () => {
			return (
				<div className="tab-content">
					<div className="tab-content-img-wrap">
						<Tab />
					</div>
				</div>
			)
		};
		const Tab: React.FC = () => {
			let arrNum;
			if (items[0].active === true) {
				arrNum = items[0].sourseSvg;
			} else {
				arrNum = items[1].sourseSvg;
			}
			return (
				<>
					<div className='fake-img img-1'>
						{arrNum[0] === 1 ? <MaleFront /> : <FemaleFront />}
					</div>
					<div className='fake-img img-2'>
						{arrNum[1] === 2 ? <MaleSide /> : <FemaleSide />}
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
								onClick={(e) => openTab(items, n.id)}
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