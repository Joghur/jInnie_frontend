import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';

function ShowMenuPlan(props) {
	console.log('ShowMenuPlan');

	const [ dayPlans, setDayPlans ] = useState([]);

	const getMenuPlan = () => {
		console.log('getMenuPlan');

		setDayPlans(props.apiFacade.getItem(props.loggedIn, '/api/menu/4'));
	};

	console.log('getMenuPlan', getMenuPlan);

	// const handleDayPlanChange = (evt) => {
	// 	console.log('handleDayPlanChange');
	// 	const newDayP = { ...hobby };
	// 	const target = evt.target;
	// 	const id = evt.target.id;
	// 	setHobby({ ...newHobby, [id]: target.value });
	// 	console.log('handleHobbyChange hobby', hobby);
	// };
	// const deleteDayPlan = (evt) => {
	// 	console.log('deleteDayPlan');
	// 	props.apiFacade.deleteItem(props.loggedIn, '/api/menu/delete/' + hobby.hobbyID, hobby.hobbyID);
	// 	setIsBlocking(false);
	// 	setTimeout(() => {
	// 		console.log('setTimeout firing');
	// 		getHobbyData();
	// 	}, 1000);
	// };
	const makeMenuPlan = () => {
		console.log('makeMenuPlan');
		console.log('ShowMenuPlan menuPlan', props.menuPlan);
		setTimeout(() => {
			console.log('setTimeout firing');
			console.log('ShowMenuPlan menuPlan', props.menuPlan);
			let itemBody = {
				dayPlans: props.menuPlan
			};
			props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/menu/add');

			console.log('makeMenuPlan itemBody', itemBody);
		}, 1000);
	};

	return (
		<div>
			<div>
				{/* <table className="table">
					<thead>
						<tr>
							<th>DaybyID</th>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{getMenuPlan.map((element) => (
							<tr key={uuid()}>
								<td>{element.dayPlanID}</td>
								<td>{element.recipe}</td>
							</tr>
						))}
					</tbody>
				</table> */}
			</div>
			<div>
				{/* <form onChange={handleDayPlanChange}>
					<button onClick={deleteDayPlan}>Delete Dayplan</button>
					<input placeholder="dayplan ID" id="dayPlanID" />
				</form> */}
			</div>
			<h2>ShowMenuPlan</h2>
			{props.menuPlan.map((element) => (
				<li key={uuid()}>
					<p>{element}</p>
				</li>
			))}
			<b />

			<button onClick={makeMenuPlan}>Make menuplan</button>
		</div>
	);
}

export default ShowMenuPlan;
